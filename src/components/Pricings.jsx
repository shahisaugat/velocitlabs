import React from 'react';
import { ArrowRight, Globe, Smartphone, Sparkles, Layers, Palette } from 'lucide-react';

const plans = [
    {
        icon: Globe,
        name: 'Website',
        tagline: 'Marketing sites to full platforms',
        startingAt: '40,000',
        description: 'Static, dynamic, or e-commerce — scoped to your content, catalogue, and integrations.',
    },
    {
        icon: Smartphone,
        name: 'Mobile App',
        tagline: 'iOS, Android, or both',
        startingAt: '50,000',
        description: 'Native or cross-platform, connected to your existing backend or built from scratch.',
    },
    {
        icon: Sparkles,
        name: 'AI Solutions',
        tagline: 'Chatbots to document intelligence',
        startingAt: '30,000',
        featured: true,
        description: 'RAG, LLM integration, automation, and vision — engineered for production, not demos.',
    },
    {
        icon: Palette,
        name: 'UI/UX Design',
        tagline: 'Figma prototypes & design systems',
        startingAt: '15,000',
        description: 'Wireframes, interactive prototypes, and production-ready design assets tailored to your brand.',
    },
    {
        icon: Layers,
        name: 'Full Platform',
        tagline: 'Web, backend, mobile & design',
        startingAt: null,
        description: 'A single accountable team covering the entire build, from architecture to launch.',
    },
];

const Pricing = ({ onOpenEstimator }) => {
    return (
        <section className="relative p-6 sm:p-10 lg:p-12 bg-white">
            {/* Header */}
            <div className="text-center max-w-2xl md:max-w-4xl mx-auto mb-10 md:mb-14">
                <span className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#0066FF] uppercase mb-3">
                    Pricing
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4 md:whitespace-nowrap">
                    Engineered pricing, clear scope.
                </h2>
                <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
                    Every engagement starts with a discovery workshop, so pricing reflects your actual
                    requirements not a generic package. These are starting points.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6 pt-4">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    return (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-6 sm:p-7 flex flex-col transition-all duration-300 ${plan.featured
                                    ? 'bg-[#0066FF] text-white shadow-xl shadow-blue-500/20 lg:-translate-y-3'
                                    : 'bg-gray-50 text-gray-900 hover:shadow-lg'
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-brand-bg text-[#0066FF] text-xs font-bold font-sans px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Popular
                                </div>
                            )}

                            <div
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${plan.featured ? 'bg-white/15' : 'bg-[#0066FF]/10'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${plan.featured ? 'text-white' : 'text-[#0066FF]'}`} />
                            </div>

                            <h3 className="font-serif text-xl font-semibold mb-1">{plan.name}</h3>
                            <p className={`font-sans text-xs mb-4 ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}>
                                {plan.tagline}
                            </p>

                            <div className="mb-4">
                                {plan.startingAt ? (
                                    <div className="flex items-end gap-1.5 flex-wrap">
                                        <span className={`font-sans text-xs mb-1 ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}>
                                            Starting at NPR
                                        </span>
                                        <span className="font-serif text-2xl font-semibold">{plan.startingAt}</span>
                                    </div>
                                ) : (
                                    <span className="font-serif text-2xl font-semibold">Custom Scope</span>
                                )}
                            </div>

                            <p
                                className={`font-sans text-sm leading-relaxed mb-6 flex-1 ${plan.featured ? 'text-white/80' : 'text-gray-500'
                                    }`}
                            >
                                {plan.description}
                            </p>

                            <button
                                onClick={onOpenEstimator}
                                className={`group inline-flex items-center justify-between gap-3 pl-5 pr-1.5 py-1.5 rounded-full font-sans text-sm font-semibold transition-all duration-300 cursor-pointer w-full ${plan.featured
                                        ? 'bg-brand-bg text-[#0066FF] hover:bg-white'
                                        : 'bg-white text-gray-900 border border-gray-200 hover:border-[#0066FF]'
                                    }`}
                            >
                                <span>Get Estimate</span>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0 ${plan.featured ? 'bg-[#0066FF]' : 'bg-gray-900'
                                        }`}
                                >
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Footer link to full pricing guide */}
            <div className="text-center mt-10 md:mt-12">
                <p className="font-sans text-sm text-gray-500">
                    Need the full breakdown by feature and tier?{' '}
                    <a
                        href="/pricing"
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/pricing');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className="text-[#0066FF] font-semibold hover:underline underline-offset-2"
                    >
                        View detailed pricing guide
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Pricing;