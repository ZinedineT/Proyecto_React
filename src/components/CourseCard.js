import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-3">{course.description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>
        <Link
          to={`/courses/${course.id}`}
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded transition-colors"
        >
          Ver curso
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
