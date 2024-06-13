/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UpdateMealForm from "../Form/UpdateMealForm";
import { imageUpload } from "./../../Api/utils/index";

const UpdateMealModal = ({ setIsEditModalOpen, isOpen, meal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState(meal);

  //   handle Image update
  const handleImage = async (image) => {
    setLoading(true);
    try {
      // upload image
      const image_url = await imageUpload(image)(image_url);
      setMealData({ ...mealData, image: image_url });
      setLoading(false);
    } catch (err) {
      err;
      setLoading(false);
      toast.error(err.message);
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const updatedMealData = Object.assign({}, mealData);
    delete updatedMealData._id(updatedMealData);
    try {
      const { data } = await axiosSecure.put(
        `/meals/update/${meal?._id}`,
        updatedMealData
      )(data);
      refetch();
      setIsEditModalOpen(false);
      setLoading(false);
      toast.success("Meal info updated");
    } catch (err) {
      err;
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
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
                  Update Meal Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update meal form */}
                  <UpdateMealForm
                    handleSubmit={handleSubmit}
                    mealData={mealData}
                    loading={loading}
                    handleImage={handleImage}
                    setMealData={setMealData}
                  />
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
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

UpdateMealModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  meal: PropTypes.object,
};

export default UpdateMealModal;
