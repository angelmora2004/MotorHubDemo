import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('¡Usuario registrado exitosamente!');
      } else {
        setMessage('Hubo un error al registrar el usuario.');
      }
    } catch {
      setMessage('Error al conectar con el servidor.');
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Crear Cuenta</h2>
        
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
              placeholder="Elige un usuario"
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
              placeholder="Elige una contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Inicia sesión aquí
          </Link>
        </p>
        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
