
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import QuestionsAnswersSection from './components/QuestionsAnswersSection';
import Footer from './components/Footer';
import AboutView from './components/views/AboutView';

type PageType = 'home' | 'about';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (page: PageType) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(page);
      
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 600);
  };

  // Determine if the current page has a dark background to adjust Navbar color
  const isDarkPage = currentPage === 'about';

  return (
    <div className="relative min-h-screen selection:bg-black selection:text-white">
      {/* Page Transition Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-transform duration-700 ease-in-out ${isTransitioning ? 'translate-y-0' : 'translate-y-full'}`}
      />

      {/* Background grain effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#noise)" />
        </svg>
      </div>

      <Navbar onNavigate={navigateTo} isDark={isDarkPage} />
      
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && (
          <main>
            <Hero />
            <IntroSection />
            <QuestionsAnswersSection />
          </main>
        )}

        {currentPage === 'about' && (
          <AboutView />
        )}
      </div>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
