import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  useEffect(() => {
    setTimeout(() => {
      setCourses(coursesData);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todos', ...new Set(courses.map(course => course.category))];

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 min-h-screen py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">Cargando cursos...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-dark-800 to-dark-900 min-h-screen text-white">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Explora Nuestros Cursos</h1>

        {/* Filtros */}
        <div className="bg-gradient-to-b from-dark-800 to-dark-900 p-6 rounded-xl shadow-lg mb-12 border border-dark-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
              <input
                type="text"
                color='black'
                placeholder="Buscar por título o descripción..."
                className="w-full p-3 bg-dark-600 border border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
              <select
                className="w-full p-3 bg-dark-600 border border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black placeholder-gray-400"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-dark-800 text-white">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Mostrando <span className="font-medium text-primary-500">{filteredCourses.length}</span> de {courses.length} cursos disponibles
          </p>
        </div>

        {/* Lista de cursos */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-dark-700 rounded-xl border border-dark-600">
            <h3 className="text-2xl font-medium text-gray-300 mb-3">No se encontraron cursos</h3>
            <p className="text-gray-400 mb-6">Prueba ajustando tus criterios de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('Todos');
              }}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition"
            >
              Mostrar todos los cursos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
