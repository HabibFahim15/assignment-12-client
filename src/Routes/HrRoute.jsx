import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useHr from "../hooks/useHr";

const HrRoute = ({children}) => {
  const {user ,loading} = useContext(AuthContext)
  const [isHr, isHrLoading] =useHr()
  const location = useLocation()
  
  if(loading || isHrLoading){
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-600"></div>
  }
  if(user && isHr){
    return children;
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default HrRoute;