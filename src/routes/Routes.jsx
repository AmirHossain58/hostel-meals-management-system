import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import AllMeals from '../pages/Meals/AllMeals'
import MealsDetails from '../pages/MealsDetails/MealsDetails'
import Checkout from '../pages/Checkout/Checkout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meals/:id',
        element: <MealsDetails />,
      },
      {
        path: '/meals',
        element: <AllMeals/>,
      },
      {
        path: '/checkout/:pack',
        element: <Checkout/>,
        loader:({params})=>fetch(`/packages.json`)
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
