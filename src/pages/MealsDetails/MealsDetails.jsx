import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import MealsRequest from "../../components/MealsRequest/MealsRequest";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Testimonials from "./Testimonials";
import { formatDistanceToNow } from "date-fns";
import { GiPlayerTime } from "react-icons/gi";
import { SlLike } from "react-icons/sl";
import { useState } from "react";

const MealsDetails = () => {
  const [like,setLike]=useState(false)
  const [likeCount,setLikeCount]=useState(0)
  
  console.log(like,likeCount);
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosCommon(`/meals/${id}`);
      return res.data;
    },
  });
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
            {/* Room Info */}
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
                flex-row 
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
              <button
              onClick={()=>{
                setLike(!like)
                setLikeCount(like?+1:-1)
              }}
               className={`btn text-xl font-bold ${like&&'text-blue-600'}`}>
                <SlLike /> Like
                </button>
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
