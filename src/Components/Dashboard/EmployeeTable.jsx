
const EmployeeTable = ({item}) => {
  const {displayName, isVerified,bank_account_no,salary,photoUrl,email} =item;
  return (
    <tr>
        
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={photoUrl} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold">{displayName}</div>
        </div>
      </div>
    </td>
    <td>
      {email}
    </td>
    <td>{salary}</td>
    <td>{bank_account_no}</td>
    
    <th>
      <button className="btn btn-ghost btn-xs">Pay now</button>
    </th>
    <th>
      <button className="btn btn-ghost btn-xs">
        {
          isVerified ? 'varified' : 'X'
        }
      </button>
    </th>
    <th>
      <button className="btn btn-ghost btn-xs">details</button>
    </th>
  </tr>
  );
};

export default EmployeeTable;