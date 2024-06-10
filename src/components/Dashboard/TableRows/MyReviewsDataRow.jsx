import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { GrFormView } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import ReviewModal from '../../Modal/ReviewModal'
import ReviewModalEdit from '../../Modal/ReviewModalEdit'

const MyReviewsDataRow = ({myReview, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [rating, setRating] = useState(myReview?.review?.rating);
  
  const closeModal = () => {
    setIsOpen(false)
  }
const reviewId=myReview?.review?.reviewId
  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.put(`/meals-review/${id}`,{reviewId})
      return data
    },
    onSuccess: async data => {
      console.log(data)
      refetch()
      toast.success('Review deleted successfully.')
     setIsOpen(false)
    },
  })
  const { mutateAsync:mutateAsyncReview } = useMutation({
    mutationFn: async review => {
      const { data } = await axiosSecure.put(`/meals-review-edit/${myReview?.mealId}`,review)
      return data
    },
    onSuccess: async data => {
      console.log(data)
      refetch()
      toast.success('Review Update successfully.')
     setIsOpenEdit(false)
    },
  })

  //  Handle Delete
  const handleDelete = async id => {
    
    console.log(id)
    try {
      await mutateAsync(id)
    } catch (err) {
      console.log(err)
    }
  }
  const handleReviewEdit = async (e) => {
    e.preventDefault();
    const reviewComment = e.target.review.value;
    const review = {
      rating: rating,
      comment: reviewComment,
      reviewId:myReview?.review?.reviewId
    };
    console.log(review);
    await mutateAsyncReview(review);
    refetch();
    setIsOpen(false);
  };
 

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={myReview?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{myReview?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {  <p className='text-gray-900 whitespace-no-wrap'>{myReview?.like}</p>}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{myReview?.review?.comment}</p>
      </td>
      <td className='px-5 py-5 border-b  border-gray-200 bg-white text-sm'>
        <button
        onClick={()=>setIsOpenEdit(true)}
        className='text-gray-900 whitespace-no-wrap'>
            <div className='flex items-center gap-1 relative cursor-pointer px-3 py-1 font-semibold  leading-tight  bg-gray-200 opacity-50 rounded-full'>
        <MdModeEdit />Edit
            </div>
        </button>
        <ReviewModalEdit
        comment={myReview?.review?.comment}
        rating={rating}
        setRating={setRating}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        handleSubmit={handleReviewEdit}
        ></ReviewModalEdit>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-700 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative flex items-center'><MdDelete /> Delete</span>
        </button>
        {/* Delete Modal */}
        <DeleteModal
          handleDelete={handleDelete}
          closeModal={closeModal}
          isOpen={isOpen}
          id={myReview?.mealId}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <Link className='' to={`/meals/${myReview?.mealId}`}>
            
        <p className='text-gray-900 whitespace-no-wrap flex items-center gap-1 relative cursor-pointer px-3 py-1 font-semibold  leading-tight  bg-gray-200 opacity-50 rounded-full'>
        <GrFormView className='text-lg' /> View
        </p>
        </Link>
      </td>
    </tr>
  )
}

MyReviewsDataRow.propTypes = {
    myReview: PropTypes.object,
  refetch: PropTypes.func,
}

export default MyReviewsDataRow