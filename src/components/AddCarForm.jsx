import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCarForm = () => {
  const [carDetails, setCarDetails] = useState({
    photo: null, // Cambiado a null para manejar archivos
    marca: '',
    modelo: '',
    description: '',
    year: '',
    type: '',
    motor: '',
    transmision: '',
    nombreusuario: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      // Manejar archivos
      setCarDetails({ ...carDetails, photo: files[0] });
    } else {
      setCarDetails({ ...carDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('foto', carDetails.photo);
    formData.append('marca', carDetails.marca);
    formData.append('modelo', carDetails.modelo);
    formData.append('descripcion', carDetails.description);
    formData.append('anio', carDetails.year);
    formData.append('tipo', carDetails.type);
    formData.append('motor', carDetails.motor);
    formData.append('transmision', carDetails.transmision);
    formData.append('nombreusuario', carDetails.nombreusuario);

    try {
      const response = await fetch('http://localhost:8080/api/autos/crearauto', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Auto añadido correctamente.');
        navigate('/dashboard');
      } else {
        alert('Ocurrió un error al añadir el auto.');
      }
    } catch (error) {
      console.error('Error al añadir el auto:', error);
      alert('Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="container mx-auto px-20 py-5">
      <h2 className="text-2xl font-bold mb-4">Añadir Auto</h2>
      <form onSubmit={handleSubmit} className="bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="photo">
            Foto
          </label>
          <input type="file" name="photo" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="marca">
            Marca
          </label>
          <input type="text" name="marca" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="modelo">
            Modelo
          </label>
          <input type="text" name="modelo" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <input type="text" name="description" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="year">
            Año
          </label>
          <input type="text" name="year" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="type">
            Tipo
          </label>
          <input type="text" name="type" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="motor">
            Motor
          </label>
          <input type="text" name="motor" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="transmision">
            Transmisión
          </label>
          <input type="text" name="transmision" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="nombreusuario">
            Nombre de Usuario
          </label>
          <input type="text" name="nombreusuario" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Añadir Auto
          </button>
          <button onClick={() => navigate('/dashboard')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Salir
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;