import React from 'react';
import { Layers, Smartphone, Server, Paintbrush2, Container, BrainCircuit, ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';

const buildGroup = [
  {
    icon: Layers,
    title: 'Website Development',
    body: 'Custom websites built for business growth.',
    href: '#services',
    tags: ['Business Websites', 'Web Applications', 'E-commerce', 'CMS', 'API Integration'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    body: 'Mobile apps for iPhone and Android.',
    href: '#services',
    tags: ['iOS Apps', 'Android Apps', 'Flutter', 'React Native', 'App Launch'],
  },
  {
    icon: Paintbrush2,
    title: 'UI & UX Design',
    body: 'Simple, modern, and user-friendly interfaces.',
    href: '#services',
    tags: ['UI Design', 'UX Research', 'Wireframes', 'Prototypes', 'Design Systems'],
  },
];

const scaleGroup = [
  {
    icon: Server,
    title: 'Backend Development',
    body: 'Secure systems built for speed and scale.',
    href: '#services',
    tags: ['REST APIs', 'Databases', 'Authentication', 'System Integration', 'Business Logic'],
  },
  {
    icon: Container,
    title: 'Cloud & DevOps',
    body: 'Reliable cloud infrastructure and deployment.',
    href: '#services',
    tags: ['Cloud Hosting', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Solutions',
    body: 'Smart AI features for modern businesses.',
    href: '#services',
    tags: ['AI Chatbots', 'Automation', 'Document Search', 'Custom AI', 'AI Integration'],
  },
];

/* ─── Row label — encodes the phase, not just a heading ─── */
function GroupLabel({ index, label }) {
  return (
    <div className="col-span-3 flex items-center gap-3 px-6 pt-5 pb-1">
      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-primary/70">
        {label}
      </span>
      <span className="h-px flex-1 bg-brand-text/8" />
      <span className="text-[11px] font-medium text-brand-text/30">0{index}</span>
    </div>
  );
}

function MegaMenu({ visible, onClose }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-18 sm:top-19 z-40 max-w-6xl w-full pointer-events-none mx-auto"
    >
      <div
        className={`bg-white shadow-xl border-x border-b border-gray-100/80 rounded-b-2xl overflow-hidden ${visible
            ? 'pointer-events-auto'
            : 'hidden'
          }`}
      >

        {/* ── Main column: two labeled phases ── */}
        <div className="flex-1 divide-y divide-gray-100">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {buildGroup.map((svc) => (
              <ServiceCard key={svc.title} svc={svc} onClose={onClose} />
            ))}
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {scaleGroup.map((svc) => (
              <ServiceCard key={svc.title} svc={svc} onClose={onClose} />
            ))}
          </div>

          {/* ── Signature footer strip: ties back to real case-study content ── */}

        </div>

      </div>
    </div>
  );
}

export default MegaMenu;