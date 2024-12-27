import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirige al dashboard
      } else if (response.status === 401) {
        setMessage('Usuario o contraseña incorrectos.');
      } else {
        setMessage('Hubo un error en el servidor.');
      }
    } catch {
      setMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Iniciar Sesión</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Regístrate aquí
          </Link>
        </p>
        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
