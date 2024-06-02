import { Helmet } from 'react-helmet-async'
import Carousel from '../../components/Banner/Carousel'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>
      <Carousel></Carousel>
      
    </div>
  )
}

export default Home
