import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ContactUsCard from "../../Components/ContactUs/ContactUsCard";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: comments = [], refetch, isLoading } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const res = await axiosPublic.get('/contactUs');
      return res.data;
    }
  });

  const onSubmit = async (data) => {
    const contactUs = {
      email: user?.email,
      name: user?.displayName,
      comment: data.comment,
      image: user?.photoURL
    };

    try {
      const res = await axiosPublic.post('/contactUs', contactUs);
      console.log(res);
      reset();
      refetch(); // Refetch comments after successful submission
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-svh flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1">
       <section className="bg-gray-100 my-8 rounded-lg text-gray-800">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-4xl font-bold leading-none sm:text-5xl">Met  
				<span className="text-green-600"> Office</span> 
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">The Best office work website.
				<br  className="hidden md:inline lg:hidden" />It's make for easy for your job.You can apply our office.
			</p>
			<div className="">
				<h1 className="text-3xl font-serif ">Our Adress is:-</h1>
        <h1>32, Justice SM Morshed Sharany <br /> Agargoan Sher-e-Bangla <br /> Nagar Dhaka-1207, Bangladesh</h1>
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://static.vecteezy.com/system/resources/thumbnails/000/217/371/small_2x/vector-office-character-illustration.jpg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
      <div className="w-full flex justify-center p-16">
        <div>

       

          <h2 className="text-4xl font-semibold text-center">Enter Your Opinion</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card bg-base-100 w-full max-w-sm shrink-0">
              <div className="card-body">
                <input
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-96 h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  placeholder='Type Your Comment'
                  {...register("comment", { required: true })}
                />
                {errors.comment && <span>This field is required</span>}

                <div className="form-control mt-6">
                  <input className="btn px-48" type="submit" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <hr />
      </div>
      {/* Display comments */}
      <div className="grid grid-cols-1">
        {
          comments.length > 0 ? 
            comments.map(item => <ContactUsCard key={item._id} item={item} />) : 
            <div><h1 className="text-2xl font-semibold">No Comment Available</h1></div>
        }
      </div>
    </div>
  );
};

export default ContactUs;
