// Crea un nuevo componente src/components/StatsSection.js
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';

const StatsSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-blue-50">
            <FaUserGraduate className="text-4xl text-blue-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-gray-600">Estudiantes</p>
          </div>
          <div className="p-6 rounded-lg bg-blue-50">
            <FaChalkboardTeacher className="text-4xl text-blue-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-gray-600">Instructores</p>
          </div>
          <div className="p-6 rounded-lg bg-blue-50">
            <FaBookOpen className="text-4xl text-blue-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">100+</h3>
            <p className="text-gray-600">Cursos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
