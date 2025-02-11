import { useQuery } from "@tanstack/react-query";
import UserData from "./UserData";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure()
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data
    }
  })


  const isUserVerified = users.filter(item => item.isVerified === true && item.role !== 'admin')
  return (
    <div>
      <h1 className="md:text-4xl text-lg my-4 font-semibold text-center">All Varifyed Users: {isUserVerified.length}</h1>
      <div className="overflow-x-auto">
        <table className="table ">
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

    </div>
  );
};

export default AllUsers;