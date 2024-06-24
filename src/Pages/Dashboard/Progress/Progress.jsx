import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const Progress = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { data: workTime = [],refetch } = useQuery({
    queryKey: ['work'],
    queryFn: async () => {
      const res = await axiosSecure.get('/work');
      return res.data;
    }
  });
  refetch()
  const [filteredData, setFilteredData] = useState(workTime);
  const [uniqueNames, setUniqueNames] = useState([]);

  useEffect(() => {
    // Extract unique employee names
    const names = [...new Set(workTime.map(item => item.name))];
    setUniqueNames(names);
  }, [workTime]);

  const onSubmit = (data) => {
    const { employeeName, month } = data;

    const filtered = workTime.filter(item => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.toLocaleString('default', { month: 'long' });

      const nameMatches = employeeName ? item.name === employeeName : true;
      const monthMatches = month ? itemMonth === month : true;
      refetch()
      return nameMatches && monthMatches;
    });
    refetch()
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold text-center my-8">Progress</h1>
      <div className="overflow-x-auto">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} action="https://api.web3forms.com/submit">
            <div className="flex justify-between px-20">
              <div className="flex flex-col mb-6">
                <label className="my-2 font-semibold">Search By Name</label>
                <select className="peer block w-full appearance-none border border-gray-500 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" {...register("employeeName")}>
                  <option value="">Search By Name</option>
                  {uniqueNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-6">
                <label className="my-2 font-semibold">Per Month work</label>
                <select className="peer block w-full appearance-none border border-gray-500 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" {...register("month")}>
                  <option value="">Search By Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mr-20">
              <input value={'Search'} type="submit" className="mt-5 rounded-md bg-black px-6 py-2 text-white" />
            </div>
          </form>
        </div>
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
            {filteredData.map(item => (
              <tr key={item._id}>
                <td>{item.task}</td>
                <td>{item.workTime}</td>
                <td>{item.date.substring(0, 10)}</td>
                <td>{item.title.substring(0, 200)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
