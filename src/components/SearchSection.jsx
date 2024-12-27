const SearchSection = () => {
  return (
    <div className="bg-zinc-900 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Buscar Autos</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Marca (ej: Toyota)"
            className="flex-1 bg-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Modelo (ej: Supra)"
            className="flex-1 bg-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection; 