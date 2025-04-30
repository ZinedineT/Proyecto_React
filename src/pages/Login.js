const Login = () => {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Contraseña</label>
            <input type="password" className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Ingresar
          </button>
        </form>
      </div>
    );
  };

  export default Login;
