import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext);
  
  const {data: isAdmin} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async() =>{
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data);
      return res.data?.admin
    }
  })
  return [isAdmin]
};

export default useAdmin;