import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";

const EmployeeRoute = ({children}) => {
  const {user ,loading} = useContext(AuthContext)
  const [isEmployee,isEmployeeLoading] =useEmployee()
  const location = useLocation()
  
  if(loading || isEmployeeLoading){
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-600"></div>
  }
  if(user && isEmployee){
    return children;
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
   
};

export default EmployeeRoute;