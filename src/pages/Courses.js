import CourseCard from '../components/CourseCard';

const Courses = () => {
  const courses = [
    { id: 1, title: 'React Básico', description: 'Aprende los fundamentos de React', duration: '10 horas' },
    { id: 2, title: 'JavaScript Moderno', description: 'ES6+ y características avanzadas', duration: '15 horas' },
    { id: 3, title: 'Node.js', description: 'Backend con JavaScript', duration: '20 horas' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Todos los Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
