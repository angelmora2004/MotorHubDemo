import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarsGrid = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCars = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:8080/api/autos/buscar?${params}`);
      if (!response.ok) {
        throw new Error('Error al obtener los autos.');
      }
      const data = await response.json();
      setCars(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(); // Cargar todos los autos inicialmente
  }, []);

  const handleSearch = () => {
    fetchCars({ marca, modelo });
  };

  const handleClear = () => {
    setMarca('');
    setModelo('');
    fetchCars(); // Volver a cargar todos los autos
  };

  return (
    <div className="bg-black py-12">
      {/* Sección de búsqueda */}
      <div className="bg-zinc-900 py-8 mb-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Buscar Autos</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca (ej: Toyota)"
              className="flex-1 bg-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Modelo (ej: Supra)"
              className="flex-1 bg-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buscar
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de tarjetas */}
      <div className="container mx-auto px-4">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <p className="text-white text-center">Cargando autos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
                {/* Imagen del auto */}
                <div className="h-48 bg-zinc-700 flex items-center justify-center">
                  <img
                    src={`data:image/jpeg;base64,${car.foto}`}
                    alt={`${car.marca} ${car.modelo}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Información del auto */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2">{car.marca} {car.modelo}</h3>
                  <div className="text-gray-300 space-y-1">
                    <p>Año: {car.anio}</p>
                    <p>Tipo: {car.tipo}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/details/${car.id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsGrid;
