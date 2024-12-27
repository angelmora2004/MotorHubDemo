import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddCarForm from './components/AddCarForm';
import DeleteCarForm from './components/DeleteCarForm';
import CarDetails from './components/CarDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-car" element={<AddCarForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/delete" element={<DeleteCarForm />} />
          <Route path="/details/:id" element={<CarDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;