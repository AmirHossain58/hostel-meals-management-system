import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from './../../hooks/useAxiosCommon';
import Card from '../../components/Home/Card';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Container from '../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';

const UpcomingMeals = () => {
  const axiosCommon=useAxiosCommon()
const {data:meals=[],isLoading}=useQuery({
  queryKey:['meals'],
  queryFn:async()=>{
const res=await axiosCommon(`/upcoming-meals`)
return res.data
  }
})
  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
    <Helmet>
          <title>Hostel Meals Management | Upcoming Meals</title>
        </Helmet>
      {meals && meals.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {meals.map((meals,i )=> (
            <Card
            address='/upcomingMeals'
             key={i} 
             meals={meals} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          {/* <Heading
            center={true}
            title=''
            subtitle=''
          /> */}
        </div>
      )}
    </Container>
  )
}

export default UpcomingMeals
