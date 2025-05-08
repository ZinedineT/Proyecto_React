import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import CourseCard from './CourseCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturedCourses = ({ title = "Cursos Destacados", subtitle = "", filter = "featured" }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Intenta cargar desde el backend
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al cargar cursos');

        let filteredCourses = [];
        switch (filter) {
          case 'featured':
            filteredCourses = data.filter(course => course.isFeatured);
            break;
          case 'new':
            filteredCourses = data.filter(course => course.isNew);
            break;
          default:
            filteredCourses = data.slice(0, 6); // Mostrar más cursos para el carrusel
        }

        setCourses(filteredCourses);
      } catch (err) {
        // Si falla, usa courses.json como fallback
        console.warn('Fallo al conectar con el backend, usando datos locales:', err.message);
        import('../data/courses.json').then(data => {
          let filteredCourses = [];
          switch (filter) {
            case 'featured':
              filteredCourses = data.default.filter(course => course.isFeatured);
              break;
            case 'new':
              filteredCourses = data.default.filter(course => course.isNew);
              break;
            default:
              filteredCourses = data.default.slice(0, 6);
          }
          setCourses(filteredCourses);
        }).catch(fallbackErr => {
          setError('No se pudieron cargar los cursos ni desde el backend ni localmente');
          console.error(fallbackErr);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filter]);

  if (loading) return <p className="text-center text-gray-400">Cargando cursos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
      </div>

      <div className="relative">
        {/* Botones de navegación */}
        <button className="carousel-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-dark-700 hover:bg-dark-600 text-white p-3 rounded-full transition transform hover:scale-110">
          <FaChevronLeft className="text-xl" />
        </button>

        <button className="carousel-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-dark-700 hover:bg-dark-600 text-white p-3 rounded-full transition transform hover:scale-110">
          <FaChevronRight className="text-xl" />
        </button>

        {/* Carrusel Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          navigation={{
            prevEl: '.carousel-prev',
            nextEl: '.carousel-next',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          loop={true}
          className="h-full"
        >
          {courses.map(course => (
            <SwiperSlide key={course.id}>
              <div className="h-full"> {/* Padding para separación */}
                <CourseCard course={course} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedCourses;
