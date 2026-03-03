import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourCategories from './components/TourCategories';
import AboutSection from './components/AboutSection';
import PopularTours from './components/PopularTours';
import Footer from './components/Footer';
import { WordsPreloader } from './components/WordsPreloader';

function App() {
  const [showPreloader, setShowPreloader] = useState(
    () => !sessionStorage.getItem('preloader_shown')
  );

  const handlePreloaderDone = () => {
    sessionStorage.setItem('preloader_shown', 'true');
    setShowPreloader(false);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      touchMultiplier: 1.2
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <WordsPreloader show={showPreloader} onDone={handlePreloaderDone} />
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
    </>
  );
}

export default App;
