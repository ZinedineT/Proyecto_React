import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white py-6 px-4 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">No te pierdas nuestras novedades</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Suscríbete para recibir nuevos cursos y ofertas especiales directamente en tu email
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-xl">
          <input
            type="email"
            placeholder="Tu email"
            className="px-4 py-3 rounded-l-lg sm:rounded-r-none text-gray-900 flex-grow focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <button className="bg-blue-500 hover:bg-primary-500 px-6 py-3 rounded-r-lg sm:rounded-l-none font-bold transition flex items-center justify-center gap-2">
            <FaPaperPlane />
            Suscribirme
          </button>
        </div>
        <p className="text-sm mt-4 text-primary-100">
          Prometemos no enviar spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
