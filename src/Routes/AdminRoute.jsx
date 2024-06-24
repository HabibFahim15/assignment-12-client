import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
  const {user ,loading} = useContext(AuthContext)
  const [isAdmin, isAdminLoading] =useAdmin()
  const location = useLocation()
  
  if(loading || isAdminLoading){
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-600"></div>
  }
  if(user && isAdmin){
    return children;
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminRoute;