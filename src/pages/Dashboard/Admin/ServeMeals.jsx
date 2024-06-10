import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import AllMealsDataRow from '../../../components/Dashboard/TableRows/AllMealsDataRow'
import { useState } from 'react'
import AllReviewsDataRow from '../../../components/Dashboard/TableRows/AllReviewsDataRow'
import ServeMealsDataRow from '../../../components/Dashboard/TableRows/ServeMealsDataRow'
const ServeMeals = () => {
    const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  //   Fetch Rooms Data
  const {
    data: requestedMeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-requested-meal',search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requested-meals?search=${search}`)
      return data
    },
  })
  const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>Dashboard | Serve Meals</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        
        <div className='py-8'>
            
          </div>
          <div className=' flex justify-center'>
          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter username or email'
                aria-label='Enter username or email'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
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
                      email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     status
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

                  {requestedMeals?.map((requestedMeal ,i) => (
                    <ServeMealsDataRow
                      key={i}
                      i={i}
                      requestedMeal={requestedMeal}
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

export default ServeMeals