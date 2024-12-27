import { useEffect, useState } from "react";
import axios from "axios";

const CarsHomeSection = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Obtener los autos desde el backend
    axios
      .get("http://localhost:8080/api/autos/allcars") // Cambia el URL según sea necesario
      .then((response) => {
        // Filtrar los primeros 4 autos
        setCars(response.data.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error al obtener los autos:", error);
      });
  }, []);

  return (
    <section className="py-16 px-8 bg-zinc-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Autos Agregados
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4">
        {/* Renderizar los autos */}
        {cars.map((car) => (
          <div
            key={car.id}
            className="max-w-[380px] h-[400px] bg-zinc-700 rounded-lg shadow-lg flex-shrink-0 p-4"
          >
            <img
              src={`data:image/jpeg;base64,${car.foto}`}
              alt={`${car.marca} ${car.modelo}`}
              className="w-full h-2/3 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-white">
              {car.marca} {car.modelo}
            </h3>
            <p className="text-white">Año: {car.anio}</p>
            <p className="text-white">Tipo: {car.tipo}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarsHomeSection;
