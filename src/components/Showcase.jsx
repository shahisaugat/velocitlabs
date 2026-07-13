import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const cards = [
  {
    src: '/finmax.jpeg',
    alt: 'Finmax Technology SaaS Platform Design',
    span: 'md:col-span-2 md:row-span-2',
    position: 'object-[center_top]',
    label: 'Product Design',
    title: 'Finmax SaaS',
    description: 'End-to-end financial platform with real-time data visualisation and seamless UX.',
  },
  {
    src: '/coffeeshop.jpeg',
    alt: 'Coffeeshop Concept UI Design',
    span: 'col-span-1 md:row-span-1',
    position: 'object-top',
    label: 'Brand & Web',
    title: 'Coffeeshop Concept',
    description: 'Warm, editorial brand identity and digital storefront for a specialty café.',
  },
  {
    src: '/neurotech.jpeg',
    alt: 'Futuristic Neurotech Real-Time Interface Design',
    span: 'col-span-1 md:row-span-1',
    position: 'object-top',
    label: 'Interface Design',
    title: 'Neurotech UI',
    description: 'High-density real-time dashboards for cutting-edge neural data pipelines.',
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="bg-[#FBFAF7] py-8 md:py-12 border-t border-[#101314]/5">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Bento Grid — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden cursor-pointer border border-[#101314]/10 bg-white rounded-3xl transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 ${card.span}`}
            >
              {/* Image — no overlay */}
              <img
                src={card.src}
                alt={card.alt}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${card.position}`}
              />

              {/* Full-card text overlay — slides up from bottom on hover */}
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-3xl overflow-hidden">
                {/* ArrowUpRight button — top right */}
                <div className="absolute top-4 right-4 z-20 bg-white rounded-full p-2.5 shadow-md">
                  <ArrowUpRight size={18} className="text-[#101314]" strokeWidth={2} />
                </div>

              {/* Dark frosted glass background */}
                <div className="absolute inset-0 bg-[#101314]/80 backdrop-blur-md" />

                {/* Centered text content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-8">
                  <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-3">
                    {card.label}
                  </span>
                  <h3 className="text-white font-semibold text-2xl leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed max-w-xs">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
