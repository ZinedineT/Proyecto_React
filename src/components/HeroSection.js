import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-black py-24 px-4 overflow-hidden">
      {/* Efecto de burbujas decorativas */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Domina habilidades <span className="text-secondary-500">digitales</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Cursos prácticos con proyectos reales para impulsar tu carrera tech
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            to="/courses"
            className="flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explorar cursos <FaArrowRight />
          </Link>

          <button className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-700 transition-all duration-300">
            <FaPlayCircle className="text-xl" /> Ver video
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
            <span>Cursos actualizados 2023</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
            <span>Certificados profesionales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
            <span>Acceso de por vida</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
