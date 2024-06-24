import { useContext } from 'react';
import {FaGoogle} from 'react-icons/fa'
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
  const {googleSignIn} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const handleGoogleSignIn= () =>{
      googleSignIn()
      .then(result => {
        console.log(result);
        const userInfo = {
          displayName: result.user?.displayName,
          email: result.user?.email,
          photoUrl: result.user?.photoURL,
          role: 'employee',
          isVerified: false,
          bank_account_no: result.user?.createdAt,
          salary: '20000',
          Designation: 'digital marketing',
          status: 'in'
        }
        axiosPublic.post('/users', userInfo)
        .then(res =>{
          console.log(res.data);
          navigate('/')
        })
      })
  }

  return (
    
      <button onClick={handleGoogleSignIn} className=" flex justify-center border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
      <span className='flex gap-3'> <FaGoogle className='text-lg text-green-700'></FaGoogle> Continue with Google</span>
    </button>
  );
};

export default SocialLogin;