import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaUser, FaHome } from 'react-icons/fa';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Componente de barra de navegaci n
 *
 * Este componente renderiza la barra de navegaci n del sitio web. La barra
 * de navegaci n contiene un enlace a la p gina de inicio, un enlace a la
 * p gina de cursos y un enlace a la p gina de login.
 *
 * @returns {React.ReactElement} El elemento JSX que representa la barra de
 * navegaci n
 */
/*******  310e1854-7dcc-48cc-a126-746b04824b9f  *******/
const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-500 border-b-2 border-primary-500' : 'hover:text-primary-300';
  };

  return (
    <nav className="bg-gradient-to-r from-dark-800 to-dark-900 text-gray-200 p-5 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0">
        <img src="/images/icon.png" alt="icon" className="h-10 w-10" />
          <span className="font-semibold text-2xl text-primary-500">Aprende<span className="text-white">Digital</span></span>
        </Link>

        <div className="flex space-x-8 text-lg">
          <Link
            to="/"
            className={`flex items-center space-x-2 transition duration-300 ${isActive('/')}`}
          >
            <FaHome className="text-xl" />
            <span>Inicio</span>
          </Link>
          <Link
            to="/courses"
            className={`flex items-center space-x-2 transition duration-300 ${isActive('/courses')}`}
          >
            <FaBookOpen className="text-xl" />
            <span>Cursos</span>
          </Link>
          <Link
            to="/login"
            className={`flex items-center space-x-2 transition duration-300 ${isActive('/login')}`}
          >
            <FaUser className="text-xl" />
            <span>Ingresar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
