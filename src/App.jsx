import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpandableServices from './components/ExpandableServices';
import BrandMarquee from './components/BrandMarquee';
import LocalImpact from './components/LocalImpact';
import VideoShowcase from './components/VideoShowcase';
import Pricing from './components/Pricings';
import PricingDetailed from './components/PricingDetailed';
import Footer from './components/Footer';

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

  const handleOpenEstimator = () => {
    const briefSection = document.getElementById('brief');
    if (briefSection) {
      briefSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBriefSubmit = (briefData) => {
    setBrief(briefData);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;