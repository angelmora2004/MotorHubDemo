import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/autos/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del auto.');
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/autos/${id}/like`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error al dar like.');
      }
      const updatedCar = await response.json();
      setCar(updatedCar); // Actualizamos el estado con el auto actualizado
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!car) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="container mx-auto px-4">
        <button
          className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition mb-6"
          onClick={() => window.history.back()}
        >
          &lt;&lt; Volver
        </button>
        <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Sección de la imagen */}
            <div className="h-full bg-zinc-700 flex items-center justify-center">
              <img
                src={`data:image/jpeg;base64,${car.foto}`}
                alt={`${car.marca} ${car.modelo}`}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Sección de detalles */}
            <div className="p-6 space-y-4">
              <h2 className="text-white font-bold text-3xl">
                {car.marca} {car.modelo} {car.anio}
              </h2>
              <h3 className="text-gray-300 text-xl font-semibold mb-4">
                Usuario: {car.nombreusuario}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <p><span className="font-bold">Tipo:</span> {car.tipo}</p>
                <p><span className="font-bold">Motor:</span> {car.motor}</p>
                <p><span className="font-bold">Transmisión:</span> {car.transmision}</p>
                <p><span className="font-bold">ID:</span> {car.id}</p>
              </div>
              <p className="text-gray-300 mt-4"><span className="font-bold">Descripción:</span> {car.descripcion}</p>
              <div className="flex items-center space-x-4 mt-6">
                <button
                  className="bg-pink-300 text-black px-4 py-2 rounded hover:bg-pink-400 transition"
                  onClick={handleLike}
                >
                  <span className="text-black text-lg">❤️ Like {car.likes || 0}</span>
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
