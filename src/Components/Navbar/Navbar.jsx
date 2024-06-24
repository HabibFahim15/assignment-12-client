import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { user, signout } = useContext(AuthContext);
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users');
      return res.data;
    }
  });

  const isUserVerified = users.some(item => item.email === user?.email && item.isVerified);
  

  const handleLogOut = () => {
    signout()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const handleDashboardClick = (event) => {
    if (!isUserVerified) {
      event.preventDefault(); 
      setShowWarning(true);
      if(showWarning ){
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Wait until varification Done",
          showConfirmButton: false,
          timer: 2500
        });
      }
      
    } else {
      setShowWarning(false);
      navigate('/dashboard'); 
    }
  };

  let displayName = user?.displayName || "";
  let email = user?.email || "";
  let photoURL = user?.photoURL || "";

  
  return (
    <div>
      <div className="navbar rounded-3xl bg-gray-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/dashboard' onClick={handleDashboardClick}>Dashboard</Link></li>
              <li><Link to='/contactUs'>Contact us</Link></li>
              
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost md:text-5xl text-3xl font-semibold">
            <img className="w-48" src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/images/about-us/website/mo_master_black_mono_for_light_backg_rbg.png" alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-normal md:text-base">
          <li><Link to='/'>Home</Link></li>
            <li><Link to='/dashboard' onClick={handleDashboardClick}>Dashboard</Link></li>
              <li><Link to='/contactUs'>Contact us</Link></li>
          </ul>
        </div>
        <div className="navbar-end flex md:gap-2">
          <div className="avatar flex gap-1 md:gap-3">
            {user && (
              <div className="z-50">
                <div className="md:w-16 w-12 h-12 md:h-16">
                  <img className="rounded-full" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} src={photoURL} alt="User Avatar" />
                </div>
                {open && (
                  <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="absolute top-10 right-1 w-60 h-40 bg-white border border-gray-400 p-4 rounded-2xl">
                    <ul className="gap-1 font-semibold grid grid-cols">
                      <li className="flex justify-between">Name: {displayName}</li>
                      <li className="flex justify-between">Email: {email}</li>
                      <li onClick={handleLogOut} className="btn flex">LogOut</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          {!user && (
            <div>
              <Link to='/login' className="btn bg-[#10B981] text-white hover:text-black">Login</Link>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
