import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />
const Login = () => {
 
  const {signIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/';

  const handleLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value
    console.log(email, password);
    signIn(email, password)
    .then(()=>{
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
        title: "Signed in successfully"
      });
      navigate(from, ( {replace: true } ));
    })
    .catch(error =>{
      console.log('Login Faild:', error);
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
        icon: "error",
        title: "Login Faild try again"
      });
    })
  }



  return (


<div className="min-h-screen flex flex-col items-center  justify-center bg-blue-100">
  <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
    
    <SocialLogin></SocialLogin>


    <div className="relative mt-10 h-px bg-gray-300">
      <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
      </div>
    </div>
    <div className="mt-10">

      {/* form */}
      <form onSubmit={handleLogin}>
        <div className="flex flex-col mb-6">
          <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>

            <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
          </div>
        </div>

        

        <div className="flex w-full">
         
          <input type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" value="Login" />
        </div>
      </form>
    </div>
    <div className="flex justify-center items-center mt-6">
      <Link to='/register' href="#"  className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
        <span className="ml-2">You do not have an account?</span>
      </Link>
    </div>
  </div>
</div>
  );
};

export default Login;