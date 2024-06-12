import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import MealsRequest from "../../components/MealsRequest/MealsRequest";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Testimonials from "../MealsDetails/Testimonials";
import { formatDistanceToNow } from "date-fns";
import { GiPlayerTime } from "react-icons/gi";
import { SlLike } from "react-icons/sl";
import { useEffect, useState } from "react";
import { MdOutlineReviews } from "react-icons/md";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ReviewModal from "../../components/Modal/ReviewModal";
import UsePackageMembership from "../../hooks/UsePackageMembership";

const UpcomingMealsDetails = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReq, setIsOpenReq] = useState(false);
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const  [membership,badge]= UsePackageMembership();
  const {
    data: meal = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosCommon(`/upcoming-meals/${id}`);
      return res.data;
    },

  });
  useEffect(()=>{
    const isLike=meal?.likesInfo?.find(info=>info?.email===user?.email)?.isLike
    setLike(isLike)
  },[meal,user?.email])
//   console.log(meal);
  const [likeCount, setLikeCount] = useState();
  useEffect(() => {
    setLikeCount(meal?.like);
  }, [meal?.like]);
  const { mutateAsync } = useMutation({
    mutationKey: [],
    mutationFn: async (updateData) => {
      const res = await axiosSecure.put(`/upcoming-meals/like/${id}`, updateData);
      return res.data;
    },
    onSuccess:async()=>{
        const res = await axiosSecure.put(`/upcoming-meals/likerInfo/${id}`, { liker: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
            isLike:like
        });
      return res.data;
    }
  });
  const { mutateAsync: mutateAsyncReview } = useMutation({
    mutationKey: [],
    mutationFn: async (updateData) => {
      const res = await axiosSecure.put(`/upcoming-meals/review/${id}`, updateData);
      return res.data;
    },
    onSuccess:async()=>{
      const res = await axiosSecure.put(`/upcoming-meals/update/${id}`,{reviewCount:(parseInt(meal.reviewCount)+1)});
      return res.data;
    }
  });
  const handleLike = async () => {
    if (user && user.email) {
        if(membership&&(badge==='Silver'||'Gold'||'Platinum')){
          setLike(!like);
          setLikeCount(!like ? likeCount + 1 : likeCount - 1);
          const data = {
            like: !like ? likeCount + 1 : likeCount - 1,
          };
          await mutateAsync(data);
          refetch();
      }else {
        Swal.fire({
          title: "You are not Subscribed any Package",
          text: "Please subscribed a package to Request Meals?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, subscribe!",
        }).then((result) => {
          if (result.isConfirmed) {
            //   send the user to the membership Packages page
            navigate("/membershipPackages", { state: { from: location } });
          }
        });
      }
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  const handleReview = async (e) => {
    e.preventDefault();
    const reviewComment = e.target.review.value;
    const review = {
      reviewer: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
      rating: rating,
      comment: reviewComment,
      reviewId:user?.email.split('@',)[0]+(parseInt(meal?.reviews?.length)+1)
    };
    console.log(review);
    await mutateAsyncReview(review);
    refetch();
    setIsOpen(false);
  };
  const handleReviewButton = () => {
    if (user && user.email) {
        if(membership&&(badge==='Silver'||'Gold'||'Platinum')){
          setIsOpen(true);
       
      }else {
        Swal.fire({
          title: "You are not Subscribed any Package",
          text: "Please subscribed a package to Request Meals?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, subscribe!",
        }).then((result) => {
          if (result.isConfirmed) {
            //   send the user to the membership Packages page
            navigate("/membershipPackages", { state: { from: location } });
          }
        });
      }
      
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to a Review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
 
 
 
  if (isLoading || loading) return <LoadingSpinner />;

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
              <Heading title={`Category: ${meal?.category}: ${meal?.title}`} />
              <div className="w-full  overflow-hidden md:h-[60vh] rounded-xl">
                <img
                  className="object-cover md:h-[60vh] w-full"
                  src={meal.image}
                  alt="header image"
                />
              </div>
            </div>
          </div>
          <div className=" mt-6">
            {/* meal Info */}
            <div className=" flex flex-col gap-8">
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
                  <h4 className="">
                    Post Since:
                    {meal?.postTime &&
                      formatDistanceToNow(new Date(meal?.postTime))}
                  </h4>
                  <div className="font-semibold">⭐ {meal?.rating}</div>
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
                  Ingredients:{" "}
                  {meal?.ingredients.length>0&&meal?.ingredients?.map((data, i) => (
                    <div key={i}>{data} </div>
                  ))}
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
              <div className="flex  gap-2 md:gap-5">
                {/* like button */}
                <button
                  onClick={() => {
                    handleLike();
                  }}
                  className={`btn w-1/2 text-xl font-bold ${
                    like && "text-blue-600 border-2 border-blue-500"
                  }`}
                >
                  <SlLike /> Like {meal?.like}
                </button>
                {/* review button */}
                <button
                  onClick={handleReviewButton}
                  className={`btn w-1/2 text-xl font-bold flex justify-center items-center`}
                >
                  <MdOutlineReviews className="text-2xl" /> Review{" "}
                  {meal?.reviewCount}
                </button>
                <ReviewModal
                  handleSubmit={handleReview}
                  rating={rating}
                  setRating={setRating}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                ></ReviewModal>
              </div>
              <Testimonials reviews={meal?.reviews}></Testimonials>
            </div>

          </div>
        </div>
      )}
    </Container>
  );
};

export default UpcomingMealsDetails;
