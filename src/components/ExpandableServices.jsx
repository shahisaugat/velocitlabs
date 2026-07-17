import React from 'react';
import { ArrowRight } from 'lucide-react';

const ILLUSTRATION_BY_TYPE = {
  website: '/web-illustrator.png',
  wireframe: '/ui-illustrator.png',
  illustration: '/ai-illustrator.png',
  strategy: '/strategy-illustrator.png',
};

const SERVICES = [
  {
    id: 6,
    type: 'overview',
    category: 'Overview',
    title: 'Company Overview',
    subtitle: 'Reliable engineering partners for fast-growing companies',
    description: 'We combine senior technical leadership with agile development execution to deliver high-quality, scalable digital products.',
    bgClass: 'bg-[#0066FF]',
    textColor: 'text-white',
    subtitleColor: 'text-white/85',
    categoryColor: 'text-white/60',
  },
  {
    id: 0,
    type: 'website', // Outline website layout (website-illustrator.png)
    category: 'Development',
    title: 'Website Development',
    subtitle: 'Custom websites built for business growth',
    description: 'High-performance marketing sites, SEO-optimized web products, and robust headless CMS integrations.',
    bgClass: 'bg-[#F5F1FF]/70',
    textColor: 'text-black',
    subtitleColor: 'text-black/85',
    categoryColor: 'text-black/60',
    positionClass: '-bottom-8 -right-2 h-auto',
  },
  {
    id: 1,
    type: 'image', // Unsplash photo
    category: 'Design',
    title: 'UI & UX Design',
    subtitle: 'Simple, modern, and user-friendly interfaces',
    description: 'Crafting custom design systems, wireframe mockups, and high-fidelity prototype flows mapped for conversion.',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgClass: 'bg-[#F4F7FA]', // Snowy revealed background
    textColor: 'text-white group-hover:text-black transition-colors duration-500',
    subtitleColor: 'text-white group-hover:text-black/80 transition-colors duration-500',
    categoryColor: 'text-white group-hover:text-black/60 transition-colors duration-500',
  },
  {
    id: 2,
    type: 'illustration',
    category: 'Backend',
    title: 'Backend Development',
    subtitle: 'Secure systems built for speed and scale',
    description: 'Scaling backend servers, designing SQL/NoSQL databases, and coding RESTful/GraphQL APIs.',
    illustration: '/backend-illustrator.png',
    bgClass: 'bg-[#E8EEFF]/70', // Snowy target gradient
    textColor: 'text-black',
    subtitleColor: 'text-black/85',
    categoryColor: 'text-black/60',
  },
  {
    id: 3,
    type: 'image',
    category: 'Mobile',
    title: 'Mobile App Development',
    subtitle: 'Mobile apps for iPhone and Android',
    description: 'Native-performance iOS and Android applications built utilizing React Native, Flutter, and native architectures.',
    image: '/app-illustrator.jpeg',
    bgClass: 'bg-[#F4F7FA]', // Snowy revealed background
    textColor: 'text-white group-hover:text-black transition-colors duration-500',
    subtitleColor: 'text-white/90 group-hover:text-black/80 transition-colors duration-500',
    categoryColor: 'text-white/60 group-hover:text-black/60 transition-colors duration-500',
  },

  {
    id: 5,
    type: 'illustration', // White with neural network node art (ai-illustrator.png)
    category: 'AI',
    title: 'AI Solutions',
    subtitle: 'Smart AI features for modern businesses',
    description: 'Custom LLM integrations, document search tools, intelligent agents, and cognitive workflow automations.',
    bgClass: 'bg-[#F4F7FA]', // Snowy background
    textColor: 'text-black',
    subtitleColor: 'text-black/85',
    positionClass: '-bottom-14 h-auto right-0',
    categoryColor: 'text-black/60',
  },
  {
    id: 4,
    type: 'image', // Unsplash photo
    category: 'Cloud & DevOps',
    title: 'Cloud & DevOps',
    subtitle: 'Reliable cloud infrastructure and deployment',
    description: 'Setting up container clusters, automated pipelines, cloud migrations, and proactive site monitoring.',
    image: '/cloud-devops.png',
    bgClass: 'bg-[#F4F7FA]', // Snowy revealed background
    textColor: 'text-white group-hover:text-black transition-colors duration-500',
    subtitleColor: 'text-white/90 group-hover:text-black/80 transition-colors duration-500',
    categoryColor: 'text-white/60 group-hover:text-black/60 transition-colors duration-500',
  },
];

