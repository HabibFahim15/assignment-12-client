import React, { useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);

const UserModal = ({ user, onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!user) return null;

  const { displayName, email, salary, bank_account_no, isVerified, photoUrl } = user;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{displayName}</h2>
        <div className="flex gap-4 mb-4">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={photoUrl} alt={`${displayName} Avatar`} />
            </div>
          </div>
          <div>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Salary:</strong> {salary}</p>
            <p><strong>Bank Account:</strong> {bank_account_no}</p>
            <p><strong>Verified:</strong> {isVerified ? 'Yes' : 'No'}</p>
          </div>
        </div>
        {isVerified && !showCheckout && (
          <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>Pay Now</button>
        )}
        {showCheckout && (
          <Elements stripe={stripePromise}>
            <CheckoutForm salary={salary} _id={user._id} email={email} />
          </Elements>
        )}
        <button className="btn btn-secondary mt-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
