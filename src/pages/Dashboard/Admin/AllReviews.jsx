import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import AllMealsDataRow from '../../../components/Dashboard/TableRows/AllMealsDataRow'
import { useState } from 'react'
import AllReviewsDataRow from '../../../components/Dashboard/TableRows/AllReviewsDataRow'
const AllReviews = () => {
  const [sortLikes, setSortLikes] = useState('')
  const [sortReviews, setSortReviews] = useState('')
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  //   Fetch Rooms Data
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews`)
      return data
    },
  })
// console.log(meals);

  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        
        <div className='py-8'>
          </div>
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
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      likes
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      reviews
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     reviews count
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      view meal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Meal row data */}

                  {meals?.map((meal ,i) => (
                    <AllReviewsDataRow
                      key={i}
                      i={i}
                      meal={meal}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
    </>
  )
}

export default AllReviews