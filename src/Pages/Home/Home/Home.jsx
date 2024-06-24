import Carousel from "../../../Components/Home/Carousel/Banner";
import Services from "../../../Components/Home/Services/Services";
import Stats from "../../../Components/Home/Stats/Stats";
import Testimonial from "../../../Components/Home/Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <h1 className="text-5xl text-center font-bold my-24">Our Services</h1>
      <Services></Services>
      <h1 className="text-5xl text-center font-bold my-24">Stats</h1>
      <Stats></Stats>
      <h1 className="text-5xl text-center font-bold my-24">Testimonial</h1>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;