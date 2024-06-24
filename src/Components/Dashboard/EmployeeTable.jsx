import React, { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { FcCheckmark } from 'react-icons/fc';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UserModal from './UserModal';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ item, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, displayName, isVerified, bank_account_no, salary, photoUrl, email } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasPaid, setHasPaid] = useState(false); // Track payment status
  const [paymentDisabled, setPaymentDisabled] = useState(false); // Disable button after payment

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axiosSecure.get(`/payments/check/${_id}`);
        const { status, date } = response.data; // Assuming backend sends payment status and last payment date

        // Determine if payment has been made
        if (status === 'paid') {
          setHasPaid(true);

         const  lastPaymentDate = new Date(date); 
          const today = new Date();
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(today.getMonth() - 1); 

          if (lastPaymentDate >= oneMonthAgo) {
            setPaymentDisabled(true); 
          } else {
            setPaymentDisabled(false); 
          }
        } else {
          setHasPaid(false);
          setPaymentDisabled(false);
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    };

    fetchPaymentStatus();
  }, [axiosSecure, _id]);

  const handleVerified = () => {
    axiosSecure.patch(`/users/employee/${_id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: 'success',
          title: `${displayName} is Verified`,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
          timerProgressBar: true,
        });
        setHasPaid(true); // Simulate setting paid status
        setPaymentDisabled(true); // Disable payment for the current month
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
            <button className="btn" onClick={handleOpenModal} disabled={hasPaid && paymentDisabled}>
              Pay Now
            </button>
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
          <Link to={`details/${_id}`} className="btn btn-ghost btn-xs">details</Link>
        </th>
      </tr>
      {isModalOpen && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default EmployeeTable;
