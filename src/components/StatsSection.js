import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const TypewriterEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayedText}</span>;
};
const StatsSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white py-10 px-4 overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-gray">
            <FaUserGraduate className="text-4xl text-green-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-gray-600">Estudiantes</p>
          </div>
          <div className="p-6 rounded-lg bg-gray">
            <FaChalkboardTeacher className="text-4xl text-green-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-gray-600">Instructores</p>
          </div>
          <div className="p-6 rounded-lg bg-gray">
            <FaBookOpen className="text-4xl text-green-600 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">100+</h3>
            <p className="text-gray-600">Cursos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
