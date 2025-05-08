import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle, FaReact, FaJs, FaPython, FaHtml5, FaCss3Alt, FaGitAlt, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTypescript, SiMongodb } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  // Array de iconos de programación con diferentes animaciones
  const programmingIcons = [
    { Icon: FaReact, size: "text-4xl", animation: "animate-float1", color: "text-blue-400" },
    { Icon: FaJs, size: "text-3xl", animation: "animate-float2", color: "text-yellow-400" },
    { Icon: FaPython, size: "text-5xl", animation: "animate-float3", color: "text-blue-600" },
    { Icon: FaHtml5, size: "text-4xl", animation: "animate-float4", color: "text-orange-500" },
    { Icon: FaCss3Alt, size: "text-3xl", animation: "animate-float5", color: "text-blue-500" },
    { Icon: FaGitAlt, size: "text-4xl", animation: "animate-float6", color: "text-red-500" },
    { Icon: FaNodeJs, size: "text-4xl", animation: "animate-float7", color: "text-green-500" },
    { Icon: FaJava, size: "text-4xl", animation: "animate-float8", color: "text-red-600" },
    { Icon: SiTypescript, size: "text-3xl", animation: "animate-float1", color: "text-blue-500" },
    { Icon: SiMongodb, size: "text-4xl", animation: "animate-float2", color: "text-green-600" },
  ];

  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white py-14 px-10 overflow-hidden">
      {/* Contenedor principal con grid para dividir el espacio */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Columna izquierda - Contenido textual */}
        <div className="text-left relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight min-h-[120px]">
          <TypeAnimation
            sequence={[
              'Domina habilidades digitales',
              1000,
              'Domina habilidades tecnológicas',
              1000,
              'Domina programación web',
              1000,
              'Domina desarrollo de software',
              1000
            ]}
            wrapper="span"
            speed={50}
            cursor={true}
            style={{ fontSize: '1em',display: 'inline-block' }}
            color="green"
            repeat={Infinity}
          />
        </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Cursos prácticos con proyectos reales para impulsar tu carrera tech
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/courses"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explorar cursos <FaArrowRight />
            </Link>

            <button className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-dark-900 transition-all duration-300">
              <FaPlayCircle className="text-xl" /> Ver video
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            {['Cursos actualizados 2023', 'Certificados profesionales', 'Acceso de por vida'].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Efecto visual con iconos flotantes */}
        <div className="relative h-96 hidden lg:block">
        <div className="absolute inset-5 flex items-center justify-center">
            <img
              src="/images/hero-image.png" // Asegúrate de que la ruta es correcta
              alt="Persona aprendiendo programación"
              className="h-full object-contain" // Ajusta según necesites
              style={{
                filter: 'drop-shadow(0 0 50px rgba(0, 180, 216, 0.5))' // Efecto de sombra con tu color primary-500
              }}
            />
          </div>

          {/* Iconos flotantes */}
      {programmingIcons.map(({ Icon, size, animation, color }, index) => {
          const numIcons = programmingIcons.length;
          const angle = (2 * Math.PI * index) / numIcons; // Ángulo para cada icono
          const radius = 50; // Radio del círculo (ajusta según necesites)

          // Coordenadas relativas al centro
          const offsetX = radius * Math.cos(angle);
          const offsetY = radius * Math.sin(angle);

          // Ajusta estos valores para el centro de la persona (aproximado)
          const centerX = 40; // Porcentaje horizontal
          const centerY = 50; // Porcentaje vertical

          const top = `${centerY + offsetY}%`;
          const left = `${centerX + offsetX}%`;

          return (
            <div
              key={index}
              className={`absolute ${size} ${animation} ${color} opacity-90`}
              style={{
                filter: 'drop-shadow(0 0 15px rgba(0, 180, 216, 0.5))',
                top,
                left,
                zIndex: 10,
                transform: 'translate(-50%, -50%)', // Centrar el icono en el punto calculado
              }}
            >
              <Icon />
            </div>
          );
        })}
        </div>
      </div>

      {/* Efecto de burbujas decorativas */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute bottom-10 right-40 w-60 h-60 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default HeroSection;
