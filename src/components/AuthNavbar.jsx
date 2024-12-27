import { Link } from 'react-router-dom';

const AuthNavbar = () => {
  return (
    <nav className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center">
          <Link to="/dashboard">
            <h1 className="text-3xl font-bold text-white mb-4">MotorHub</h1>
          </Link>
          <div className="flex space-x-6">
            <Link to="/add-car" className="text-gray-300 hover:text-white transition-colors">
              Añadir
            </Link>
            <Link to="/delete" className="text-gray-300 hover:text-white transition-colors">
              Eliminar
            </Link>
            <Link to="/" className="text-gray-300 hover:text-red-600 transition-colors">
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar; 