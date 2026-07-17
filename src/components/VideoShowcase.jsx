import React, { useEffect, useRef, useState } from 'react';

const CIRCULAR_TEXT = 'WATCH THE STORY • WATCH THE STORY • ';
const r = 52, cx = 64, cy = 64;

export default function VideoShowcase() {
  const sectionRef  = useRef(null);
  const wrapperRef  = useRef(null);
  const svgRingRef  = useRef(null);
  const videoRef    = useRef(null);
  const captionRef  = useRef(null);
  const rafRef      = useRef(null);
  const lastTimeRef = useRef(null);
  const rotationRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const tick = (time) => {
      // Ring rotation
      const delta = lastTimeRef.current ? time - lastTimeRef.current : 0;
      lastTimeRef.current = time;
      rotationRef.current = (rotationRef.current + delta * 0.045) % 360;
      if (svgRingRef.current) {
        svgRingRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }

      // Scroll-driven width: 80% → 100%
      const section = sectionRef.current;
      if (section && wrapperRef.current) {
        const rect     = section.getBoundingClientRect();
        const windowH  = window.innerHeight;
        const start    = windowH * 0.95;
        const end      = windowH * 0.05;
        const raw      = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const eased    = 1 - Math.pow(1 - raw, 2.5);

        // 80% → 100%
        const widthPct = 80 + eased * 20;
        wrapperRef.current.style.width = `${widthPct}%`;

        if (captionRef.current) {
          captionRef.current.style.opacity = (0.25 + eased * 0.75).toFixed(3);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    isPlaying ? video.pause() : video.play();
  };

  return (
    <section
      ref={sectionRef}
      id="video-showcase"
      className="bg-[#F7FAFD] py-6 sm:py-10 lg:py-12 flex flex-col items-center overflow-hidden"
    >

      {/* Header */}
      <div className="text-center w-full max-w-4xl mx-auto mb-10 md:mb-14 px-5">
        <span className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#0066FF] uppercase mb-3">
          Showcase
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
          Crafting industry-defining products.
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          Take a look at how we build and launch engineering solutions for our global clients.
        </p>
      </div>

      {/* Video wrapper — no x-padding, grows 80→100% of viewport width */}
      <div
        ref={wrapperRef}
        style={{ width: '80%', willChange: 'width' }}
        className="relative"
      >
        {/* Video — sharp corners, no rounding */}
        <div className="relative overflow-hidden bg-[#0a0a0f] h-105 md:h-160">
          <video
            ref={videoRef}
            src="/saas.mp4"
            className="w-full h-full object-cover"
            loop
            playsInline
            controls={isPlaying}
            poster="https://i.pinimg.com/1200x/92/21/6d/92216d078016acd8fc45ea51da435f6f.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Subtle dark overlay only — no gradient */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none"
            style={{ opacity: isPlaying ? 0.0 : 0.35 }}
          />

          {/* Play / pause */}
          <button
            onClick={handlePlayToggle}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className={`absolute inset-0 flex items-center justify-center z-20 group/btn transition-all duration-500 ${
              isPlaying ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
            }`}
          >
            <div className="relative flex items-center justify-center">

              {/* Revolving text ring */}
              <svg
                ref={svgRingRef}
                width="132"
                height="132"
                viewBox="0 0 128 128"
                className="absolute"
                style={{ willChange: 'transform' }}
              >
                <defs>
                  <path
                    id="circleTextPath"
                    d={`M ${cx},${cy - r} a ${r},${r} 0 1,1 -0.001,0`}
                  />
                </defs>
                <text
                  fill="rgba(255,255,255,0.8)"
                  fontSize="9.5"
                  fontFamily="'Geist', sans-serif"
                  fontWeight="600"
                  letterSpacing="2.2"
                >
                  <textPath href="#circleTextPath">{CIRCULAR_TEXT}</textPath>
                </text>
              </svg>

              {/* Icon pill */}
              <div
                className="relative z-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover/btn:bg-white/20 group-hover/btn:scale-110"
                style={{ width: 58, height: 58 }}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <rect x="4" y="3" width="4" height="14" rx="1.5" />
                    <rect x="12" y="3" width="4" height="14" rx="1.5" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path d="M6 4.5l11 5.5-11 5.5V4.5z" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
