import React, { useRef, useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    tagline: 'For early-stage teams.',
    price: 'From $4,000',
    period: '/ project',
    highlight: false,
    features: [
      'Up to 4-week engagement',
      '1–2 engineers assigned',
      'UI/UX + frontend delivery',
      'Weekly async updates',
      'Source code handoff',
      'Post-launch bug cover (14 days)',
    ],
    cta: 'Get started',
  },
  {
    name: 'Growth',
    tagline: 'For scaling products.',
    price: 'From $12,000',
    period: '/ month',
    highlight: true,
    features: [
      'Ongoing monthly retainer',
      '3–6 engineers assigned',
      'Full-stack delivery',
      'Daily standups & Slack access',
      'Architecture reviews',
      'Priority SLA — 4 hr response',
      'Unlimited revision cycles',
    ],
    cta: 'Start a project',
  },
  {
    name: 'Enterprise',
    tagline: 'For complex organisations.',
    price: 'Custom',
    period: 'pricing',
    highlight: false,
    features: [
      'Dedicated embedded team',
      'On-site availability',
      'Security & compliance support',
      'Custom SLA & NDAs',
      'Quarterly strategy sessions',
      'CTO-level advisory included',
    ],
    cta: 'Talk to us',
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

export default function Pricing() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="pricing" className="bg-white py-24 border-t border-[#101314]/5">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#00464B] mb-3 block">
            Pricing
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#101314] leading-tight mb-4">
            Transparent. Flexible.<br />Built for ambition.
          </h2>
          <p className="text-[#101314]/50 text-base max-w-md mx-auto leading-relaxed">
            No retainers you don't need. No surprise invoices. Just honest engineering, billed fairly.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {tiers.map((tier, i) => {
            const [ref, visible] = useReveal();
            return (
              <div
                key={i}
                ref={ref}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  tier.highlight
                    ? 'bg-[#0066FF] shadow-2xl shadow-[#0066FF]/25'
                    : 'bg-[#FBFAF7] border border-[#101314]/8 hover:shadow-xl'
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms, box-shadow 0.3s ease`,
                }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#101314] text-white text-[10px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-8">
                  <span className={`text-[11px] font-semibold tracking-[0.14em] uppercase mb-1 block ${tier.highlight ? 'text-white/60' : 'text-[#101314]/40'}`}>
                    {tier.tagline}
                  </span>
                  <h3 className={`font-semibold text-2xl mb-5 ${tier.highlight ? 'text-white' : 'text-[#101314]'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-end gap-1.5">
                    <span className={`font-serif text-4xl font-semibold ${tier.highlight ? 'text-white' : 'text-[#101314]'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm mb-1.5 ${tier.highlight ? 'text-white/60' : 'text-[#101314]/40'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${tier.highlight ? 'bg-white/15' : 'bg-[#101314]/8'}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3.5 flex-1 mb-10">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? 'bg-white/20' : 'bg-[#00464B]/10'}`}>
                        <Check size={9} strokeWidth={3} className={tier.highlight ? 'text-white' : 'text-[#00464B]'} />
                      </div>
                      <span className={`text-sm leading-snug ${tier.highlight ? 'text-white/85' : 'text-[#101314]/65'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`group w-full flex items-center justify-between px-6 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-300 cursor-pointer ${
                    tier.highlight
                      ? 'bg-white text-[#0066FF] hover:bg-[#FBFAF7]'
                      : 'bg-[#101314] text-white hover:bg-[#00464B]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 ${tier.highlight ? 'bg-[#0066FF]/10' : 'bg-white/10'}`}>
                    <ArrowRight size={15} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[#101314]/35 text-sm mt-10">
          All plans include a free 30-minute discovery call. No commitment required.
        </p>

      </div>
    </section>
  );
}
