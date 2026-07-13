import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaGithub, FaDribbble } from 'react-icons/fa6';

const footerNav = [
  {
    heading: 'Services',
    links: ['Product Engineering', 'Mobile Development', 'API & Backend', 'UI/UX Design Systems', 'DevOps & Infrastructure', 'AI & Data Integration'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Case Studies', 'Pricing', 'Philosophy', 'Careers'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Open Source', 'Engineering Handbook', 'Design Tokens', 'Contact'],
  },
];

const socials = [
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { Icon: FaXTwitter, href: '#', label: 'X / Twitter' },
  { Icon: FaGithub, href: '#', label: 'GitHub' },
  { Icon: FaDribbble, href: '#', label: 'Dribbble' },
];

export default function Footer() {
  return (
    <footer className="bg-[#101314] pt-20 pb-10">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Top: logo + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <img
              src="/brand-light.png"
              alt="Velocit Labs"
              className="h-7 w-auto object-contain object-left"
            />
            <p className="text-[#FBFAF7]/45 text-sm leading-relaxed max-w-xs">
              The engineering partner for ambitious teams with aggressive timelines.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-auto">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/30 mb-5">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#FBFAF7]/60 text-sm hover:text-[#FBFAF7] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="border-t border-white/6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#FBFAF7] font-semibold mb-1">
              Ready to build something exceptional?
            </h3>
            <p className="text-white/40 text-sm">Ship in weeks, not months.</p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-[#0066FF] hover:bg-[#045ce0] text-white font-semibold text-[15px] rounded-full transition-all duration-300 shrink-0"
          >
            <span>Schedule a call</span>
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowUpRight size={18} />
            </div>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Velocit Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <a key={t} href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors duration-200">
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
