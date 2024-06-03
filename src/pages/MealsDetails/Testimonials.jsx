import PropTypes from "prop-types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
const Testimonials = ({ reviews }) => {

  return (
    <div>
      <div className="">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews?.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="text-center flex flex-col items-center space-y-5 md:m-10">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.rating}
                  readOnly
                />
                <p>{review?.comment}</p>
                {review?.image&&<div className="avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <img src={review?.image} />
                  </div>
                </div>}



                <h3 className="text-2xl text-orange-400">{review.reviewer}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

Testimonials.propTypes = {
  reviews: PropTypes.array,
};
export default Testimonials;
