import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useState } from 'react'
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import DeleteModal from '../../Modal/DeleteModal'
import { Link } from 'react-router-dom'
import { GrFormView } from 'react-icons/gr'
import UpdateMealModal from '../../Modal/UpdateMealModal'
const UpcomingMealsDataRow = ({ meal, handleDelete, refetch ,i}) => {
  // for delete modal
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  // for update modal
  return (
    <tr>
         <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{i+1}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={meal?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{meal?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{meal?.like}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{meal?.reviews?.length}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {meal?.admin?.name}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
              onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Publish</span>
        </button>
        {/* publish Modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
          meal={meal}
        />
      </td>
     
    </tr>
  )
}

UpcomingMealsDataRow.propTypes = {
  meal: PropTypes.object,
  refetch: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default UpcomingMealsDataRow