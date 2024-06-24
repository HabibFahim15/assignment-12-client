import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()


  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);


        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // create user entry in the database

            const userInfo = {
              displayName: data.name,
              email: data.email,
              photoUrl: data.photoURL,
              role: data.role,
              isVerified: false,
              bank_account_no: data.bank,
              salary: data.salary,
              Designation: data.designation,
              status: 'in',
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database');
                  reset()
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
                  navigate('/')
                }
              })

          })
          .catch(error => console.log(error))
      })
  }




  return (
    <div className="min-h-screen flex flex-col items-center  justify-center bg-blue-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Create Your Account</div>
        <SocialLogin></SocialLogin>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
          </div>
        </div>
        <div className="mt-10">

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Enter Your Name:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input type="text"  {...register("name", { required: true })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Name" />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
            </div>

            {/* TODO: import image */}
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Your Image:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input type="text"  {...register("photoURL", { required: true })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Image URL" />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>
             
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Your Bank:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input type="text"  {...register("bank", { required: true })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Your Bank Account No" />
                {errors.bank && <span className="text-red-600">Bank Account number required</span>}
              </div>
             
            </div>
            <div className="flex flex-col mb-6">
              <label>Role Selection</label>
              <select className="border p-2" {...register("role")}>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>
              {errors.role && <span className="text-red-600">What salary you want to work with us</span>}
            </div>
            <div className="flex flex-col mb-6">
              <label>Designation</label>
              <select className="border p-2" {...register("designation")}>
                <option value="Sales Assistant">Sales Assistant</option>
                <option value="Social Media executive">Social Media executive</option>
                <option value="Digital Marketer">Digital Marketer</option>
                <option value="Web Devoloper">Web Devoloper</option>
              </select>
              {errors.designation && <span className="text-red-600">What salary you want to work with us</span>}
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Salary:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input type="text" {...register("salary", { required: true })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Asking Salary" />
                {errors.salary && <span className="text-red-600">What salary you want to work with us</span>}
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input type="email" {...register("email", { required: true })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <input type="password" {...register("password",
                  {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                  })} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
                {errors.password?.type === "maxLength" && <span className="text-red-600">Password must be Maximum 20 Carecter</span>}
                {
                  errors.password?.type === 'minLength' && <span className="text-red-600">Password must be Minimum 6 Carecters</span>
                }
                {
                  errors.password?.type === "pattern" && <span className="text-red-600">Password must be One uppercase and one special carecter</span>
                }
              </div>
            </div>



            <div className="flex w-full">

              <input type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" value="Login" />
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link to='/login' href="#" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span className="ml-2">Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;