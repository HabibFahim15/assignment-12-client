import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useEmployee = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext);
  
  const {data: isEmployee,  isPending:isEmployeeLoading} = useQuery({
    queryKey: [user?.email, 'isEmployee'],
    queryFn: async() =>{
      const res = await axiosSecure.get(`/users/employee/${user.email}`);
      
      return res.data?.employee
    }
  })
  return [isEmployee,isEmployeeLoading]
};

export default useEmployee;




 