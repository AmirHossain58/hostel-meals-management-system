/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import UpdateMealForm from '../Form/UpdateMealForm'
import { imageUpload } from './../../Api/utils/index';
import AddMealForm from './../Form/AddMealForm';
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth'
const AddUpcomingMealModal = ({ setIsOpen, isOpen, meal, refetch }) => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [imagePreview, setImagePreview] = useState()
    const [imageValue, setImageValue] = useState()
    const [imageText, setImageText] = useState('Upload Image')

  
    const { mutateAsync } = useMutation({
      mutationFn: async mealData => {
        const { data } = await axiosSecure.post(`/upcoming-meals`, mealData)
        return data
      },
      onSuccess: () => {
        console.log('Data Saved Successfully')
        toast.success(' Meal Added Successfully!')
        refetch()
        setLoading(false)
        setIsOpen(false)

      },
    })
  
    //   Form handler
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        console.log(imageValue);
        setLoading(true)
        const title = data.title
        const category = data.category
        const ingredients = data.ingredients
        const price = data.price
        const description = data.description    
        const admin = {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        }
    
        try {
          const image_url = await imageUpload(imageValue)
          const mealData = {
              title,
              category,
              image:image_url,
              ingredients:[ingredients.split(',')],
              description,
               price,
                rating:0, 
                postTime:new Date(), 
                like:0,
                reviews:[],
            admin: admin,
          }
          console.table(mealData)
          //   Post request to server
          await mutateAsync(mealData)
          setLoading(false)
        } catch (err) {
          console.log(err)
          toast.error(err.message)
          setLoading(false)
        }
    };

  
    //   handle image change
    const handleImage = image => {
        setImageValue(image)
      setImagePreview(URL.createObjectURL(image))
      setImageText(image.name)
    }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Add Upcoming Meal
                </DialogTitle>
                <div className='mt-2 w-full'>
                  {/* Update room form */}
                  <AddMealForm
                    handleSubmit={handleSubmit}
                    register={register}
                    error={errors}
                    onSubmit={onSubmit}
                    setImagePreview={setImagePreview}
                    imagePreview={imagePreview}
                    handleImage={handleImage}
                    imageText={imageText}
                    loading={loading}
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

AddUpcomingMealModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  meal: PropTypes.object,
}

export default AddUpcomingMealModal