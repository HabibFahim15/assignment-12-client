import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentHistoryTable from "../../../Components/Dashboard/Payment-History/PaymentHistoryTable";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext)
 const {data: salary = [],  isLoading} = useQuery({
  queryKey: ['salary'],
  queryFn: async()=>{
      const res = await axiosSecure.get('/payments');
      return res.data
  }
 })
 if(isLoading){
  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
const PaymentHistory = salary.filter(item => item.email === user.email)
  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-2xl font-bold my-8">
        Salary History
      </h1>
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          
          <th>Month</th>
          <th>Amount</th>
          <th>Transaction Id</th>
          <th>Status</th>
          
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {
          PaymentHistory.map(item => <PaymentHistoryTable key={item._id} item={item}></PaymentHistoryTable>)
        }
        
      </tbody>
      {/* foot */}
      
      
    </table>
  </div>
  );
};

export default PaymentHistory;