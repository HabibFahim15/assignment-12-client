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
    element: <Dashboard></Dashboard>,
    children:[
      {
        path: 'employee-list',
        element: <Users></Users>
      }
    ]
  }

]);