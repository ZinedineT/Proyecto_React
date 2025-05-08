import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FeaturedCourses from '../components/FeaturedCourses';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 min-h-screen py-12 px-2">
        <div className=" text-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-primary-500 mb-6">
            Bienvenido, {user?.name || 'Usuario'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-600 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Tus cursos activos</h3>
              <p className="text-gray-400">Aquí irían tus cursos...</p>
            </div>
            <div className="bg-dark-600 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Progreso general</h3>
              <p className="text-gray-400">Estadísticas de aprendizaje...</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
          >
            Cerrar sesión
          </button>

          {/* Añadir FeaturedCourses */}
          <div className="mt-10">
            <FeaturedCourses
              title="Cursos Destacados"
              subtitle="Explora nuestros cursos más populares"
              filter="featured"
            />
          </div>
        </div>
      </div>

  );
};

export default Dashboard;
