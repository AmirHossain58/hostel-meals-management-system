import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useBadge from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UpdateUserModal from "../../../components/Modal/UpdateUserModal";
import { useState } from "react";
import { imageUpload } from './../../../Api/utils/index';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, loading, updateUserProfile } = useAuth() || {};
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const[name,setName]=useState(user?.displayName)
  const[image,setImage]=useState(user?.photoURL)

  const [imagePreview, setImagePreview] = useState(user?.photoURL)
  const [imageText, setImageText] = useState('Upload Image')
  const [isOpen, setIsOpen] = useState(false);
  const [role, isLoading] = useBadge();
  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    console.log(image);

    try {
      if(image){
        const image_url = await imageUpload(image)
        setImage(image_url)
      }
      console.log(name,image);
     await updateUserProfile(name,image_url)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }
  const handleImage = image => {
    setImage(image)
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }
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

          <p className="p-2 uppercase px-4 text-xs text-white bg-gray-500 rounded-full">
            {role.role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
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
                onClick={()=>setIsOpen(true)}
                className="bg-[#f39cab] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#4d4949] block mb-1">
                  Update Profile
                </button>
                <UpdateUserModal
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
                <button className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#c4213c]">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
