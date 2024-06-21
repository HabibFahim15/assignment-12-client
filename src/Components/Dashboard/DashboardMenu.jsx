
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const DashboardMenu = () => {const [isOpen, setIsOpen] = useState(false);
  const {user,signout} = useContext(AuthContext)

  const handleLogOut = () => {
    signout()
      .then(() =>{
          
      })
      .catch(error => console.log(error));
  };

  let displayName = "";
  let email = "";
  let photoURL = "";

  if (user) {
    displayName = user.displayName || "";
    email = user.email || "";
    photoURL = user.photoURL || "";
  }
  return (
    <>
      {/* Mobile and MD Devices Dropdown */}
      <div className="lg:hidden">
        <div className="flex justify-between mx-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img
                src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/images/about-us/website/mo_master_black_mono_for_light_backg_rbg.png"
                className="w-32"
                alt="tailus logo"
              />
            </a>
          </div>
        </div>
        

        {isOpen && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <img
                src={photoURL}
                alt=""
                className="w-10 h-10 m-auto rounded-full object-cover"
              />
              <h5 className="mt-4 text-xl font-semibold text-gray-600">
               {displayName}
              </h5>
              <span className="text-gray-400">{email}</span>
            </div>

            <ul className="space-y-2 tracking-wide mt-8">
              <li>
                <a
                  href="#"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                >
                 
                 <Link to={'/dashboard/employee-list'} className="-mr-1 font-medium">All Employee</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                >
                 
                  <Link to={'/work-sheet'} className="group-hover:text-gray-700">Work Sheet</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                >
                  
                  <Link to={'/payment-history'} className="group-hover:text-gray-700">Payment History</Link>
                </a>
              </li>

              {/* Hr */}
              <li>
                <a
                  href="#"
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                >
                 
                  <Link to={'/employee-list'} className="group-hover:text-gray-700">All Employee</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                >
                  
                  <span className="group-hover:text-gray-700">Finance</span>
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-4 flex justify-between items-center border-t">
              <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                
                <span onClick={handleLogOut} className="group-hover:text-gray-700">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex md:ml-[-50%] fixed z-10 top-0 pb-3 px-6 w-4/6 flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img
                src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/images/about-us/website/mo_master_black_mono_for_light_backg_rbg.png"
                className="w-32"
                alt="tailus logo"
              />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img
              src={photoURL}
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {displayName}
            </h5>
            <span className="hidden text-gray-400 lg:block">{email}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <a
                href="#"
                className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              >
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                    className="fill-current text-cyan-400 dark:fill-slate-600"
                  />
                  <path
                    d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                    className="fill-current text-cyan-200 group-hover:text-cyan-300"
                  />
                  <path
                    d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                    className="fill-current group-hover:text-sky-300"
                  />
                </svg>
                <Link to={'/dashboard/employee-list'} className="-mr-1 font-medium">All Employee</Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-300 group-hover:text-cyan-300"
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span className="group-hover:text-gray-700">Categories</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-600 group-hover:text-cyan-600"
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                  />
                </svg>
                <span className="group-hover:text-gray-700">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  />
                  <path
                    className="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                  />
                </svg>
                <span className="group-hover:text-gray-700">Other data</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-300 group-hover:text-cyan-300"
                    d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                  />
                  <path
                    className="fill-current text-gray-600 group-hover:text-cyan-600"
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="group-hover:text-gray-700">Finance</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span onClick={handleLogOut} className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>

    </>
  );
};

export default DashboardMenu;