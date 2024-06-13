import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useBadge from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpdateUserModal from "../../../components/Modal/UpdateUserModal";
import { useState } from "react";
import { imageUpload } from "./../../../Api/utils/index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ForgotPasswordModal from "../../../components/Modal/ForgotPasswordModal";

const Profile = () => {
  const [isOpenPass, setIsOpenPass] = useState(false);
  const [email, setEmail] = useState("");

  const { user, loading, updateUserProfile, resetPassword } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState(user?.displayName);
  const [image, setImage] = useState(user?.photoURL);
  const [imagePreview, setImagePreview] = useState(user?.photoURL);
  const [imageText, setImageText] = useState("Upload Image");
  const [imageFile, setImageFile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [role, isLoading] = useBadge();
  const { data } = useQuery({
    queryKey: ["total-meals-added"],
    queryFn: async () => {
      const res = await axiosSecure(`meals-added/${user?.email}`);
      return res.data;
    },
  });
  //   Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target(image);

    try {
      if (imageFile) {
        const image_url = await imageUpload(imageFile)(image_url);
        await updateUserProfile(name, image_url);
      } else {
        await updateUserProfile(name, image);
      }
      name, image;
      setIsOpen(false);
    } catch (err) {
      err;
      toast.error(err.message);
    }
  };
  const handleImage = (image) => {
    setImageFile(image);
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error("please give your email first");
    try {
      await resetPassword(email);
      toast.success("Checked your Email");
    } catch (err) {
      err;
      toast.error(err.message);
    }
  };
  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/uwp/uwp4373406.jpeg"
          className="w-full mb-4 rounded-t-lg h-80"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs  bg-rose-200 rounded-full">
            {role.role.slice(0, 1).toUpperCase() + role.role.slice(1)}
          </p>

          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <p className=" uppercase  font-bold">
              Meals Added : {data?.length}
            </p>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-rose-100 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-rose-200 block mb-2"
                >
                  Update Profile
                </button>
                <UpdateUserModal
                  setImageFile={setImageFile}
                  name={name}
                  setName={setName}
                  handleSubmit={handleSubmit}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                  handleImage={handleImage}
                  imageText={imageText}
                  user={user}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                ></UpdateUserModal>
                <button
                  onClick={() => setIsOpenPass(true)}
                  className="bg-rose-100 px-7 py-1 rounded-lg text-black  cursor-pointer hover:bg-rose-200"
                >
                  Change Password
                </button>
                <ForgotPasswordModal
                  setEmail={setEmail}
                  handleResetPassword={handleResetPassword}
                  isOpen={isOpenPass}
                  setIsOpen={setIsOpenPass}
                ></ForgotPasswordModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
