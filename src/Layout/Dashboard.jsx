
import { Outlet } from 'react-router-dom';
import DashboardMenu from '../Components/Dashboard/DashboardMenu';

const Dashboard = () => {
  return (
    <div className='lg:flex mx-20 lg:mx-0'>
      <div >
        <DashboardMenu></DashboardMenu>
      </div>

      
      <div className='flex-1 lg:ml-72'>
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default Dashboard;