import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Routes/PirvateRoute";

import ErrorPage from "../Pages/Error/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import Users from "../Pages/Dashboard/Users/Users";


import Progress from "../Pages/Dashboard/Progress/Progress";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashBoardStat from "../Components/Dashboard/DashBoardStat";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import EmployeeDetails from "../Components/EmployeeDetails/EmployeeDetails";
import PublicReview from "../Pages/Dashboard/PublicReview/PublicReview";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login /> 
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/contactUs',
        element: <ContactUs></ContactUs>
      }
     
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path: '/dashboard',
        element: <DashBoardStat></DashBoardStat>
      },
      // employee
      {
        path: 'work-sheet',
        element: <EmployeeRoute><WorkSheet></WorkSheet></EmployeeRoute>
      },
      {
        path: 'payment-history',
        element: <EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute>

      },

      // Hr routes
      {
        path: 'progress',
        element: <HrRoute><Progress></Progress></HrRoute>
      },
      {
        path: 'employee-list',
        element: <HrRoute><Users></Users></HrRoute>
      },
      {
        path: 'employee-list/details/:id',
        element: <EmployeeDetails></EmployeeDetails>
      },

      // admin routes
      {
        path: 'all-employee-list',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'public-review',
        element: <AdminRoute><PublicReview></PublicReview></AdminRoute>
      },

      {
        path: 'contact-us',
        element: <ContactUs></ContactUs>
      }
    ]
  }

]);