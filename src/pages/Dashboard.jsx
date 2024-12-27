import AuthNavbar from '../components/AuthNavbar';
//import SearchSection from '../components/SearchSection';
import CarsGrid from '../components/CarsGrid';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <AuthNavbar />
      <CarsGrid />
    </div>
  );
};

export default Dashboard;