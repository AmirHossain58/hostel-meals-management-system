import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import AllMeals from '../pages/Meals/AllMeals'
import MealsDetails from '../pages/MealsDetails/MealsDetails'
import Checkout from '../pages/Checkout/Checkout'
import Membership from '../components/Home/MembershipPackages/Membership'
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'
import Profile from '../pages/Dashboard/Common/Profile'

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
        element: <PrivateRoute><Checkout/></PrivateRoute>,
        loader:()=>fetch(`/packages.json`)
      },
      {
        path: '/membershipPackages',
        element: <PrivateRoute><Membership/></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: 'my-listings',
      //   element: (
      //     <PrivateRoute>
      //       <HostRoute>
      //         <MyListings />
      //       </HostRoute>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
])

