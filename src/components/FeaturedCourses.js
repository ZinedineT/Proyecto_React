import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const FeaturedCourses = ({ title = "Cursos Destacados", subtitle = "", filter = "featured" }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulamos carga de API
    import('../data/courses.json').then(data => {
      let filteredCourses = [];

      switch(filter) {
        case "featured":
          filteredCourses = data.default.filter(course => course.isFeatured);
          break;
        case "new":
          filteredCourses = data.default.filter(course => course.isNew);
          break;
        default:
          filteredCourses = data.default.slice(0, 3); // Por defecto muestra 3
      }

      setCourses(filteredCourses);
    });
  }, [filter]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedCourses;
