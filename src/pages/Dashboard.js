import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gradient-to-r from-dark-800 to-dark-900 min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-b text-white p-8 rounded-xl shadow-lg border border-dark-600">
          <h1 className="text-3xl font-bold text-primary-500 mb-6">Bienvenido, {user?.name}</h1>

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
            onClick={logout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
