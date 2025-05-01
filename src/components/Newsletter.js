const Newsletter = () => {
    return (
      <div className="bg-blue-700 text-white py-16 mb-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">No te pierdas nuestras novedades</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Suscríbete para recibir los nuevos cursos y ofertas especiales
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-xl">
            <input
              type="email"
              placeholder="Tu email"
              className="px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg text-gray-900 flex-grow"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg font-bold transition mt-2 sm:mt-0">
              Suscribirme
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Newsletter;
