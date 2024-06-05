import { useEffect, useState } from 'react'
import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from './../../hooks/useAxiosCommon';
import { useSearchParams } from 'react-router-dom'

const Meals = () => {
  const [params,setParams]=useSearchParams()
  const category=params.get('category')
  const axiosCommon=useAxiosCommon()
const {data:meals=[],isLoading}=useQuery({
  queryKey:['meals',category],
  queryFn:async()=>{
const res=await axiosCommon(`/meals?category=${category}`)
return res.data
  }
})
  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
    
      {meals && meals.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {meals.map((meals,i )=> (
            <Card key={i} meals={meals} />
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

export default Meals
