import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturedCourses from '../components/FeaturedCourses';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white py-10 px-4 overflow-hidden">
      <HeroSection />

      <StatsSection />

      <FeaturedCourses
        title="Cursos Populares"
        subtitle="Los más elegidos por nuestra comunidad"
      />

      <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 text-white">
        <FeaturedCourses
          title="Nuevos Cursos"
          subtitle="Recién llegados a nuestra plataforma"
          filter="new"
        />
      </div>

      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
