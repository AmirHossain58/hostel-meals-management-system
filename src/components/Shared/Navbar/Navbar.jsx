import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { MdNotificationsNone } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navLink = (
    <div className="md:flex ">
      <Link
        to="/"
        className="block 
         px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        Home
      </Link>
      <Link
        to="/meals"
        className="block 
         px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        Meals
      </Link>
      <Link
        to="/upcomingMeals"
        className="block 
         px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        Upcoming Meals
      </Link>
      
    </div>
  );

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/" className="bg-[#e46f6c] text-white p-2 md:p-3 md:text-lg md:font-bold rounded">Hostel Meals Management</Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Become A Host btn */}
                <div className="hidden md:block">
                  {navLink}
                </div>
                {/* Dropdown btn */}
                <div
        className="block 
         px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
     <MdNotificationsNone  className="text-2xl"/>

      </div>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                 {!user&& <p className="font-semibold">Join Us</p>}

                    {/* Avatar */}
              {user&&<img
                className="rounded-full w-7"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
                height="30"
                width="30"
              />}
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                        <div className="md:hidden">
                          {navLink}
                          </div>
                    {user ? (
                      <>
                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                          {user.displayName}
                        </div>
                        <Link to={"/dashboard"}>
                          <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                            Dashboard
                          </div>
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
