const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-dark-800 to-dark-900 text-white p-6">
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-400">AprendeDigital</h3>
          <p className="text-gray-400">Transformando la educación en línea</p>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p>© {new Date().getFullYear()} AprendeDigital - Plataforma de enseñanza en línea</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
