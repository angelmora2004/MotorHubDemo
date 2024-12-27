import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-[110vh] bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: "url('https://images.clickdealer.co.uk/blog/3524/featured_images/569c73351dda8fc4e5a990d36820137a.jpg')" }}>
      <div className="p-8 rounded-lg text-center -mt-32">
        <h2 className="text-4xl font-bold text-white mb-8">
          Únete a nuestra comunidad de amantes de los autos
        </h2>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            ¡Únete Ahora!
          </Link>
          <Link 
            to="/login" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
          >
            ¡Inicia Sesión!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;