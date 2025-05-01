import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Desarrollador Frontend",
    content: "Los cursos me ayudaron a conseguir mi primer trabajo en tech",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  // Agrega más testimonios...
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros estudiantes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
              <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
