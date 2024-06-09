import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import RequestedDataRow from '../../../components/Dashboard/TableRows/RequestedDataRow'
import MyReviewsDataRow from './../../../components/Dashboard/TableRows/MyReviewsDataRow';


const MyReviews = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    //   Fetch Bookings Data
    const {
      data: myReviews = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['requested-meals', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`reviews/${user?.email}`)
        return data
      },
    })
  
    console.log(myReviews)
    if (isLoading) return <LoadingSpinner />
    return (
      <>
        <Helmet>
          <title>My Reviews</title>
        </Helmet>
  
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
                        review
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                            edit
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        delete
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
                    {/* Table Row Data */}
  
                    {myReviews.map((myReview,i) => (
                      <MyReviewsDataRow
                        key={i}
                        myReview={myReview}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  
  
 
};

export default MyReviews;