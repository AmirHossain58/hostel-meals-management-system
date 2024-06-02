import { useState } from 'react'
import { Link } from 'react-router-dom'

const Slide = ({ image, text,title }) => {
  const [searchText,setSearchText]=useState('')
  const [search, setSearch] = useState('')
  const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }
  return (
    <div
      className='w-full bg-center  bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
        <div className='text-center'>
          <h1 className='text-xl md:text-3xl font-semibold text-white lg:text-4xl'>
            {title}
          </h1>
          <p className='text-white md:px-14 mt-2'>{text}</p>
          <br />
          <div  className='flex justify-center'>
          <form 
          onSubmit={handleSearch}
          >
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Meals name'
                aria-label='Enter Meals name'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Slide