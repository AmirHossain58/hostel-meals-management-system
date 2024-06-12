import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import {
  Dialog,
  Listbox,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
const roles = ["guest", "host", "admin"];

const UpdateUserModal = ({ setIsOpen, isOpen, modalHandler, user, handleSubmit,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  setImageFile,
  name,setName,
 }) => {
  const [selected, setSelected] = useState(user.role);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Your Profile
                </DialogTitle>
                  <form
                    // onSubmit={handleSubmit}
                    noValidate=""
                    action=""
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                  >
                <div className="mt-4 w-full">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                          data-temp-mail-org="0"
                        />
                      </div>
                      
            <div className=' p-4 bg-white w-full  m-auto rounded-lg flex justify-evenly items-center'>
              
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      onChange={e => handleImage(e.target.files[0])}
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-100 text-black border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-200'>
                      {/* {imageText} */}
                      {imageText.length > 20
                        ? imageText.split('.')[0].slice(0, 15) +
                          '....' +
                          imageText.split('.')[1]
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
                {imagePreview && <img src={imagePreview} />}
              </div>
            </div>
                    </div>
                </div>
                <hr className="mt- " />

                <div className="flex mt-2 justify-center gap-8">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                    >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                    >
                    Cancel
                  </button>
                </div>
                    </form> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateUserModal.propTypes = {
  user: PropTypes.object,
  modalHandler: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UpdateUserModal;
