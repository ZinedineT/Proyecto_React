import { Link } from 'react-router-dom';
import { FaBookOpen, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaBookOpen className="text-xl" />
          <span className="font-bold text-xl">AprendeDigital</span>
        </Link>

        <div className="flex space-x-4">
          <Link to="/courses" className="hover:underline">Cursos</Link>
          <Link to="/login" className="flex items-center space-x-1 hover:underline">
            <FaUser />
            <span>Ingresar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
