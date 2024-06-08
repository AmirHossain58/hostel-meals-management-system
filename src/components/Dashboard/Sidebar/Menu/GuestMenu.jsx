import { useState } from "react";
import MenuItem from ".//MenuItem";
import useBadge from "../../../../hooks/useRole.js";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth.js";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
const GuestMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useBadge();

  return (
    <>
      <MenuItem icon={CgProfile} label="My Profile" address="my-profile" />
      <MenuItem
        icon={GiHotMeal}
        label="Requested Meals"
        address="requested-meals"
      />
      <MenuItem icon={MdReviews} label="My Reviews" address="my-reviews" />
      <MenuItem
        icon={FaHistory}
        label="Payment History"
        address="payment-history"
      />
    </>
  );
};

export default GuestMenu;
