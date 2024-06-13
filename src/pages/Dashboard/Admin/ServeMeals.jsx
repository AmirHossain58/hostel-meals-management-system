import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import AllMealsDataRow from "../../../components/Dashboard/TableRows/AllMealsDataRow";
import { useEffect, useState } from "react";
import AllReviewsDataRow from "../../../components/Dashboard/TableRows/AllReviewsDataRow";
import ServeMealsDataRow from "../../../components/Dashboard/TableRows/ServeMealsDataRow";
const ServeMeals = () => {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  //   Fetch meals  Data
  const {
    data: requestedMeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-requested-meal", search, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/requested-meals?search=${search}&page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/requested-meals-count?search=${search}`
      )(data.count);
      setCount(data.count);
    };
    getCount();
  }, [axiosSecure, search]);
  const numberOfPages = Math.ceil(count / itemsPerPage)(numberOfPages);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    value;
    setCurrentPage(value);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText);
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>Dashboard | Serve Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8"></div>
        <div className=" flex justify-center">
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                placeholder="Enter username or email"
                aria-label="Enter username or email"
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
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
                    email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    status
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

                {requestedMeals?.map((requestedMeal, i) => (
                  <ServeMealsDataRow
                    key={i}
                    i={i}
                    requestedMeal={requestedMeal}
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

export default ServeMeals;
