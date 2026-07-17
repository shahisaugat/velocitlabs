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
    if (now - lastRippleTime.current < 250) return;
    lastRippleTime.current = now;

    const { left, top } = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: now,
      x: e.clientX - left,
      y: e.clientY - top,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <section
    onMouseMove={handleMouseMove}
  className="
    relative
    py-16
    md:py-35
    flex flex-col
    justify-start
    md:justify-center
    bg-[#0066FF]
    bg-blueprint
    overflow-hidden
  "
>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')" }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-primary/40 via-primary/10 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/15 pointer-events-none z-0" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border border-white/20 animate-water-ripple"
            style={{
              left: ripple.x - 40,
              top: ripple.y - 40,
              width: '80px',
              height: '80px',
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-1/4 w-62.5 h-62.5 sm:w-75 sm:h-75 md:w-100 md:h-100 bg-brand-accent-light/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full flex flex-col items-center text-center z-10">

        {/* Main Content */}
<div className="flex flex-col items-center w-full">
          {/* Trust & Rating Indicator */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">

            {/* Mobile */}
            <div className="flex md:hidden items-center">

              <div className="flex -space-x-3">
                {[
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/67.jpg",
                  "https://randomuser.me/api/portraits/women/26.jpg",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-[#0066FF] object-cover"
                  />
                ))}
              </div>

              <div className="mx-3 sm:mx-4 h-7 sm:h-8 w-px bg-white/20" />

              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold text-xs sm:text-sm">5.0</span>
              </div>

            </div>

            <div className="hidden md:flex items-center space-x-2 font-sans text-sm lg:text-md text-white">
              <Star className="w-4 h-4 lg:w-4.5 lg:h-4.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">5.0</span>
              <span className="text-white/30">•</span>
              <span>Trusted By Global Engineering Teams</span>
            </div>

          </div>

          <h1 className="font-serif text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4 sm:mb-5 px-2">
            <span className="block lg:inline-block lg:whitespace-nowrap">Building Elite Software Systems.</span>
            <span className="block lg:inline"> Delivered At Pace.</span>
          </h1>

          <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-xs sm:max-w-lg md:max-w-2xl mb-8 sm:mb-10">
            <p className="font-sans text-sm sm:text-base md:text-[16px] text-brand-bg leading-relaxed">
              The engineering partner for ambitious teams with aggressive timelines. We deliver reliable, scale-ready software without the bloat.
            </p>
          </div>


          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-sm sm:max-w-xl md:max-w-none mx-auto px-3">

            <button
              onClick={onOpenEstimator}
              className="group inline-flex items-center justify-between gap-2 md:gap-4 pl-5 sm:pl-4 md:pl-7 pr-1.5 sm:pr-1 md:pr-2 py-1.5 sm:py-1 md:py-2 bg-brand-bg hover:bg-white text-primary font-sans text-sm sm:text-[13px] md:text-[15px] font-semibold rounded-full transition-all duration-300 cursor-pointer w-full sm:flex-1 md:flex-none md:w-fit"
            >
              <span className="whitespace-nowrap">Schedule a Call</span>

              <div className="w-9 h-9 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#0066FF] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0">
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
                px-5
                sm:px-4
                md:px-7
                py-3
                sm:py-2.5
                md:py-4
                rounded-full
                w-full
                sm:flex-1
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

              <span className="font-sans text-sm sm:text-[13px] md:text-[15px] font-semibold text-white whitespace-nowrap">
                <span className="sm:hidden">Chat Now</span>
                <span className="hidden sm:inline">Chat on WhatsApp</span>
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
