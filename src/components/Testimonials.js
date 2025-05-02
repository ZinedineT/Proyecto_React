import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Desarrollador Frontend",
    content: "Los cursos de AprendeDigital me ayudaron a conseguir mi primer trabajo en tech. Las explicaciones son claras y los proyectos prácticos son exactamente lo que necesitaba.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Ana Torres",
    role: "Diseñadora UX/UI",
    content: "Como diseñadora, necesitaba entender desarrollo frontend para trabajar mejor con desarrolladores. Estos cursos fueron la solución perfecta.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Javier López",
    role: "Ingeniero Backend",
    content: "La calidad de los cursos de backend es excepcional. Aprendí mejores prácticas que implementé inmediatamente en mi trabajo.",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    id: 4,
    name: "María González",
    role: "Estudiante de Programación",
    content: "Nunca pensé que podría aprender a programar, pero la metodología paso a paso me hizo el proceso accesible y divertido.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Lo que dicen nuestros estudiantes</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Experiencias reales de nuestra comunidad</p>

        <div className="relative max-w-2xl mx-auto h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-gray p-8 rounded-xl shadow-md h-full">
                <FaQuoteLeft className="text-primary-500 text-2xl mb-6" />
                <p className="text-white mb-8 text-lg italic">"{testimonials[currentIndex].content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 bg-white p-3 rounded-full shadow-md hover:bg-primary-100 transition"
          >
            <FaChevronLeft className="text-primary-500" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 bg-white p-3 rounded-full shadow-md hover:bg-primary-100 transition"
          >
            <FaChevronRight className="text-primary-500" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-primary-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
