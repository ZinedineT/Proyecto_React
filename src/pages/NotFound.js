import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Página no encontrada</p>
      <p className="mb-8 text-gray-400">Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFound;
