import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  const {
    id = 0,
    title = 'Sin título',
    image = 'https://via.placeholder.com/300x200',
    duration = 'N/A',
    category = 'Sin categoría',
    rating = 0,
    reviews = 0,
    price = 0,
    originalPrice = null,
    isNew = false,
  } = course;

  const getCategoryStyles = () => {
    switch (category) {
      case 'Frontend':
        return {
          gradient: 'bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-blue-600 via-blue-800 to-blue-900',
          textColor: 'text-blue-400',
          buttonHover: 'hover:bg-blue-700',
          overlayColor: 'bg-blue-600/15'
        };
      case 'Backend':
        return {
          gradient: 'bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-purple-600 via-purple-800 to-purple-900',
          textColor: 'text-purple-400',
          buttonHover: 'hover:bg-purple-700',
          overlayColor: 'bg-purple-600/15'
        };
      case 'Diseño':
        return {
          gradient: 'bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-teal-600 via-teal-800 to-teal-900',
          textColor: 'text-teal-400',
          buttonHover: 'hover:bg-teal-700',
          overlayColor: 'bg-teal-600/15'
        };
      case 'UX/UI':
        return {
          gradient: 'bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-fuchsia-600 via-fuchsia-800 to-fuchsia-900',
          textColor: 'text-fuchsia-400',
          buttonHover: 'hover:bg-fuchsia-700',
          overlayColor: 'bg-fuchsia-600/15'
        };
      default:
        return {
          gradient: 'bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-gray-600 via-gray-800 to-gray-900',
          textColor: 'text-gray-400',
          buttonHover: 'hover:bg-dark-700',
          overlayColor: 'bg-gray-600/15'
        };
    }
  };

  const { gradient, textColor, buttonHover, overlayColor } = getCategoryStyles();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:shadow-xl transition-all duration-500 h-full flex flex-col"
    >
      {/* Fondo oscuro por defecto */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-800 to-dark-900 z-0"></div>

      {/* Overlay de color de categoría (sutil) */}
      <div className={`absolute inset-0 ${overlayColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1`}></div>

      {/* Gradiente radial suave al hover (un poco más tenue) */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(0,0,0,0.2))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-2`}></div>

      {/* Barra lateral izquierda (acento de categoría) */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-3`}></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Contenido de la imagen */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200')}
          />
          <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:text-red-500 transition">
            <FaHeart className="text-gray-600 hover:text-red-500" />
          </button>
          {isNew && (
            <span className="absolute top-3 left-3 bg-white text-green-700 text-xs px-2 py-1 rounded-full font-bold">
              NUEVO
            </span>
          )}
        </div>

        {/* Contenido de texto */}
        <div className="p-5 flex-grow flex flex-col min-h-[220px]">
          <div className="flex justify-between items-start mb-2"> {/* Reduje el mb */}
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${textColor} bg-white/10 backdrop-blur-sm`}>
              {category}
            </span>
            <span className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
              <FaClock className="mr-1" /> {duration}
            </span>
          </div>

          <h3 className="font-bold text-xl mb-2 leading-snug text-white group-hover:text-gray-100 transition-colors"> {/* Reduje el mb */}
            {title}
          </h3>

          <div className="flex items-center mb-3"> {/* Reduje el mb */}
            {[...Array(5)].map((_, i) =>
              i < Math.floor(rating) ? (
                <FaStar key={i} className="text-yellow-300" />
              ) : (
                <FaRegStar key={i} className="text-yellow-300/50" />
              )
            )}
            <span className="text-gray-400 group-hover:text-gray-200 text-sm ml-2 transition-colors">
              ({reviews})
            </span>
          </div>

          <div className="flex justify-between items-center mt-auto"> {/* mt-auto para empujar hacia abajo */}
            <div>
              {originalPrice !== null && (
                <span className="text-gray-500 line-through mr-2">${originalPrice}</span>
              )}
              <span className="font-bold text-xl text-white">
                ${price}
              </span>
            </div>
            <Link
              to={`/courses/${id}`}
              className={`min-h-[40px] bg-white text-dark-900 ${buttonHover} px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 hover:text-white`}
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
