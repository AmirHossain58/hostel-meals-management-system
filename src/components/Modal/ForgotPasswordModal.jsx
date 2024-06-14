import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { ImSpinner10 } from "react-icons/im";

const ForgotPasswordModal = ({
  setIsOpen,
  isOpen,
  loading,
  setEmail,
  handleResetPassword,
}) => {
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  <form
                    noValidate=""
                    action=""
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                  >
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-start text-sm"
                        >
                          Email address
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          id="email"
                          required
                          placeholder="Enter Your Email Here"
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#dd8c89] bg-gray-200 text-gray-900"
                          data-temp-mail-org="0"
                        />
                      </div>
                    </div>
                    {/* 
          <div>
            <button
              type='submit'
              className='bg-[#dd8c89] w-full rounded-md py-3 text-white'
            >
               {loading?<ImSpinner10 className='animate-spin mx-auto text-xl' /> :'Continue'}
            </button>
          </div> */}
                  </form>
                </DialogTitle>
                <div className="mt-2 w-full">{/* Update meal form */}</div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      handleResetPassword();
                      setIsOpen(false);
                    }}
                  >
                    Send
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

ForgotPasswordModal.propTypes = {
  setIsOpen: PropTypes.func,
  handleResetPassword: PropTypes.func,
  setEmail: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ForgotPasswordModal;
