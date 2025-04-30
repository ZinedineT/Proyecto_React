import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  // Datos simulados
  const course = {
    id: 1,
    title: 'React Básico',
    description: 'Aprende los fundamentos de React desde cero',
    duration: '10 horas',
    instructor: 'Juan Pérez',
    lessons: ['Introducción a React', 'Componentes', 'Estado y Props']
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p><span className="font-bold">Duración:</span> {course.duration}</p>
        <p><span className="font-bold">Instructor:</span> {course.instructor}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Lecciones</h2>
      <ul className="list-disc pl-6">
        {course.lessons.map((lesson, index) => (
          <li key={index} className="mb-2">{lesson}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
