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
import Profile from '../pages/Dashboard/Common/Profile'
import RequestedMeals from '../pages/Dashboard/Guest/RequestedMeals'
import MyReviews from '../pages/Dashboard/Guest/MyReviews'
import PaymentHistory from '../pages/Dashboard/Guest/PaymentHistory'

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
        path: 'requested-meals',
        element: (
          <PrivateRoute>
            <RequestedMeals />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <PaymentHistory />
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

