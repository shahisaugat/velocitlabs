import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandMarquee from './components/BrandMarquee';
import Showcase from './components/Showcase';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  const [brief, setBrief] = useState(null);

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
    <div className="min-h-screen bg-[#FBFAF7] text-[#101314] overflow-x-hidden">
      <Navbar onOpenEstimator={handleOpenEstimator} />
      <Hero onOpenEstimator={handleOpenEstimator} />
      <BrandMarquee />
      <Showcase />
      <Services />
      <CaseStudies />
      <Pricing />
      <About />
      <Footer />
    </div>
  );
};

export default App;
