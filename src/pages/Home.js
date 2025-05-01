import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturedCourses from '../components/FeaturedCourses';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />

      <StatsSection />

      <FeaturedCourses
        title="Cursos Populares"
        subtitle="Los más elegidos por nuestra comunidad"
      />

      <div className="bg-gray-50 py-16">
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
