import CourseCard from './CourseCard';

const FeaturedCourses = () => {
  const courses = [
    { id: 1, title: 'React Básico', description: 'Aprende los fundamentos de React', duration: '10 horas' },
    { id: 2, title: 'JavaScript Moderno', description: 'ES6+ y características avanzadas', duration: '15 horas' },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Cursos Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
