import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const Main = () => {
  const location = useLocation()
  const noHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('register')
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <div className='min-h-[calc(100vh-145px)] md:mx-20'>
        <Outlet ></Outlet>
      </div>
      
     {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;