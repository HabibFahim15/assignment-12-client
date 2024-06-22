import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const CheckOutForm = ({salary, _id, email}) => {
  const [error, setError] =useState('')
  const [clientSecret, setClientSecret] =useState('')
  const [transactionId, setTransactionId] =useState('')
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext);
  console.log(salary);

  useEffect(()=>{
    axiosSecure.post('/create-payment-intent', {price: salary})
    .then(res => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure, salary])

  const handleSubmit = async(event) =>{
      event.preventDefault()

      if(!stripe || !elements){
        return
      }
      const card = elements.getElement(CardElement)

      if(card === null){
        return
      }
      const {error, paymentMethod} =await stripe.createPaymentMethod({
        type: 'card',
        card
      })
      if(error){
        console.log('payment error', error)
        setError(error.message)
      }
      else{
        console.log('payment method', paymentMethod);
        setError('')
      }

      // confirm payment
      const {paymentIntent , error:confirmError } = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card: card,
         billing_details: {
          email : user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
         }
        }
      })
      if(confirmError){
        console.log('confirm error');
      }
      else{
        console.log('payment intent', paymentIntent);
        if(paymentIntent.status === 'succeeded'){
          setTransactionId(paymentIntent.id)

          // payment sending database
          const payment = {
            email: email,
            price: salary,
            id: _id,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'paid'

          }
         const res = await axiosSecure.post('/payments', payment)
         console.log(res);

        }
      }

  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
     <div className="flex justify-center items-center">
     <button className="mt-8  btn btn-md px-24 bg-purple-400 text-white " type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
     </div>
      <p className="text-red-600">
        {error}
      </p>
      {
        transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>
      }
    </form>
  );
};

export default CheckOutForm;