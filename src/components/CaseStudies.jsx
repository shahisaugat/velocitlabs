import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    src: '/finmax.jpeg',
    position: 'object-[center_top]',
    client: 'Finmax Technologies',
    tag: 'Fintech · SaaS',
    outcome: '3× faster settlement',
    summary:
      'Redesigned and rebuilt the core trading dashboard — reducing latency by 68% and cutting onboarding time from 14 days to 2.',
  },
  {
    src: '/courtly.jpeg',
    position: 'object-top',
    client: 'Courtly',
    tag: 'LegalTech · Mobile',
    outcome: '40 k users in 60 days',
    summary:
      'Delivered a full-stack legal consultation platform — native iOS & Android apps plus a real-time case management backend.',
  },
  {
    src: '/concept.jpeg',
    position: 'object-top',
    client: 'Concept Studio',
    tag: 'Creative · Web',
    outcome: '2× conversion uplift',
    summary:
      'End-to-end brand identity and marketing site for a boutique creative studio, with a CMS-powered portfolio and scroll animations.',
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function CaseStudies() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="cases" className="bg-[#101314] py-24">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#00737B] mb-3 block">
              Case Studies(3)
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#FBFAF7] leading-tight">
              Work that speaks.
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-[#FBFAF7]/50 hover:text-[#FBFAF7] text-sm font-medium transition-colors duration-200"
          >
            <span>View all work</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => {
            const [ref, visible] = useReveal();
            return (
              <div
                key={i}
                ref={ref}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`,
                  height: '480px',
                }}
              >
                {/* Background image */}
                <img
                  src={c.src}
                  alt={c.client}
                  className={`absolute inset-0 w-full h-full object-cover ${c.position} transition-transform duration-700 ease-out group-hover:scale-105`}
                />

                {/* Permanent dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101314]/90 via-[#101314]/30 to-transparent pointer-events-none" />

                {/* Tag — top left */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/70 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>

                {/* Arrow — top right */}
                <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={16} className="text-white" />
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-0 inset-x-0 p-7 z-10">
                  <p className="text-[#00737B] text-xs font-semibold tracking-[0.1em] uppercase mb-2">
                    {c.outcome}
                  </p>
                  <h3 className="text-white font-semibold text-xl leading-snug mb-2">
                    {c.client}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {c.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
