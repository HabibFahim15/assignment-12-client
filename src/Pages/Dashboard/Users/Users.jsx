import { useQuery } from "@tanstack/react-query";
import EmployeeTable from "../../../Components/Dashboard/EmployeeTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {


  const axiosSecure = useAxiosSecure()
 const {data: users = [], refetch, isLoading} = useQuery({
  queryKey: ['users'],
  queryFn: async()=>{
      const res = await axiosSecure.get('/users');
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
  const employees = users.filter(item => item.role === 'employee')
  console.log(employees);
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>Bank Account</th>
        <th>Pay</th>
        <th>Verified</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        employees.map(item => <EmployeeTable key={item._id} item={item} refetch={refetch}></EmployeeTable>)
      }
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
  );
};

export default Users;