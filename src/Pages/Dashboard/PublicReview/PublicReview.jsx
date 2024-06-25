import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ContactUsCard from "../../../Components/ContactUs/ContactUsCard";


const PublicReview = () => {
  
  const axiosPublic = useAxiosPublic();
  const { data: comments = [], refetch, isLoading } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      const res = await axiosPublic.get('/contactUs');
      return res.data;
    }
  });
  if (isLoading) {
    return (
      <div className="w-full min-h-svh flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-4xl font-semibold text-center my-4">This public review</h2>
      <div className="grid grid-cols-1 w-3/4 mx-auto">
        <h1 className="text-lg font-semibold">Total Comment: {comments.length}</h1>
        {
          comments.length > 0 ? 
            comments.map(item => <ContactUsCard key={item._id} item={item} />) : 
            <div><h1 className="text-2xl font-semibold">No Comment Available</h1></div>
        }
      </div>
    </div>
  );
};

export default PublicReview;