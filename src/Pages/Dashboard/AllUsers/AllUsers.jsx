import { useQuery } from "@tanstack/react-query";
import UserData from "./UserData";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure()
 const {data: users = [], refetch} = useQuery({
  queryKey: ['users'],
  queryFn: async()=>{
      const res = await axiosSecure.get('/users');
      return res.data
  }
 })
 

 const isUserVerified = users.filter(item => item.isVerified === true && item.role !== 'admin')
  return (
    
    <div>
      <h1>This is all users: {users.length}</h1>
      <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>Bank Account</th>
        <th>Role</th>
        <th>Make Hr</th>
        <th>Fire</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        isUserVerified.map(item => <UserData key={item._id} item={item} refetch={refetch}></UserData>)
      }
      
    </tbody>
    {/* foot */}
    
    
  </table>
    </div>
  );
};

export default AllUsers;