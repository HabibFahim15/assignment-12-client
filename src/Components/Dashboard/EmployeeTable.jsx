import { FaXmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";  // Import useState hook
import UserModal from "./UserModal";  // Import the new UserModal component

const EmployeeTable = ({ item, refetch }) => {

  const axiosSecure = useAxiosSecure();
  const { _id, displayName, isVerified, bank_account_no, salary, photoUrl, email } = item;

  const [selectedUser, setSelectedUser] = useState(null);  // State to manage selected user data
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility

  const handleVerified = () => {
    axiosSecure.patch(`/users/employee/${_id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${displayName} is Verified`,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            timerProgressBar: true,
          });
        }
      });
  };

  const handleOpenModal = () => {
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
        <td>{email}</td>
        <td>{salary}</td>
        <td>{bank_account_no}</td>
        {isVerified ? (
          <th>
            <button className="btn" onClick={handleOpenModal}>Pay Now</button>
          </th>
        ) : (
          <p className="text-center flex">Not Payable</p>
        )}
        <th>
          <button className="btn btn-ghost btn-xs">
            {isVerified ? (
              <div className="text-red font-semibold text-2xl">
                <FcCheckmark />
              </div>
            ) : (
              <div onClick={handleVerified} className="text-red font-semibold text-2xl">
                <FaXmark />
              </div>
            )}
          </button>
        </th>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={handleOpenModal}>details</button>
        </th>
      </tr>

      {/* Render the UserModal */}
      {isModalOpen && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default EmployeeTable;
