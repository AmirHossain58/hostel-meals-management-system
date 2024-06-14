import { Helmet } from 'react-helmet-async'
import Carousel from '../../components/Banner/Carousel'
import Categories from './../../components/Categories/Categories';
import Meals from '../../components/Home/Meals';
import Membership from '../../components/Home/MembershipPackages/Membership';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Hostel Meals Management | Student Meals | Food Reviews</title>
      </Helmet>
      <Carousel></Carousel>
        {/* Categories section  */}
        <Categories />
      {/* Meals section */}
      <Meals />
      <Membership></Membership>
   
      
    </div>
  )
}

export default Home
