import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const UserData = ({item, refetch}) => {
  const axiosSecure = useAxiosPublic()
  const {_id,displayName,bank_account_no,salary,role,photoUrl,email} =item;

  const handleMakeHr = () =>{
    axiosSecure.patch(`/users/hr/${_id}`)
    .then(res =>{
      console.log(res.data);
      if(res.data.modifiedCount > 0){
        refetch()
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: `${displayName} is an Hr Now`
        });
      }
    })
  }

  const handleFireUser = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Fire him/her!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/users/${_id}`)
        .then(res =>{
          if(res.data.deletedCount > 0){
            refetch()
             Swal.fire({
               title: "Fired!",
               text: "Worker has Fired Successfuly.",
               icon: "success"
             });
          }
        })
      }
    })
  }
  

  
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
      <button className="btn btn-ghost btn-xs uppercase">{role}</button>
    </th>
    <th>
      <p 
      onClick={()=> handleMakeHr(item)}
      >
        {
          role==='hr' ? <p className="bg-orange-50 w-24 py-2 text-center rounded-2xl">Hr</p> : <button className="bg-green-300   btn-ghost px-3 py-2 text-center rounded-2xl">
            Make Hr
          </button>
        }
      </p>
    </th>
    <th>
      <button onClick={()=> handleFireUser(item)} className="bg-red-300   btn-ghost px-3 py-2 text-center rounded-2xl">Fire</button>
    </th>
  </tr>
  );
};

export default UserData;