import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUserTie, FaMoneyBillWave, FaLayerGroup } from 'react-icons/fa';
import coursesData from '../data/courses.json';

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Curso no encontrado</h2>
        <p className="text-gray-500 mt-2">El curso que buscas no existe o ha sido removido</p>
      </div>
    );
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información principal */}
        <div className="lg:col-span-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
            {course.category}
          </span>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center">
              {renderStars()}
              <span className="ml-2 text-gray-700">{course.rating} ({Math.floor(course.rating * 20)} reseñas)</span>
            </div>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-500">{course.duration} de contenido</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Descripción del curso</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <FaUserTie className="text-blue-500 mr-2" />
                <span>Instructor: <strong>{course.instructor}</strong></span>
              </div>
              <div className="flex items-center">
                <FaLayerGroup className="text-blue-500 mr-2" />
                <span>Nivel: <strong>{course.level}</strong></span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <span>Duración: <strong>{course.duration}</strong></span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="text-blue-500 mr-2" />
                <span>Precio: <strong>${course.price}</strong></span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Lo que aprenderás</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Fundamentos avanzados de {course.category}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Proyectos prácticos para tu portafolio</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Acceso a comunidad de estudiantes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Certificado de finalización</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar - Compra */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg shadow-md sticky top-4 p-6">
            <div className="mb-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-full rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">${course.price}</span>
                <button className="btn-primary px-6 py-3">
                  Inscribirse ahora
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Este curso incluye:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>Acceso de por vida</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>{course.duration} de video bajo demanda</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>Ejercicios prácticos</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>Certificado de finalización</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
