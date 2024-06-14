import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { ImSpinner10 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show,setShow]=useState(false)

  const from = location?.state || "/";
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const image = data.image[0]

    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);
      // 1. Upload image and get image url
      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        formData
      );
      const image = imgData?.data?.display_url;
      //2 register
      const result = await createUser(email, password);
      // 3. save user name and photo
      await updateUserProfile(name, image);
      navigate(from);
      toast.success("SignUp Successfully");
    } catch (err) {
      setLoading(false)(err);
      toast.error(err.message);
    }
    data;
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success("SignUp Successfully");
    } catch (err) {
      err;
      toast.error(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
          <title>Hostel Meals Management | Sign Up</title>
        </Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to University Hostel</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                {...register("image", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.image && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.email && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type={show?'text':'password'}
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#e46f6c] bg-gray-200 text-gray-900"
                {...register("password", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <span className="text-red-700">This field is required</span>
              )}
              <div onClick={()=>{setShow(!show)}} className='absolute text-3xl right-4 top-[48%] hover:cursor-pointer'>
                 {show?<FaEye />:<FaEyeSlash />}
                 </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#e46f6c] w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner10 className="animate-spin mx-auto text-xl" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          onClick={handleSignInWithGoogle}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-[#e46f6c] text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
