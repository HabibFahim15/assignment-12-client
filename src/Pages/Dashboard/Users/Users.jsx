import EmployeeTable from "../../../Components/Dashboard/EmployeeTable";
import userList from "../../../hooks/userList";

const Users = () => {
  const [employee, loading] = userList();
  const employees = employee.filter(item => item.role === 'employee')
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
        employees.map(item => <EmployeeTable key={item._id} item={item}></EmployeeTable>)
      }
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
  );
};

export default Users;