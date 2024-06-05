import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PackagesCard = ({ pack }) => {
  return (
    <Link to={`/checkout/${pack?.title}`}>
    <div className="flex flex-1 w-full mb-8 sm:px-4 md:h-[480px]  lg:mb-0">
      <div className="flex flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-violet-600 dark:text-gray-50">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold">{pack?.title}</h4>
          <span className="text-6xl font-bold">
            $ {pack?.price}
            <span className="text-sm tracking-wide">/month</span>
          </span>
        </div>
        <p className="leading-relaxed">{pack?.description}</p>
       <div className=" flex-1 flex-grow">
       <ul className="space-y-2">
          {pack?.benefits?.map((benefit, i) => (
            <li key={i} className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
       </div>
       <div>
       <button
          rel="noopener noreferrer"
          className="btn inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600"
        >
          Get Started
        </button>
       </div>
      </div>
    </div>
    </Link>
  );
};
PackagesCard.propTypes = {
  pack: PropTypes.object,
};
export default PackagesCard;
