import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import PaymentHistoryDataRow from '../../../components/Dashboard/TableRows/PaymentHistoryDataRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data:payments=[],isLoading}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res =await axiosSecure(`/payments/${user.email}?page=${currentPage}&size=${itemsPerPage}`)
            return res?.data
        }
    })
    useEffect(() => {
      const getCount = async () => {
        const { data } = await axiosSecure(
          `/payments-count/${user.email}`
        );
  
        setCount(data.count);
      };
      getCount();
    }, [axiosSecure,user.email]);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);
  
    //  handle pagination button
    const handlePaginationButton = (value) => {
      value;
      setCurrentPage(value);
    };
    if (isLoading) return <LoadingSpinner />
    return (
        <div>
        <Helmet>
          <title>Dashboard | Payment History</title>
        </Helmet>
        <div className="flex justify-evenly mt-20">
          <h4 className="text-4xl">Total Payments: {payments?.length}</h4>
          
        </div>
        <div className='container min-h-[calc(100vh-250px)] mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       #
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       EMAIL

                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       CATEGORY
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                           TOTAL PRICE
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                     PAYMENT DATE
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {/* Table Row Data */}
                    {payments?.map((payment, i) => (
                      <PaymentHistoryDataRow
                      i={i}
                      payment={payment}
                       key={i}
                      ></PaymentHistoryDataRow>
              ))}
                  </tbody>
                </table>
                {
                payments.length===0&&<p className='text-center text-xl md:text-4xl'>No payment history found.</p>}
              </div>
            </div>
          </div>
        </div>
         {/* Pagination Section */}
         <div className="flex justify-center  mt-12">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {/* Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          {/* Next Button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
};

export default PaymentHistory;