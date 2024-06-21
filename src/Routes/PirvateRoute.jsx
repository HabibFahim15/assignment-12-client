import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PirvateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation()
  if(user){
    return children;
  }
  if(loading){
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-600"></div>
  }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}
export default PirvateRoute;