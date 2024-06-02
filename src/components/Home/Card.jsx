import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({ meals }) => {
  return (
    <Link to={`/room/${meals?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={meals?.image}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>{meals?.title}</div>
        <div className='font-light text-neutral-500'>$ {meals?.price}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {meals?.price}</div>
          <div className='font-light'></div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  meals: PropTypes.object,
}

export default Card
