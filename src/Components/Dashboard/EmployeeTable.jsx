import { FaXmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const EmployeeTable = ({ item, refetch }) => {

  const axiosSecure = useAxiosSecure()
  const { _id, displayName, isVerified, bank_account_no, salary, photoUrl, email } = item;




  // TODO : add publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK)

  const handleVarified = () => {
    axiosSecure.patch(`/users/employee/${_id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
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
            title: `${displayName} is Verified`
          });
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

     {
      isVerified ?  <th>
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Pay Now</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold my-4 text-lg">Payable Salary {salary}</h3>
          {/* content */}
          <Elements stripe={stripePromise}>
            <CheckoutForm salary={salary} _id={_id} email={email} />
          </Elements>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </th> : <p className="text-center flex">Not Payable</p>
     }
      <th>
        <button className="btn btn-ghost btn-xs">
          {
            isVerified ? <div className="text-red font-semibold text-2xl"> <FcCheckmark /></div> : <div onClick={() => handleVarified(item)} className="text-red font-semibold text-2xl"> <FaXmark /></div>
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