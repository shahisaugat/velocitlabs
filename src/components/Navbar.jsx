import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ChevronDown, Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import MegaMenu from './MegaMenu';

const navLinks = [
  { name: 'Showcase', href: '#showcase' },
  { name: 'Services', href: '#services', hasDropdown: true },
  { name: 'Case Studies', href: '#cases', badge: '3' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About Us', href: '#about' },
];

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openMega = () => {
    clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      const targetId = href.replace('#', '');
      
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            if (window.lenis) {
              window.lenis.scrollTo(target);
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
      } else {
        const target = document.getElementById(targetId);
        if (target) {
          if (window.lenis) {
            window.lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Navbar background layer */}
      <div className={`absolute inset-x-0 top-0 h-18 sm:h-19 bg-white lg:shadow-sm z-40 border-b transition-colors duration-300 ${
        isOpen ? 'border-primary/10' : 'border-transparent'
      }`} />

      {/* Main Navbar content */}
      <div className="relative max-w-8xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 h-18 sm:h-19 flex items-center justify-between gap-4 z-50">
        {/* Logo — always left */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="shrink-0 flex items-center"
        >
          <img
            src="/brand-light.png"
            alt="Velocit Labs"
            className="h-6 sm:h-7 w-auto object-contain transition-all duration-300"
          />
        </a>

        {/* Desktop nav links — centered, lg+ only */}
        <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
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
                    megaOpen ? 'text-primary' : 'text-brand-text/80 hover:text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      megaOpen ? 'text-primary rotate-180' : 'text-brand-text/40 group-hover:text-primary'
                    }`}
                  />
                </button>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group flex items-center space-x-1 font-sans text-[16px] font-medium text-brand-text/80 hover:text-primary transition-colors duration-200"
              >
                <span className="flex items-start">
                  <span>{link.name}</span>
                  {link.badge && (
                    <sup className="text-[10px] font-bold text-brand-text/40 ml-0.5 relative -top-0.5">
                      ({link.badge})
                    </sup>
                  )}
                </span>
              </a>
            )
          )}
        </div>

        {/* Desktop right controls — lg+ only */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0">
          <button
            aria-label="Language / region"
            className="group flex items-center justify-center w-11 h-11 rounded-full text-brand-text/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
          >
            <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
          </button>
          <button
            onClick={onOpenEstimator}
            className="group flex items-center space-x-2 px-7 py-3 rounded-full bg-primary text-white hover:bg-primary-hover font-sans text-[15px] font-semibold transition-all duration-300 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>Contact Us</span>
            <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
          </button>
        </div>

        {/* Tablet & mobile right controls: Contact Us + Hamburger, < lg */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          {/* Compact "Contact" pill — visible from sm up */}
          <button
            onClick={onOpenEstimator}
            className="hidden sm:flex items-center gap-1.5 pl-4 pr-1.5 py-1.5 rounded-full bg-primary text-white hover:bg-primary-hover font-sans text-[13px] font-semibold transition-colors duration-300 cursor-pointer"
          >
            <span>Contact Us</span>
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <Phone className="w-3 h-3" />
            </div>
          </button>
          {/* Icon-only contact button on very small screens */}
          <button
            onClick={onOpenEstimator}
            aria-label="Contact us"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors duration-300 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-primary/8 transition-colors duration-300 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega Menu — desktop only */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={megaOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      >
        <MegaMenu visible={megaOpen} onClose={() => setMegaOpen(false)} onOpenEstimator={onOpenEstimator} />
      </div>

      {/* ── Backdrop for mobile drawer ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-18 sm:top-19 bg-[#020617]/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Mobile / Tablet Drawer (Slides from under Navbar) ── */}
      <div
        className={`fixed inset-x-0 bottom-0 top-18 sm:top-19 z-35 lg:hidden transform transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="relative h-full flex flex-col bg-white overflow-hidden border-b border-brand-tetext-brand-text/10">
          {/* Brand blueprint grid matching the Hero grid */}
          <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />

          {/* Nav links */}
          <div className="relative px-6 py-6 pb-8">
            <div className="text-[11px] font-bold tracking-[0.15em] text-brand-text/40 uppercase mb-4 px-2">
              Navigation
            </div>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-all duration-300 cursor-pointer"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-primary/50 tracking-wide font-sans">
                      0{i + 1}
                    </span>
                    <span className="font-sans text-base font-semibold text-brand-text group-hover:text-primary transition-colors duration-250 flex items-start">
                      {link.name}
                      {link.badge && (
                        <sup className="text-[10px] font-bold text-brand-text/40 ml-1 relative -top-0.5">
                          ({link.badge})
                        </sup>
                      )}
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-black/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;