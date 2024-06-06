import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Card from "../../components/Home/Card";
import Container from '../../components/Shared/Container'
import { useState } from "react";


const AllMeals = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [priceRange, setPriceRange] = useState([0, 50]);
  const axiosCommon=useAxiosCommon()
const {data:meals=[],isLoading}=useQuery({
  queryKey:['meals', filter, search],
  queryFn:async()=>{
const res=await axiosCommon(`/meals?category=${filter}&search=${search}`)
return res.data
  }
})
const handlePriceChange = (min, max) => {
  setPriceRange([min, max]);
};

const filteredByPriceMeals = meals.filter(meal =>
  meal.price >= priceRange[0] && meal.price <= priceRange[1]
);


const handleSearch = e => {
  e.preventDefault()
  setSearch(searchText)
}
  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      
    <div className='container px-6 py-10 mx-auto  flex flex-col justify-between'>
      <div>
        <div className='flex flex-col  md:flex-row justify-center items-center gap-5 '>

          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''> Filter-by-Category</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
      <label className="md:text-xl font-bold">Price range: {priceRange[0]} - {priceRange[1]}</label>
      <div className="flex flex-col md:gap-2 mt-1">
      <input 
        type="range" 
        min="0" 
        max="50" 
        value={priceRange[0]} 
        onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])} 
      />
      <input 
        type="range" 
        min="0" 
        max="50" 
        value={priceRange[1]} 
        onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))} 
      />
      </div>
    </div>
        </div>
        </div>
        </div>
    
      {meals && meals.length > 0 && (
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {filteredByPriceMeals.map((meals,i )=> (
            <Card key={i} meals={meals} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default AllMeals;
