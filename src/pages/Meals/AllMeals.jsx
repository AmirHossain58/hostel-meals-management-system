import React from "react";
import Categories from "../../components/Categories/Categories";
import Meals from "../../components/Home/Meals";

const AllMeals = () => {
  return (
    <div>
      {/* Categories section  */}
      <Categories />
      {/* Meals section */}
      <Meals />
    </div>
  );
};

export default AllMeals;
