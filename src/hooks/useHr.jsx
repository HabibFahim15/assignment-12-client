import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useHr = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext);
  
  const {data: isHr, isPending:isHrLoading} = useQuery({
    queryKey: [user?.email, 'isHr'],
    queryFn: async() =>{
      const res = await axiosSecure.get(`/users/hr/${user.email}`);
      console.log(res.data);
      return res.data?.hr
    }
  })
  return [isHr,isHrLoading]
};

export default useHr;