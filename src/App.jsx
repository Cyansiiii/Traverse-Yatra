import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourCategories from './components/TourCategories';
import AboutSection from './components/AboutSection';
import PopularTours from './components/PopularTours';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="content-wrapper">
        <TourCategories />
        <AboutSection />
        <PopularTours />
      </div>
      <Footer />
    </div>
  );
}

export default App;
