import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-3">
        <Link to="/">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            MotorHub
          </h1>
        </Link>
        <div className="flex justify-center space-x-8">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 