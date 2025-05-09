import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Avatar from '../components/Avatar';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserProfile({ ...formData });
      setSuccess('Perfil actualizado correctamente');
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-dark-800 to-dark-900 text-white min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-dark-800 to-dark-900 p-8 rounded-xl shadow-lg border border-dark-600">
          <h1 className="text-3xl font-bold text-primary-500 mb-6">Mi Perfil</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-500 rounded-lg">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-dark-600 p-6 rounded-lg text-center">
                <Avatar size="xl" className="mx-auto mb-4" />
                <h2 className="text-xl font-semibold">{user?.name || 'Usuario'}</h2>
                <p className="text-gray-400">{user?.email || ''}</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-dark-600 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Información Personal</h3>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white"
                    >
                      Editar Perfil
                    </button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-1">Nombre</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-dark-700 p-2 rounded border border-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-dark-700 p-2 rounded border border-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Rol</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full bg-dark-700 p-2 rounded border border-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        >
                          <option value="student">Estudiante</option>
                          <option value="teacher">Profesor</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white disabled:opacity-50 flex items-center"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Guardando...
                          </>
                        ) : (
                          'Guardar Cambios'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            role: user?.role || 'student'
                          });
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Nombre</label>
                      <p className="bg-dark-700 p-2 rounded">{user?.name || 'No especificado'}</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Correo Electrónico</label>
                      <p className="bg-dark-700 p-2 rounded">{user?.email || 'No especificado'}</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Rol</label>
                      <p className="bg-dark-700 p-2 rounded capitalize">
                        {user?.role || 'usuario'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
