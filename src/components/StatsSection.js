import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

const TypewriterEffect = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

const StatsSection = () => {
  const statsData = [
    { value: '10,000+', label: 'Estudiantes' },
    { value: '50+', label: 'Instructores' },
    { value: '100+', label: 'Cursos' },
  ];

  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [animating, setAnimating] = useState(true);
  const animationTimeout = useRef(null);
  const delayBetweenAnimations = 1000;

  useEffect(() => {
    if (!animating) {
      animationTimeout.current = setTimeout(() => {
        setCurrentStatIndex((prevIndex) => (prevIndex + 1) % statsData.length);
        setAnimating(true);
      }, delayBetweenAnimations);
    }

    return () => clearTimeout(animationTimeout.current);
  }, [animating, statsData.length]);

  const handleAnimationComplete = () => {
    setAnimating(false);
  };

  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white py-10 px-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="p-6 rounded-lg bg-gray">
              {index === currentStatIndex && animating ? (
                <>
                  <FaUserGraduate className="text-4xl text-green-600 mx-auto mb-4" /> {/* Puedes usar un icono diferente basado en el índice si lo deseas */}
                  <h3 className="text-2xl font-bold">
                    <TypewriterEffect
                      text={stat.value}
                      speed={150}
                      onComplete={handleAnimationComplete}
                    />
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </>
              ) : (
                <>
                  {index === 0 && <FaUserGraduate className="text-4xl text-green-600 mx-auto mb-4" />}
                  {index === 1 && <FaChalkboardTeacher className="text-4xl text-green-600 mx-auto mb-4" />}
                  {index === 2 && <FaBookOpen className="text-4xl text-green-600 mx-auto mb-4" />}
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
