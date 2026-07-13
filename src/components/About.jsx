import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years Delivering' },
  { value: '40+', label: 'Products Shipped' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '3', label: 'Continents Served' },
];

const values = [
  { title: 'Craft Over Speed', body: 'We move fast — but never at the cost of quality. Every line of code is something we stand behind.' },
  { title: 'Radical Transparency', body: 'No hidden markups. No vague timelines. You always know exactly where your project stands.' },
  { title: 'Skin in the Game', body: 'We treat your product like ours. If it fails, we feel it. If it wins, we celebrate together.' },
];

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function About() {
  const [headRef, headVisible] = useReveal();
  const [imgRef, imgVisible] = useReveal();
  const [valRef, valVisible] = useReveal();

  return (
    <section id="about" className="bg-[#FBFAF7] py-24 border-t border-[#101314]/5">
      <div className="max-w-8xl mx-auto px-8 md:px-12">

        {/* Top: text left + image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* Left — story */}
          <div
            ref={headRef}
            className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#00464B] mb-3 block">
              About Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#101314] leading-tight mb-6">
              Built by engineers.<br />Trusted by founders.
            </h2>
            <p className="text-[#101314]/60 text-base leading-relaxed mb-4">
              Velocit Labs was founded on a simple frustration: too many software agencies overpromise and underdeliver. We set out to build a different kind of engineering partner — one that operates with the urgency of a startup and the rigour of an enterprise team.
            </p>
            <p className="text-[#101314]/60 text-base leading-relaxed mb-8">
              Our team of 12 engineers, designers, and strategists has shipped products across fintech, legaltech, healthcare, and creative industries — always on time, always to spec.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-3xl font-semibold text-[#101314] mb-0.5">{s.value}</p>
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#101314]/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div
            ref={imgRef}
            className={`relative transition-all duration-800 delay-150 ${imgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/mobile-mockup.png"
                alt="Velocit Labs mobile product design"
                className="w-full h-full object-cover object-top max-h-[520px]"
              />
              {/* Subtle cream fade bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FBFAF7]/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating tag */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#101314]/8 rounded-2xl px-5 py-4 shadow-lg">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#101314]/40 mb-0.5">Avg. delivery</p>
              <p className="font-serif text-2xl font-semibold text-[#101314]">3.2 weeks</p>
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div
          ref={valRef}
          className={`border-t border-[#101314]/8 pt-14 transition-all duration-700 ${valVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00464B]" />
                  <h3 className="font-semibold text-[#101314] text-base">{v.title}</h3>
                </div>
                <p className="text-[#101314]/55 text-sm leading-relaxed pl-4">{v.body}</p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-serif text-xl text-[#101314]/70 italic flex-1">
              "We don't just build software. We build reputations."
            </p>
            <button className="group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-[#101314] hover:bg-[#00464B] text-white font-semibold text-[15px] rounded-full transition-all duration-300 cursor-pointer shrink-0">
              <span>Work with us</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
