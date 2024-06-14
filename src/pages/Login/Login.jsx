import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner10, ImSpinner5 } from "react-icons/im";
import ForgotPasswordModal from "../../components/Modal/ForgotPasswordModal";
import { useState } from "react";
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [show,setShow]=useState(false)

  const { signIn, signInWithGoogle, resetPassword, loading, setLoading } =
    useAuth();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success("SignUp Successfully");
    } catch (err) {
      setLoading(false)
      toast.error(err.message);
    }
  };
  const handleResetPassword = async () => {
    if (!email) return toast.error("please give your email first");
    try {
      await resetPassword(email);
      toast.success("Checked your Email");
    } catch (err) {
      setLoading(false)
      toast.error(err.message);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const email = data.email
    const password = data.password
    try {
      await signIn(email, password);
      navigate(from);
      setLoading(false)
      toast.success("SignUp Successfully");
    } catch (err) {
      setLoading(false)
      toast.error(err.message);
    }

  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
       <Helmet>
          <title>Hostel Meals Management | Login</title>
        </Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
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
                autoComplete="current-password"
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
            <div onClick={()=>{setShow(!show)}} className='absolute text-3xl right-4 top-[47%] hover:cursor-pointer'>
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
        <div className="space-y-1">
          <button
            onClick={() => setIsOpen(true)}
            className="text-xs hover:underline hover:text-[#e46f6c] text-gray-400"
          >
            Forgot password?
          </button>
          <ForgotPasswordModal
            handleResetPassword={handleResetPassword}
            setEmail={setEmail}
            loading={loading}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          ></ForgotPasswordModal>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button onClick={handleGoogleSignIn}>
          <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-[#e46f6c] text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
