import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpandableServices from './components/ExpandableServices';
import BrandMarquee from './components/BrandMarquee';
import LocalImpact from './components/LocalImpact';
import VideoShowcase from './components/VideoShowcase';
import Lenis from 'lenis';
import Pricing from './components/Pricings';
import PricingDetailed from './components/PricingDetailed';

const App = () => {
  const [brief, setBrief] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scrolling with reduced scroll speed (wheelMultiplier: 0.6)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6, // Lower multiplier = slower, smoother scrolling
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const handleOpenEstimator = () => {
    const briefSection = document.getElementById('brief');
    if (briefSection) {
      if (window.lenis) {
        window.lenis.scrollTo(briefSection);
      } else {
        briefSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBriefSubmit = (briefData) => {
    setBrief(briefData);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      if (window.lenis) {
        window.lenis.scrollTo(contactSection);
      } else {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearBrief = () => {
    setBrief(null);
  };

  return (
    <div className="min-h-screen bg-white text-brand-text overflow-x-hidden pt-18.5">
      <Navbar onOpenEstimator={handleOpenEstimator} />
      {currentPath === '/pricing' ? (
        <PricingDetailed />
      ) : (
        <>
          <Hero onOpenEstimator={handleOpenEstimator} />
          <BrandMarquee />
          <ExpandableServices onOpenEstimator={handleOpenEstimator} />
          <LocalImpact />
          <VideoShowcase />
          <section id="pricing">
            <Pricing onOpenEstimator={handleOpenEstimator} />
          </section>
        </>
      )}
    </div>
  );
};

export default App;
