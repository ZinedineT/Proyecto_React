import { useAuth } from '../context/AuthContext';

const Avatar = ({ size = 'md', className = '' }) => {
  const { user } = useAuth();
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-32 h-32 text-4xl'
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-dark-500 flex items-center justify-center text-primary-500 ${className}`}
    >
      {user?.name?.charAt(0).toUpperCase() || 'U'}
    </div>
  );
};

export default Avatar;
