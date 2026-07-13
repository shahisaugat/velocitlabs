import React, { useState, useRef } from 'react';
import { ArrowDownRight, ShieldCheck, Zap, MapPin, ArrowRight, Star } from 'lucide-react';
import {
  FaWhatsapp,
} from "react-icons/fa";

const Hero = ({ onOpenEstimator }) => {
  const [ripples, setRipples] = useState([]);
  const lastRippleTime = useRef(0);

  const handleMouseMove = (e) => {
    const now = Date.now();
    // Throttle ripple creation so it looks like individual stone drops
    if (now - lastRippleTime.current < 250) return;
    lastRippleTime.current = now;

    const { left, top } = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: now,
      x: e.clientX - left,
      y: e.clientY - top,
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    // Remove the ripple after the animation completes (1.5s match from css)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[75vh] pt-48 pb-28 flex flex-col justify-center bg-[#0066FF] bg-blueprint overflow-hidden"
    >
      
      {/* Premium Architectural Background Image with higher opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] mix-blend-luminosity pointer-events-none" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')" }}
      />
      
      {/* Dark overlay to ensure contrast and premium feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00464B]/40 via-[#00464B]/10 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00464B]/15 pointer-events-none z-0" />

      {/* Interactive Lens Refraction Ripples */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border border-white/20 animate-water-ripple"
            style={{
              left: ripple.x - 40, // Center the 80px circle
              top: ripple.y - 40,
              width: '80px',
              height: '80px',
            }}
          />
        ))}
      </div>
      {/* Subtle absolute glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent-light/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center z-10">
        
        {/* Main Content */}
        <div className="flex flex-col items-center space-y-10">

          {/* Trust and Rating Indicator */}
          <div className="flex items-center space-x-2 font-sans text-md md:text-md text-white">
            <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
            <span className="text-white font-bold">5.0</span>
            <span className="text-white/30">•</span>
            <span>Trusted By Global Engineering Teams</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            <span className="block md:inline-block md:whitespace-nowrap">Building Elite Software Systems.</span> <br />
            <span>Delivered At Pace.</span>
          </h1>

          {/* Description & Trust Stack */}
          <div className="flex flex-col items-center space-y-6 max-w-2xl">
            <p className="font-sans text-base md:text-[16px] text-[#FBFAF7] leading-relaxed">
              The engineering partner for ambitious teams with aggressive timelines. We deliver reliable, scale-ready software without the bloat.
            </p>
          </div>

          {/* Action Buttons */}
<div className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full max-w-sm md:max-w-none mx-auto">

  {/* Book a Call */}
  <button
    onClick={onOpenEstimator}
    className="group inline-flex items-center justify-between gap-2 md:gap-4 pl-4 md:pl-7 pr-1 md:pr-2 py-1 md:py-2 bg-[#FBFAF7] hover:bg-white text-[#00464B] font-sans text-[13px] md:text-[15px] font-semibold rounded-full transition-all duration-300 cursor-pointer flex-1 md:flex-none md:w-fit"
  >
    <span className="whitespace-nowrap">Schedule Call</span>

    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0066FF] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0">
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
    </div>
  </button>

  {/* WhatsApp Glass Button */}
  <a
    href="https://wa.me/#"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group
      inline-flex
      items-center
      justify-center
      gap-2
      md:gap-3
      px-4
      md:px-7
      py-2.5
      md:py-4
      rounded-full
      flex-1
      md:flex-none
      md:w-fit

      bg-white/8
      backdrop-blur-xl
      border border-white/20

      hover:bg-white/12
      hover:border-white/30

      transition-all
      duration-300
    "
  >
   <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5 text-[#8EF4E5] transition-colors duration-300 group-hover:text-white shrink-0" />

    <span className="font-sans text-[13px] md:text-[15px] font-semibold text-white whitespace-nowrap">
      <span className="md:hidden">Chat Now</span>
      <span className="hidden md:inline">Chat on WhatsApp</span>
    </span>
  </a>

</div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
