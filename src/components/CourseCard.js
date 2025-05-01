import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUserTie } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  // Función para mostrar estrellas de rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {course.category}
        </span>

        <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderStars()}</div>
          <span className="text-gray-600 text-sm">{course.rating}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <FaUserTie className="mr-1" />
            <span>{course.instructor}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${course.price}</span>
          <Link
            to={`/courses/${course.id}`}
            className="btn-primary py-2 px-4 text-sm"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
