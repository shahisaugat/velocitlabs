import React, { useRef, useState, useEffect } from 'react';
import {
  Layers, Smartphone, Server, Paintbrush2,
  Container, BrainCircuit, ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Layers,
    label: '01',
    title: 'Product Engineering',
    body: 'Full-stack systems architected for resilience and velocity — from greenfield builds to complex re-platforms.',
    accent: '#0066FF',
  },
  {
    icon: Smartphone,
    label: '02',
    title: 'Mobile Development',
    body: 'Native-quality iOS and Android apps with seamless cross-platform delivery using React Native and Flutter.',
    accent: '#00464B',
  },
  {
    icon: Server,
    label: '03',
    title: 'API & Backend Systems',
    body: 'High-throughput APIs, microservices, and data pipelines built to handle scale from day one.',
    accent: '#00737B',
  },
  {
    icon: Paintbrush2,
    label: '04',
    title: 'UI/UX Design Systems',
    body: 'Cohesive design languages and component libraries that translate directly into production-ready interfaces.',
    accent: '#0066FF',
  },
  {
    icon: Container,
    label: '05',
    title: 'DevOps & Infrastructure',
    body: 'CI/CD pipelines, cloud-native infra, and zero-downtime deployments on AWS, GCP, or Azure.',
    accent: '#00464B',
  },
  {
    icon: BrainCircuit,
    label: '06',
    title: 'AI & Data Integration',
    body: 'LLM-powered features, ML pipelines, and intelligent data layers integrated directly into your product.',
    accent: '#00737B',
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Services() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="services" className="bg-[#FBFAF7] py-24 border-t border-[#101314]/5">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#00464B] mb-3 block">
              What We Build
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#101314] leading-tight max-w-xl">
              End-to-end engineering, from concept to scale.
            </h2>
          </div>
          <p className="text-[#101314]/55 text-base leading-relaxed max-w-sm md:text-right">
            Six practice areas. One unified team that ships.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const [cardRef, cardVisible] = useReveal();
            return (
              <div
                key={i}
                ref={cardRef}
                className="group relative bg-white border border-[#101314]/8 rounded-3xl p-8 flex flex-col gap-6 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  opacity: cardVisible ? 1 : 0,
                  transform: cardVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: svc.accent }}
                />

                {/* Icon + label row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: svc.accent + '14' }}
                  >
                    <Icon size={22} style={{ color: svc.accent }} strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[#101314]/25 pt-1">
                    {svc.label}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-[#101314] text-lg leading-snug">{svc.title}</h3>
                  <p className="text-[#101314]/55 text-sm leading-relaxed">{svc.body}</p>
                </div>

                {/* Arrow — appears on hover */}
                <div className="flex items-center justify-end">
                  <div className="w-8 h-8 rounded-full border border-[#101314]/12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#101314]/25 translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={14} className="text-[#101314]/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
