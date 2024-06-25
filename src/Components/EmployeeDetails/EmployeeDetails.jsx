import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null); // State to store employee data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Assuming axiosSecure is set up to fetch employee details based on ID
        const response = await axiosSecure.get(`/users/${id}`);
        setEmployee(response.data); // Assuming response.data contains the employee details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setLoading(false);
        // Handle error state as needed (e.g., show error message)
      }
    };

    fetchEmployee();
  }, [axiosSecure, id]);

  if (loading) {
    return <div className="flex justify-center min-h-svh items-center"><span className="loading loading-spinner loading-lg"></span></div>;  
  }

  if (!employee) {
    return <div>Employee not found</div>; 
  }
  const {displayName, email,photoUrl,Designation,role, salary} = employee;
  return (
  <div className="">
    <div
    className=" mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32  overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32 w-32" src={photoUrl} alt='Woman looking front' />
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold text-2xl">{displayName}</h2>
        <p className="text-gray-500">{Designation}</p>
    </div>
    <div className="py-4 mt-2 text-gray-700 grid">
        <p className="font-semibold text-center mb-4 text-lg"> {email} </p>
        <div className="flex justify-around">
          <p className="text-green-400">  {salary} </p>
          <p className="text-cyan-400"> #{role} </p>
        </div>
    </div>
    
</div>
  </div>
  );
};

export default EmployeeDetails;