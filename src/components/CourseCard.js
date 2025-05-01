import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUserTie, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  // Función para rating con estrellas
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating) ?
        <FaStar key={i} className="text-yellow-400" /> :
        <FaRegStar key={i} className="text-yellow-400" />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:text-red-500 transition">
          <FaHeart className="text-gray-400 hover:text-red-500" />
        </button>
        {course.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <FaClock className="mr-1" /> {course.duration}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>

        <div className="flex items-center mb-3">
          {renderStars(course.rating)}
          <span className="text-gray-600 text-sm ml-2">({course.reviews})</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 line-through mr-2">${course.originalPrice}</span>
            <span className="font-bold text-lg">${course.price}</span>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
