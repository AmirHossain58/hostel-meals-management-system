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
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import ServedModal from '../../Modal/ServedModal'
const ServeMealsDataRow = ({requestedMeal, refetch ,i}) => {
    const axiosSecure=useAxiosSecure()
  // for delete modal
  const [isOpen, setIsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    //   delete
    const { mutateAsync } = useMutation({
        mutationFn: async(id) => {
            const { data } = await axiosSecure.put(`/requested-meals/${id}`,{status:'delivered'})
          
          return data
        },
        onSuccess: data => {
          console.log(data)
          refetch()
          toast.success('Successfully Status Change')
        },
      })
    
      //  Handle Delete
      const handleServeMeal = async (meal) => {
        const id=meal?._id
        try {
          await mutateAsync(id)
        } catch (err) {
          console.log(err)
        }
      }
  const closeModal = () => {
    setIsOpen(false)
  }

 
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
                src={requestedMeal?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{requestedMeal?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{requestedMeal?.requesterEmail}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{requestedMeal?.requesterName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {requestedMeal?.status}
        </p>
      </td>
    
     
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Serve</span>
        </button>
        {/* Delete modal */}
        <ServedModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleServeMeal}
          meal={requestedMeal}
        />
      </td>
     
     
    </tr>
  )
}

ServeMealsDataRow.propTypes = {
    requestedMeal: PropTypes.object,
  refetch: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default ServeMealsDataRow