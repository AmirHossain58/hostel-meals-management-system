import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import AllMealsDataRow from "../../../components/Dashboard/TableRows/AllMealsDataRow";
import { useEffect, useState } from "react";
import UpcomingMealsDataRow from "../../../components/Dashboard/TableRows/UpcomingMealsDataRow";
import AddUpcomingMealModal from "../../../components/Modal/AddUpcomingMealModal";
const UpcomingMealsTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortLikes, setSortLikes] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  //   Fetch upcoming-meals Data
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-meals", sortLikes],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/upcoming-meals?sortLikes=${sortLikes}`
      );
      return data;
    },
  });
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/upcoming-meals-count?sortLikes=${sortLikes}`
      );

      setCount(data.count);
    };
    getCount();
  }, [axiosSecure, sortLikes]);
  const numberOfPages = Math.ceil(count / itemsPerPage)(numberOfPages);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    value;
    setCurrentPage(value);
  };
  const publishWithLike = meals?.find((meal) => meal?.like >= 10)(
    publishWithLike
  );
  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async (mealData) => {
      mealData;
      const { data } = await axiosSecure.post(`/meals`, mealData);

      return data;
    },
    onSuccess: async (data) => {
      toast.success("Successfully Publish.");
    },
  });

  //  Handle Delete
  const handlePublish = async (meal) => {
    meal;
    const id = meal?._id;
    const mealData = {
      ...meal,
    };
    delete mealData?._id(mealData);
    try {
      const res = await mutateAsync(mealData)(res);
      if (res?.insertedId) {
        const res = await axiosSecure.delete(`/upcoming-meals/${id}`);
        if (res?.data?.deletedCount > 1) {
          refetch();
        }
      }
    } catch (err) {
      err;
    }
  };
  useEffect(() => {
    if (publishWithLike) {
      handlePublish(publishWithLike);
    }
  }, [publishWithLike]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="md:py-8">
          <div className="flex flex-col-reverse items-center md:flex-row justify-center gap-4 md:gap-10">
            <div>
              <select
                onChange={(e) => {
                  setSortLikes(e.target.value);
                }}
                value={sortLikes}
                name="sort"
                id="sort"
                className="border p-4 rounded-md"
              >
                <option value="">Sort By Likes Count</option>
                <option value="dsc">Descending Order</option>
                <option value="asc">Ascending Order</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="btn text-lg font-normal bg-red-50"
              >
                Add Upcoming Meal
              </button>
              {/* Add Upcoming Meal modal */}
              <AddUpcomingMealModal
                refetch={refetch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              ></AddUpcomingMealModal>
            </div>
          </div>
        </div>
        <div className="-mx-4 min-h-[calc(100vh-270px)] sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    likes
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    reviews
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    distributor
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Meal row data */}

                {meals.map((meal, i) => (
                  <UpcomingMealsDataRow
                    key={meal._id}
                    i={i}
                    meal={meal}
                    handleDelete={handlePublish}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Section */}
        <div className="flex justify-center  mt-12">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {/* Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          {/* Next Button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpcomingMealsTable;
