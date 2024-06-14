import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'

const Card = ({ meals,address }) => {
  return (
    <Link to={`${address?address:'/meals'}/${meals?._id}`} className='col-span-1  border  p-2  rounded-lg cursor-pointer group'>
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
            alt='meal'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold mb-2 text-lg'>{meals?.title}</div>
        <div className='flex flex-row items-center justify-between gap-1 mb-2'>
          <div className='font-semibold'>$ {meals?.price}</div>
          <div className='font-light'></div>
          <div className='font-semibold'>⭐ {meals?.rating}</div>
          <div className='font-light'></div>
        </div>
        <Button label={'Details'}></Button>
      </div>
    </Link>
  )
}

Card.propTypes = {
  meals: PropTypes.object,
}

export default Card
