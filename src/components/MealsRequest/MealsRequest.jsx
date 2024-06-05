import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import MealRequestModal from "../Modal/MealRequestModal";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from './../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MealsRequest = ({ meal,isOpen,closeModal ,handleRequestButton}) => {
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {meal?.price}</div>
        <div className="font-light text-neutral-600"></div>
      </div>
      <hr />
      <div className="flex justify-center">{/* Calender */}</div>
      <hr />
      <div className="p-4">
        <Button onClick={handleRequestButton} label={"Request"} />
      </div>
      <MealRequestModal
       closeModal={closeModal} 
       isOpen={isOpen} 
       mealInfo={meal}
       ></MealRequestModal>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${meal?.price}</div>
      </div>
    </div>
  );
};

MealsRequest.propTypes = {
  meal: PropTypes.object,
  handleRequestButton: PropTypes.func,
};

export default MealsRequest;
