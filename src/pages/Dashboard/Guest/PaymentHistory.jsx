import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import PaymentHistoryDataRow from '../../../components/Dashboard/TableRows/PaymentHistoryDataRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data:payments=[],isLoading}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res =await axiosSecure(`/payments/${user.email}`)
            return res?.data
        }
    })
    if (isLoading) return <LoadingSpinner />
    return (
        <div>
       
        <div className="flex justify-evenly mt-20">
          <h4 className="text-4xl">Total Payments: {payments?.length}</h4>
          
        </div>
        <div className='container mx-auto px-4 sm:px-8'>
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
                !payments&&<p className='text-center text-xl md:text-4xl'>No payment history found.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PaymentHistory;