function ServiceCard({ service }) {
  const isImage = service.type === 'image';
  const illustrationSrc = service.illustration || ILLUSTRATION_BY_TYPE[service.type];

  return (
    <div
      className={`
        group relative overflow-hidden cursor-pointer h-80 md:h-100 flex flex-col justify-start p-6 sm:p-8 
        rounded-none shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 
        w-[85%] min-w-70 shrink-0 sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)] sm:min-w-0 sm:shrink lg:flex-1 snap-start
        ${service.bgClass}
      `}
    >
      {/* Image Background (slides out of the frame completely to the left on hover) */}
      {isImage && service.image && (
        <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-[-110%]">
          <img
            src={service.image}
            alt={service.title}
            className={service.imageClass || "absolute inset-0 w-full h-full object-cover"}
          />
          <div className={`absolute inset-0 ${service.overlayClass || 'bg-linear-to-t from-black/70 via-black/40 to-black/25'} pointer-events-none`} />
        </div>
      )}

      {/* Blueprint background grid for non-image cards */}
      {!isImage && (
        <div className="absolute inset-0 bg-blueprint opacity-[0.02] z-0 pointer-events-none" />
      )}

      {/* Illustration (slides out of the frame completely to the left on hover) */}
      {illustrationSrc && (
        <img
          src={illustrationSrc}
          alt={service.title}
          className={`absolute z-10 object-contain pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-[-110%] ${service.positionClass || 'bottom-0 right-0 h-auto origin-bottom-right'}`}
        />
      )}

      {/* Top Text Block (Category, Title, and Subtitle remain fixed at the top) */}
      <div className="relative z-20 flex flex-col items-start w-full">
        {/* Category tag */}
        <p className={`text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase ${service.categoryColor} mb-2`}>
          {service.category}
        </p>
        {/* Main Title */}
        <h3 className={`font-sans text-[20px] sm:text-[22px] font-bold ${service.textColor} leading-tight mb-2.5`}>
          {service.title}
        </h3>
        {/* Subtitle - Always Visible */}
        <p className={`text-[14px] sm:text-[15px] font-sans leading-relaxed ${service.textColor} opacity-80 font-medium mb-3`}>
          {service.subtitle}
        </p>
        {/* Detailed Description - Slides in simultaneously from the right below the subtitle */}
        <p className={`text-[13px] sm:text-[14px] font-sans leading-relaxed ${service.subtitleColor} opacity-0 translate-x-[115%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none`}>
          {service.description}
        </p>
      </div>

      {/* Learn More Button - Slides up from bottom on hover */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 pointer-events-none">
        <div className={`flex items-center gap-1.5 font-sans text-[14px] font-semibold ${service.textColor} opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}>
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default function ExpandableServices({ onOpenEstimator }) {
  return (
    <section className="bg-[#F7FAFD] w-full border-t border-brand-text/5 overflow-hidden">
      <div className="max-w-8xl mx-auto pl-6 pr-0 py-6 sm:p-10 lg:p-12 flex flex-col">

        {/* Header */}
        <div className="text-center w-full max-w-4xl mx-auto mb-6 sm:mb-10 lg:mb-12 pr-6 sm:pr-0">
          <span className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#0066FF] uppercase mb-3">
            Services
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            High-performance capabilities.
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            From design systems to production-ready platforms, we engineer products built to scale.
          </p>
        </div>

        {/* Mobile Horizontal Scroll: All 7 cards in a single row */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden gap-6 sm:hidden">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Tablet & Desktop Layouts (>= sm) */}
        <div className="hidden sm:flex flex-col gap-6 md:gap-8">
          {/* Top Row Grid: 4 Columns on Large Screens */}
          <div className="flex flex-row sm:flex-wrap lg:flex-nowrap gap-6 md:gap-8">
            {SERVICES.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Bottom Row Grid: 3 Columns on Large Screens, Centered */}
          <div className="flex flex-row sm:flex-wrap lg:flex-nowrap justify-center gap-6 md:gap-8 lg:w-[73.5%] lg:mx-auto">
            {SERVICES.slice(4, 7).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}