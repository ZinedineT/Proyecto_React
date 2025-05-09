import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUser, FaHome, FaSignOutAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Avatar from '../components/Avatar';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-500 border-b-2 border-primary-500' : 'hover:text-primary-300';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <nav className="bg-gradient-to-r from-dark-800 to-dark-900 text-gray-200 p-5 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/images/icon.png" alt="icon" className="h-10 w-10" />
          <span className="font-semibold text-2xl text-primary-500">Aprende<span className="text-white">Digital</span></span>
        </Link>

        <div className="flex items-center space-x-8">
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

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 transition duration-300 hover:text-primary-300"
              >
                <div className="flex items-center space-x-2">
                  <Avatar size="sm" />
                  <span>{user?.name || 'Usuario'}</span>
                  <FaChevronDown className={`text-xs transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-900 rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 hover:text-white"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile" // Crea esta ruta
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 hover:text-white"
                    onClick={() => setShowDropdown(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 hover:text-white"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center space-x-2 transition duration-300 ${isActive('/login')}`}
            >
              <FaUser className="text-xl" />
              <span>Ingresar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
