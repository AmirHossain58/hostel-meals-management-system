import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import MealRequestModal from '../../components/Modal/MealRequestModal';
import CheckoutModal from '../../components/Modal/CheckoutModal';

const Checkout = () => {
    const[isOpen,setIsOpen]=useState(false)
    const {pack}=useParams()
    const data=useLoaderData()
    const packDetails=data.find(d=>d.title===pack)
    const closeModal=()=>{
        setIsOpen(false)
    }
    return (
        <div className=''>
           <div className="flex justify-center w-full container mx-auto">
      <div className="flex w-2/3 flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-violet-600 dark:text-gray-50">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold">{packDetails?.title}</h4>
          <span className="text-6xl font-bold">
            $ {packDetails?.price}
            <span className="text-sm tracking-wide">/month</span>
          </span>
        </div>
        <p className="leading-relaxed">{packDetails?.description}</p>
       <div className=" flex-1 flex-grow">
       <ul className="space-y-2">
          {packDetails?.benefits?.map((benefit, i) => (
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
       onClick={()=>setIsOpen(true)}
          rel="noopener noreferrer"
          className="btn inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600"
        >
          Subscribe Now
        </button>
        <CheckoutModal
        mealInfo={packDetails}
        closeModal={closeModal}
        isOpen={isOpen}
        ></CheckoutModal>
       </div>
      </div>
    </div>
        </div>
    );
};

export default Checkout;