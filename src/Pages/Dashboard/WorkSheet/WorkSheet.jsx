import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const WorkSheet = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic()
  const {user} = useContext(AuthContext)
  console.log(startDate);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = (data) => {
    const workSheet ={
      task: data.employeeWork,
      workTime: parseInt(data.workHour),
      date: startDate,
      name: user.displayName,
      image: user.photoURL,
      email: user.email,
      title: data.title
    }
    console.log(workSheet);

    axiosPublic.post('/work', workSheet)
    .then(res => {
      if (res.data.insertedId) {
        console.log('user added to the database');
        reset()
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
          title: "Signed in successfully"
        });
      }
    })
    reset()
    refetch()


  }
  const { data: workTime = [], refetch } = useQuery({
    queryKey: ['work'],
    queryFn: async () => {
      const res = await axiosPublic.get('/work');
      return res.data;
    }
  });
console.log(workTime);
  return (
    <div>
      <h2 className="text-center font-bold text-5xl">WorkSheet</h2>
      <div>

       <div className="flex justify-center">
       <form  onSubmit={handleSubmit(onSubmit)} action="https://api.web3forms.com/submit" className="mt-10 w-96 border rounded-lg p-20">

          
<div className="grid gap-6 grid-cols-1  rounded-lg">
  <h2 className="text-center text-3xl font-semibold">Add Work</h2>

  <div className="flex flex-col mb-6">
    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Task</label>
    <select className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" {...register("employeeWork")}>

      <option value="Sales">Sales</option>
      <option value="Support">Support</option>
      <option value="Content">Content</option>
      <option value="Paper-work">Paper-work</option>
    </select>

  </div>
  <div className="relative z-0">
    <input {...register("workHour", { required: true })} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Worked Hour</label>
  </div>
  <div className="relative z-0">
    <input {...register("title", { required: true })} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Worked Title</label>
  </div>
  <div className="relative  z-0 gap-8">
  <label className="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ">Date</label>
  <DatePicker className="border" selected={startDate} onChange={(date) => setStartDate(date)} />
  </div>

</div>
<input type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white" />

</form>
       </div>

    {/* table */}

    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Task</th>
        <th>Work Time</th>
        <th>Date</th>
        <th>Title</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
      workTime.map(item=>(
        <tr key={item._id}>
        <td>
          {item.task}
        </td>
        <td>
          {item.workTime}
        </td>
        <td>
                {item.date.substring(0, 10)}
              </td>
        <td>
                {item.title.substring(0, 52)}
              </td>
        
      </tr>
      ))
    }
    </tbody>
    
  </table>
</div>
      </div>
    </div>
  );
};

export default WorkSheet;