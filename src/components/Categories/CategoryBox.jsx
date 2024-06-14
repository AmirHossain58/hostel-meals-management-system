import PropTypes from 'prop-types'
import { useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
const CategoryBox = ({ label, icon: Icon }) => {
  const [params,setParams]=useSearchParams()
  const category=params.get('category')
  const navigate=useNavigate()
  const handleClick=()=>{
    let currentQuery={category:label}
const url=queryString.stringifyUrl({
  url:'/',
  query:currentQuery
})
navigate(url)
  }
  return (
    <div
    onClick={handleClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-2
  md:p-5
  border-b-2
  hover:text-neutral-800 hover:border-2 hover:border-[#e46f6c]
  transition
  cursor-pointer
  ${category===label&&' border-2 border-[#e46f6c] text-neutral-600'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium flex-grow'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
