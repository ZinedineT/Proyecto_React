import { Link } from 'react-router-dom';
import { FaBookOpen, FaUser, FaHome } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-dark-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
          <FaBookOpen className="text-2xl text-green-500" />
          <span className="font-bold text-2xl">AprendeDigital</span>
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-1 hover:text-primary-500 transition">
            <FaHome />
            <span>Inicio</span>
          </Link>
          <Link to="/courses" className="hover:text-primary-500 transition">Cursos</Link>
          <Link to="/login" className="flex items-center space-x-1 hover:text-primary-500 transition">
            <FaUser />
            <span>Ingresar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
