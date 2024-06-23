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

import ContactUs from "../Pages/Dashboard/ContactUs/ContactUs";
import Progress from "../Pages/Dashboard/Progress/Progress";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
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
     
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      // employee
      {
        path: 'work-sheet',
        element: <WorkSheet></WorkSheet>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>

      },

      // Hr routes
      {
        path: 'progress',
        element: <Progress></Progress>
      },
      {
        path: 'employee-list',
        element: <Users></Users>
      },

      // admin routes
      {
        path: 'all-employee-list',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'contact-us',
        element: <ContactUs></ContactUs>
      }
    ]
  }

]);