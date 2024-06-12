import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import AllMealsDataRow from '../../../components/Dashboard/TableRows/AllMealsDataRow'
import { useState } from 'react'
import UpcomingMealsDataRow from '../../../components/Dashboard/TableRows/UpcomingMealsDataRow'
import AddUpcomingMealModal from '../../../components/Modal/AddUpcomingMealModal'
const UpcomingMealsTable = () => {
    const [isOpen,setIsOpen]=useState(false)
  const [sortLikes, setSortLikes] = useState('')
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  //   Fetch Rooms Data
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-meals',sortLikes],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/upcoming-meals?sortLikes=${sortLikes}`)
      return data
    },
  })
  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async (mealData)=> {
      console.log(mealData);
      const { data } = await axiosSecure.post(`/meals`,mealData)
      
      return data
    },
    onSuccess:async data => {
      
      toast.success('Successfully Publish.')
    },
  })

  //  Handle Delete
  const handlePublish = async meal => {
    console.log(meal)
    const id =meal?._id
    const mealData={
      ...meal
    }
    delete mealData?._id
    console.log(mealData);
    try {
     const res =await mutateAsync(mealData)
     console.log(res);
     if(res?.insertedId){
      const res = await axiosSecure.delete(`/upcoming-meals/${id}`)
      if(res?.data?.deletedCount>1){
        refetch()
      }
     }
    } catch (err) {
      console.log(err)
    }
  }
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        
        <div className='py-8'>
          <div className='flex justify-center gap-2 md:gap-10'>
          <div>
            <select
              onChange={e => {
                setSortLikes(e.target.value)
              }}
              value={sortLikes}
              name='sort'
              id='sort'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By  Likes Count</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <div>
           <button
           onClick={()=>setIsOpen(true)}
            className="btn text-lg bg-red-100">Add Upcoming Meal</button>
           {/* Add Upcoming Meal modal */}
           <AddUpcomingMealModal
           refetch={refetch}
           isOpen={isOpen}
           setIsOpen={setIsOpen}
           ></AddUpcomingMealModal>
          </div>
        </div>
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
                     distributor
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      action
                    </th>
                 
                  </tr>
                </thead>
                <tbody>
                  {/* Meal row data */}

                  {meals.map((meal,i) => (
                    <UpcomingMealsDataRow
                      key={meal._id}
                      i={i}
                      meal={meal}
                      handleDelete={handlePublish}
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

export default UpcomingMealsTable