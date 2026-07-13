import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Phone, ChevronDown, Globe, ArrowUpRight,
  Layers, Smartphone, Server, Paintbrush2, Container, BrainCircuit,
  GitMerge, ShieldCheck, BarChart3, Users, Gauge, ArrowRight,
} from 'lucide-react';

/* ─── Two labeled groups instead of an undifferentiated 3x2 grid ──
   The six core services actually split into two real phases of work:
   what you build first, and what you need once it's running. Naming
   that split is structural information, not decoration. ──────────── */
const buildGroup = [
  {
    icon: Layers,
    title: 'Product Engineering',
    body: 'Fast launch for your idea.',
    href: '#services',
    tags: ['Architecture Review', 'System Design', 'API Integration'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    body: 'Perfect apps for any platform.',
    href: '#services',
    tags: ['React Native', 'Flutter', 'App UI/UX'],
  },
  {
    icon: Paintbrush2,
    title: 'UI/UX Design',
    body: 'Design languages that ship.',
    href: '#services',
    tags: ['Design Systems', 'Figma Prototypes', 'Brand Identity'],
  },
];

const scaleGroup = [
  {
    icon: Server,
    title: 'API & Backend',
    body: 'High-throughput systems at scale.',
    href: '#services',
    tags: ['REST & GraphQL', 'Microservices', 'Database Design'],
  },
  {
    icon: Container,
    title: 'DevOps & Infrastructure',
    body: 'Cloud-native delivery, zero downtime.',
    href: '#services',
    tags: ['CI/CD Pipelines', 'AWS / GCP / Azure', 'Docker & K8s'],
  },
  {
    icon: BrainCircuit,
    title: 'AI & Data Integration',
    body: 'Intelligent layers in your product.',
    href: '#services',
    tags: ['LLM Features', 'ML Pipelines', 'RAG Systems'],
  },
];

/* ─── Compact right sidebar list ────────────────────────── */
const sideServices = [
  { icon: GitMerge,    title: 'Code Review',        body: 'Expert eyes on your codebase.' },
  { icon: ShieldCheck, title: 'Security Audits',    body: 'Find and fix vulnerabilities.' },
  { icon: BarChart3,   title: 'Tech Consulting',    body: 'Strategy from senior engineers.' },
  { icon: Gauge,       title: 'Performance Audits', body: 'Speed up what you already have.' },
  { icon: Users,       title: 'Team Augmentation',  body: 'Embed engineers in your team.' },
];

/* ─── One reusable service card ─────────────────────────── */
function ServiceCard({ svc, onClose }) {
  const Icon = svc.icon;
  return (
    <a
      href={svc.href}
      onClick={onClose}
      className="group flex flex-col gap-0 px-6 py-10 bg-[#F7F7F5] transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border border-[#101314]/10 bg-[#F4F4F2] flex items-center justify-center shrink-0 group-hover:border-[#0066FF]/30 group-hover:bg-[#0066FF]/6 transition-colors duration-200">
            <Icon size={18} className="text-[#101314]/50 group-hover:text-[#0066FF] transition-colors duration-200" strokeWidth={1.6} />
          </div>
          <div>
            <p className="font-semibold text-[#101314] text-[16px] leading-tight tracking-[-0.01em]">{svc.title}</p>
            <p className="text-[#101314]/45 text-[13px] mt-0.5 leading-snug">{svc.body}</p>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full border border-[#101314]/12 flex items-center justify-center shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={12} className="text-[#0066FF]" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] font-medium text-[#101314]/55 bg-transparent border border-[#101314]/12 rounded-full px-3 py-1 leading-tight group-hover:border-[#101314]/25 group-hover:text-[#101314]/75 transition-colors duration-150"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

/* ─── Row label — encodes the phase, not just a heading ─── */
function GroupLabel({ index, label }) {
  return (
    <div className="col-span-3 flex items-center gap-3 px-6 pt-5 pb-1">
      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#00464B]/70">
        {label}
      </span>
      <span className="h-px flex-1 bg-[#101314]/8" />
      <span className="text-[11px] font-medium text-[#101314]/30">0{index}</span>
    </div>
  );
}

/* ─── Mega Menu Panel ────────────────────────────────────── */
function MegaMenu({ visible, onClose }) {
  return (
    <div
      className="absolute top-full left-0 right-0 z-40 pointer-events-none"
      style={{ marginTop: '1px' }}
    >
      <div
        className={`bg-white border-b border-[#101314]/8 shadow-2xl px-4 pt-4 transition-all duration-300 ease-out origin-top ${
          visible
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl">
          <div className="flex">

            {/* ── Main column: two labeled phases ── */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-3 space-x-4">
                {buildGroup.map((svc) => (
                  <ServiceCard key={svc.title} svc={svc} onClose={onClose} />
                ))}
              </div>
              <div className="grid grid-cols-3 space-x-4">
                {scaleGroup.map((svc) => (
                  <ServiceCard key={svc.title} svc={svc} onClose={onClose} />
                ))}
              </div>

              {/* ── Signature footer strip: ties back to real case-study content ── */}
              <a
                href="#cases"
                onClick={onClose}
                className="group flex items-center justify-between px-6 py-4 border-t border-[#101314]/8 bg-[#F7F7F5] hover:bg-[#00464B]/5 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold text-[#101314]/80">
                    50+ products shipped
                  </span>
                  <span className="text-[13px] text-[#101314]/40">— see how 3 clients scaled with us</span>
                </div>
                <span className="flex items-center gap-1 text-[13px] font-semibold text-[#00464B] group-hover:gap-1.5 transition-all duration-200">
                  Case studies
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
const Navbar = ({ onOpenEstimator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openMega = () => {
    clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const navLinks = [
    { name: 'Showcase', href: '#showcase' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Case Studies', href: '#cases', badge: '3' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#00464B]/10 py-3.5 shadow-xs">
      <div className="max-w-8xl mx-auto px-8 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img
            src="/brand-light.png"
            alt="Velocit Labs"
            className="h-7 w-auto object-contain transition-all duration-300 group-hover:scale-102"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  className={`group flex items-center space-x-1 font-sans text-[16px] font-medium transition-colors duration-200 cursor-pointer ${
                    megaOpen ? 'text-[#00464B]' : 'text-[#101314]/80 hover:text-[#00464B]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      megaOpen ? 'text-[#00464B] rotate-180' : 'text-[#101314]/40 group-hover:text-[#00464B]'
                    }`}
                  />
                </button>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center space-x-1 font-sans text-[16px] font-medium text-[#101314]/80 hover:text-[#00464B] transition-colors duration-200"
              >
                <span className="flex items-start">
                  <span>{link.name}</span>
                  {link.badge && (
                    <sup className="text-[10px] font-bold text-[#101314]/40 ml-0.5 relative -top-0.5">({link.badge})</sup>
                  )}
                </span>
              </a>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            aria-label="Language / region"
            className="group flex items-center justify-center w-11 h-11 rounded-full text-[#101314]/80 hover:text-[#00464B] hover:bg-[#00464B]/5 transition-all duration-300 cursor-pointer"
          >
            <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
          </button>
          <button
            onClick={onOpenEstimator}
            className="group flex items-center space-x-2 px-7 py-3 rounded-full bg-[#0066FF] text-white hover:bg-[#045ce0] font-sans text-[15px] font-semibold transition-all duration-300 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>Contact Us</span>
            <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-colors cursor-pointer text-[#00464B] hover:bg-[#00464B]/5"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mega Menu — pointer events only when open */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={megaOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      >
        <MegaMenu visible={megaOpen} onClose={() => setMegaOpen(false)} />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-[#FBFAF7] border-l border-[#00464B]/10 p-8 z-40 transform transition-transform duration-300 ease-in-out shadow-2xl md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-serif text-lg font-bold text-[#00464B]">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#00464B] p-1.5 hover:bg-[#00464B]/5 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-lg font-medium text-[#101314]/80 hover:text-[#00464B] transition-colors flex items-start"
            >
              <span>{link.name}</span>
              {link.badge && (
                <sup className="text-[11px] font-bold text-[#101314]/40 ml-0.5 relative -top-0.5">({link.badge})</sup>
              )}
            </a>
          ))}
          <button
            onClick={() => { setIsOpen(false); onOpenEstimator(); }}
            className="flex items-center justify-between w-full mt-4 px-5 py-3.5 bg-[#00464B] text-[#FBFAF7] font-semibold text-sm rounded-xl hover:bg-[#002d30] transition-colors cursor-pointer"
          >
            <span>Contact Us</span>
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;