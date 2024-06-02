// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation  } from 'swiper/modules'
import Slide from './Slide'
import Container from './../Shared/Container';
import { useRef, useState } from 'react'


export default function Carousel() {
  return (
  <Container> 
    <div className='py-10 mx-auto'>
  <Swiper
 
    spaceBetween={30}
    centeredSlides={true}
    loop={true}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className='mySwiper'
  >
    <SwiperSlide>
      <Slide
        image={'https://i.ibb.co/3zZ9dQ7/roommates-eating-together-medium-shot.jpg'}
        title='Start Your Day Right with a Nutritious Breakfast!'
        text='Join us every morning for a delicious and healthy breakfast that fuels your body and mind. Taste the variety, savor the goodness, and kickstart your day with our balanced meals designed to keep you energized throughout the day.'
      />
    </SwiperSlide>
    <SwiperSlide>
      <Slide
        image={'https://i.ibb.co/Y7GWs0Y/young-man-picks-food-plate-party.jpg'}
        title='Savor the Midday Flavor!'
        text='Recharge with our delectable lunch options, crafted to bring you a perfect blend of taste and nutrition. Enjoy a variety of meals that cater to every palate, ensuring you stay energized and satisfied throughout the afternoon.'
      />
    </SwiperSlide>
    <SwiperSlide>
      <Slide
        image={'https://i.ibb.co/ZNhkqgT/20449.jpg'}
        title='End Your Day with a Perfect Dinner!'
        text='Join us for a delightful dinner that combines comfort and flavor. Our diverse menu offers something for everyone, ensuring a satisfying end to your day with wholesome and delicious meals. Relax, dine, and enjoy the evening with us.'
      />
    </SwiperSlide>
    
    
   
    
  </Swiper>
</div></Container>
  )
}