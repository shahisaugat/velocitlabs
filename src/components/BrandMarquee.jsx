import React from "react";

const BRANDS = [
  { name: "Kantipur", url: "https://ekantipur.com/assets/images/kantipur-logo.svg" },
  { name: "Onlinekhabar", url: "https://www.onlinekhabar.com/wp-content/themes/onlinekhabar-2021/img/logoMain.png" },
  { name: "Techpana", url: "https://techpana.prixacdn.net/static/assets/images/techpana-logo.png" },
  { name: "Codavatar", url: "https://codavatar.com/wp-content/uploads/2023/06/codavatar-logo.svg" },
  { name: "Setopati", url: "https://www.setopati.com/themes/setopati/images/logo.svg?v=1.9" },
  { name: "Microsoft", url: "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1727706672983" },
  { name: "Google", url: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1731911497387" },
  { name: "Amazon", url: "https://cdn.brandfetch.io/idawOgYOsG/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1747149760488" },
];

export default function BrandMarquee() {
  // Exactly two copies back to back — translateX(-50%) then loops seamlessly
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className="py-6 bg-white border-y border-black/3 overflow-hidden">
      <style>{`
        @keyframes brandScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brand-track {
          animation: brandScroll 22s linear infinite;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 max-w-8xl mx-auto px-0 lg:px-12">
        {/* Left: heading, centered on mobile/tablet, left-aligned on desktop */}
        <div className="w-full lg:w-[32%] shrink-0 px-6 sm:px-8 lg:px-0 text-center lg:text-left">
          <p className="text-md lg:text-lg font-medium text-gray-900 leading-snug">
            Join 100,000+ customers around the world who trust Velocit Technologies
          </p>
        </div>

        {/* Right: infinitely scrolling logos, full width on mobile/tablet */}
        <div className="relative w-full lg:flex-1 min-w-0 overflow-hidden py-4 lg:py-1 border-y border-black/4 lg:border-none">
          <div className="brand-track flex items-center gap-12 lg:gap-20 w-max">
            {track.map((brand, idx) => (
              <img
                key={idx}
                src={brand.url}
                alt={brand.name}
                className="h-6 lg:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default select-none"
              />
            ))}
          </div>

          {/* Edge gradients for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-8 lg:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 lg:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}