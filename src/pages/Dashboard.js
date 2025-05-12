import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FeaturedCourses from '../components/FeaturedCourses';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/purchases', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar compras');
        setPurchasedCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPurchases(false);
      }
    };

    if (token) fetchPurchasedCourses();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-dark-800 to-dark-900 min-h-screen py-12 px-2">
      <div className="text-white p-8 shadow-lg">

        {/* Encabezado */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">
            Bienvenido, {user?.name || 'Usuario'}
          </h1>
        </header>

        {/* Sección de Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-600 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Tus cursos activos</h3>
            {loadingPurchases ? (
              <p className="text-gray-400">Cargando cursos...</p>
            ) : purchasedCourses.length > 0 ? (
              <ul className="text-gray-300 space-y-2">
                {purchasedCourses.map(course => (
                  <li key={course.id}>
                    <a href={`/courses/${course.id}`} className="hover:underline">
                      {course.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No tienes cursos activos. ¡Explora y compra uno!</p>
            )}
          </div>

          <div className="bg-dark-600 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Progreso general</h3>
            <p className="text-gray-400">
              {purchasedCourses.length > 0
                ? `Has completado ${Math.round((purchasedCourses.length * 10) / 10)}% de tus cursos`
                : 'No hay datos de progreso disponibles'}
            </p>
          </div>
        </section>

        {/* Botón de Cerrar Sesión */}
        <div className="mb-10">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Cursos Destacados */}
        <section className="mt-10">
          <FeaturedCourses
            title="Cursos Destacados"
            subtitle="Explora nuestros cursos más populares"
            filter="featured"
          />
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
