import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { CgProfile } from "react-icons/cg";
import { MdOutlineUpcoming, MdReviews } from "react-icons/md";
import { GiFoodTruck, GiMeal } from "react-icons/gi";

const AdminMenu = () => {
  return (
    <>
      <MenuItem 
      icon={CgProfile} 
      label="Admin Profile" 
      address="admin-profile" 
      />
      <MenuItem 
      icon={CgProfile} 
      label="Manage Users" 
      address="manage-users" 
      />
      <MenuItem 
      icon={CgProfile} 
      label="Add Meal" 
      address="add-meal:" 
      />
      <MenuItem 
      icon={GiMeal} 
      label="All Meals" 
      address="all-meals" 
      />
      <MenuItem 
      icon={MdReviews} 
      label="All Reviews" 
      address="all-reviews" 
      />
      <MenuItem 
      icon={ GiFoodTruck} 
      label="Serve Meals" 
      address="serve-meals" 
      />
      <MenuItem 
      icon={MdOutlineUpcoming} 
      label="Upcoming Meals" 
      address="upcoming-meals" 
      />
    </>
  );
};

export default AdminMenu;
