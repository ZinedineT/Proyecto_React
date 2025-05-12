import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUserTie, FaMoneyBillWave, FaLayerGroup } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [purchaseError, setPurchaseError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar el curso');
        setCourse(data);
      } catch (err) {
        setPurchaseError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (authLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-300">Autenticación...</h2>
      </div>
    );
  }
  if (loading) {
  return (
    <div className="container mx-auto py-12 text-center">
      <h2 className="text-2xl font-bold text-gray-300">Cargando curso...</h2>
    </div>
    );
  }
  if (!course) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Curso no encontrado</h2>
        <p className="text-gray-500 mt-2">El curso que buscas no existe o ha sido removido</p>
      </div>
    );
  }

const handlePurchase = async () => {
    if (!isAuthenticated) {
      setPurchaseError('Debes iniciar sesión para comprar un curso');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course.id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al comprar el curso');

      setPurchaseMessage('¡Curso comprado exitosamente! Revisa tu dashboard.');
      setPurchaseError('');
    } catch (err) {
      setPurchaseError(err.message || 'Error al procesar la compra');
      setPurchaseMessage('');
    }
  };
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
  <div className='relative bg-gradient-to-r from-dark-800 to-dark-900 text-white'>
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

          <div className="bg-gradient-to-r from-dark-800 to-dark-900 p-6 rounded-lg mb-8">
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
          <div className="bg-gradient-to-r from-dark-800 to-dark-900 text-white border rounded-lg shadow-md sticky top-4 p-6">
            <div className="mb-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-full rounded-lg mb-4"
              />
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">${course.price}</span>
              <button
                onClick={handlePurchase}
                className="btn-primary px-6 py-3"
                disabled={purchaseMessage.includes('exitosamente')}
              >
                {purchaseMessage.includes('exitosamente') ? 'Comprado' : 'Inscribirse ahora'}
              </button>
            </div>
            {purchaseMessage && (
              <p className="mt-4 text-green-500">{purchaseMessage}</p>
              )}
              {purchaseError && (
                <p className="mt-4 text-red-500">{purchaseError}</p>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Este curso incluye:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Acceso de por vida</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>{course.duration} de video bajo demanda</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Ejercicios prácticos</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Certificado de finalización</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CourseDetail;
