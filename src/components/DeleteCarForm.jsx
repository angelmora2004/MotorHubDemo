import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteCarForm = () => {
  const [carId, setCarId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChangeId = (e) => {
    setCarId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/autos/${carId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage(`Auto con ID ${carId} eliminado exitosamente.`);
        setCarId('');
      } else if (response.status === 404) {
        setErrorMessage('No se encontró un auto con ese ID.');
      } else {
        setErrorMessage('Ocurrió un error al eliminar el auto.');
      }
    } catch {
      setErrorMessage('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="container mx-auto px-20 py-5">
      <h2 className="text-2xl font-bold mb-4">Eliminar Auto</h2>
      <form onSubmit={handleSubmit} className="bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="id">
            ID
          </label>
          <input
            type="text"
            name="id"
            value={carId}
            onChange={handleChangeId}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Eliminar Auto
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Salir
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </form>
    </div>
  );
};

export default DeleteCarForm;
