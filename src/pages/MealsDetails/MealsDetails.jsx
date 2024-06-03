import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import MealsRequest from "../../components/MealsRequest/MealsRequest";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Testimonials from "./Testimonials";
import { formatDistanceToNow } from "date-fns";
import { GiPlayerTime } from "react-icons/gi";
import { SlLike } from "react-icons/sl";
import { useEffect, useState } from "react";
import { MdOutlineReviews } from "react-icons/md";
import useAxiosSecure from './../../hooks/useAxiosSecure';

const MealsDetails = () => {
  const [like,setLike]=useState(false)
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const axiosSecure=useAxiosSecure()
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosCommon(`/meals/${id}`);
      return res.data;
    },
  });
  const [likeCount,setLikeCount]=useState()
  useEffect(()=>{
    setLikeCount(meal?.like)
  },[meal?.like])

  // console.log(like);
  // console.log(likeCount);
  // console.log(meal?.like);
  const {mutateAsync}=useMutation({
    mutationKey:[],
    mutationFn:async(updateData)=>{
      const res=await axiosSecure.put(`/meals/${id}`,updateData)
      return res.data
    }
  })
  const handleLike=async ()=>{
    setLike(!like)
    setLikeCount(!like?likeCount+1:likeCount-1)
    const data={
      like:!like?likeCount+1:likeCount-1,
      isLike:like
    }
    
    // console.log(likeCount);
    console.log(data);
    await mutateAsync(data)
  }
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Helmet>
        <title>{meal?.title}</title>
      </Helmet>
      {meal && (
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div>
              <Heading title={`Category: ${meal?.category}: ${meal?.title}`}/>
              <div className="w-full  overflow-hidden md:h-[60vh] rounded-xl">
                <img
                  className="object-cover md:h-[60vh] w-full"
                  src={meal.image}
                  alt="header image"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* meal Info */}
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div
                  className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
                >
                  <div>Admin: {meal?.admin?.name}</div>

                  <img
                    className="rounded-full  overflow-hidden"
                    height=""
                    width="30"
                    alt="Avatar"
                    src={meal?.admin?.image}
                  />
                </div>
                <div className="flex justify-between items-center antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                <h4 className=''>
                  Post Since: 
                {meal?.postTime &&
                  formatDistanceToNow(new Date(meal?.postTime))}
              </h4>
              <div className='font-semibold'>⭐ {meal?.rating}</div>
                </div>
               
               
      
                <div
                  className="
                flex 
                flex-wrap
                md:flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
                mt-2
              "
                >
                 Ingredients: {meal?.ingredients?.map((data,i)=><div key={i}>{data} </div>)} 
                </div>
              </div>

              <hr />
              <div
                className="
          text-lg font-light text-neutral-500"
              >
                {meal?.description}
              </div>
              <hr />
              {/* like button */}
             <div className="flex  gap-2 md:gap-5">
             <button
              onClick={()=>{
                handleLike()
                // setLike(!like)
                // setLikeCount(like?0:+1)
              }}
               className={`btn w-1/2 text-xl font-bold ${like&&'text-blue-600 border-2 border-blue-500'}`}>
                <SlLike /> Like {likeCount}
                </button>
             <button
               className={`btn w-1/2 text-xl font-bold flex justify-center items-center`}>
                <MdOutlineReviews className="text-2xl" /> Review {meal?.reviews.length}
                </button>
             </div>
              <Testimonials reviews={meal?.reviews}></Testimonials>
            </div>

            <div className="md:col-span-3 order-first md:order-last mb-10">
              {/* MealsRequest */}
              <MealsRequest meal={meal} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MealsDetails;
