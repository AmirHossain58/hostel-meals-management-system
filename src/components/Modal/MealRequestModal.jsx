import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { format } from 'date-fns'
import { Fragment } from 'react'
import { categories } from './../Categories/CategoriesData';
import CheckoutForm from '../Form/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ImSpinner9 } from 'react-icons/im';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const MealRequestModal = ({ closeModal, isOpen, mealInfo,refetch,handleMealRequest }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                    Review Info Before Request
                  </DialogTitle>
                  <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Category : {mealInfo?.category}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Meal : {mealInfo?.title}
                    </p>
                  </div>
  
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Price: $ {mealInfo?.price}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                    Description : {mealInfo?.description}
                    </p>
                  </div>
                  <hr className='mt-8 ' />
                 
                  <div className='flex mt-2 justify-around'>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {/* {processing ? (
              <ImSpinner9 className='animate-spin m-auto' size={24} />
            ) : (
              `Pay ${bookingInfo?.price}`
            )} */}
            add
          </button>
          <button
            onClick={closeModal}
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
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
    );
};
MealRequestModal.propTypes = {
    mealInfo: PropTypes.object,
    closeModal: PropTypes.func,
    refetch: PropTypes.func,
    isOpen: PropTypes.bool,
  }

export default MealRequestModal;