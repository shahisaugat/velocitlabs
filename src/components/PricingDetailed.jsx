import React, { useState } from 'react';
import { Check, Minus, ArrowRight, Sparkles, Phone } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA — sourced from Velocit Technologies Service Quotation Guide   */
/* ------------------------------------------------------------------ */

const websiteData = {
  static: {
    label: 'Static Website',
    blurb: 'Marketing sites, campaign pages, and brand launches.',
    rows: [
      'Project Size',
      'Timeline',
      'Custom Design',
      'Blog / Insights Section',
      'Structured Data (SEO)',
      'Staging Environment',
      'CI/CD Pipeline',
      'Support Window',
    ],
    packages: [
      {
        name: 'Starter',
        price: '7,000',
        priceNote: 'up to 15,000',
        values: ['1–5 pages', '2 weeks', true, false, false, false, false, '7 days'],
      },
      {
        name: 'Business',
        price: '40,000',
        priceNote: 'up to 55,000',
        featured: true,
        values: ['6–10 pages', '3–4 weeks', true, true, true, true, false, '15 days'],
      },
      {
        name: 'Enterprise',
        price: null,
        values: ['11–20 pages', '5 weeks', true, true, true, true, true, '30 days'],
      },
    ],
    addOns: [
      { name: 'Additional Page', desc: 'One page beyond the package allowance', price: '1,000 / page' },
      { name: 'Multilingual Build', desc: 'Translation-ready structure plus one additional language', price: '5,000' },
    ],
  },
  dynamic: {
    label: 'Dynamic Website',
    blurb: 'Database-backed platforms with CMS, accounts, and admin dashboards.',
    rows: [
      'Project Size',
      'Timeline',
      'Admin Dashboard',
      'Role-Based Access',
      'Search',
      'API Layer',
      'Notifications',
      'Support Window',
    ],
    packages: [
      {
        name: 'Starter',
        price: '40,000',
        values: ['Single module (blog + accounts)', '6 weeks', true, 'Basic (2 roles)', 'Keyword', 'REST', 'Email', '15 days'],
      },
      {
        name: 'Business',
        price: '75,000',
        featured: true,
        values: ['3–5 modules + dashboard', '8–9 weeks', true, 'Standard (up to 5 roles)', 'Full-Text / Fuzzy', 'REST + Webhooks', 'Email + In-App', '30 days'],
      },
      {
        name: 'Enterprise',
        price: null,
        values: ['6+ modules, full platform', '10–12 weeks', true, 'Custom Role Builder', 'Full-Text / Fuzzy', 'REST + GraphQL + Webhooks', 'Email + In-App + SMS/Push', '60 days'],
      },
    ],
    addOns: [
      { name: 'Additional Third-Party Integration', desc: 'Integration with one additional external system', price: 'Scoped on request' },
      { name: 'Multi-Language Content Support', desc: 'Structured translation workflow for content entities', price: '5,000' },
    ],
  },
  ecommerce: {
    label: 'E-Commerce',
    blurb: 'Headless commerce or platform builds — Shopify Plus, Medusa, or custom Next.js commerce.',
    rows: [
      'Catalogue Size',
      'Timeline',
      'Payment Gateway',
      'Shipping Rates',
      'Abandoned Cart Recovery',
      'Multi-Warehouse Inventory',
      'Marketplace Sync',
      'Loyalty Program',
      'Support Window',
    ],
    packages: [
      {
        name: 'Starter',
        price: '1,00,000',
        values: ['Up to 100 SKUs', '8 weeks', 'Card only', 'Flat-Rate', false, false, false, false, '30 days'],
      },
      {
        name: 'Business',
        price: '2,10,000',
        featured: true,
        values: ['Up to 1,000 SKUs', '10–11 weeks', 'Card + Digital Wallets', 'Carrier-Calculated', true, false, false, false, '60 days'],
      },
      {
        name: 'Enterprise',
        price: null,
        values: ['1,000+ SKUs / multi-vendor', '12–14 weeks', 'Card + Wallets + BNPL', 'Multi-Carrier + Label Printing', true, true, true, true, '90 days + SLA'],
      },
    ],
    note: 'Pricing scales with catalogue complexity, payment methods, and fulfilment logic. Payment processor fees, carrier account costs, and marketplace commissions are third-party costs outside this quotation.',
  },
};

const mobileData = {
  rows: ['Platform Coverage', 'Screens Included', 'Backend Integration', 'Push Notifications', 'Offline Mode', 'Biometric Authentication', 'Analytics & Crash Reporting', 'Support Window'],
  packages: [
    {
      name: 'Starter',
      price: '50,000',
      values: ['Single platform (iOS or Android)', 'Up to 8 screens', 'Connects to existing API', true, false, false, 'Basic', '15 days'],
    },
    {
      name: 'Business',
      price: '90,000',
      featured: true,
      values: ['Both platforms (Flutter / RN)', 'Up to 15 screens', 'Existing or new API', true, true, true, 'Standard', '30 days'],
    },
    {
      name: 'Enterprise',
      price: null,
      values: ['Both platforms, native performance', '20+ screens', 'Full custom backend included', true, true, true, 'Advanced', '60 days'],
    },
  ],
};

const capabilityServices = {
  backend: {
    label: 'Backend Development',
    blurb: 'API design, database architecture, and system integration for new and legacy platforms.',
    groups: [
      {
        title: 'API & Auth',
        items: [
          { name: 'REST API Development', tier: 'All Tiers' },
          { name: 'GraphQL API Development', tier: 'Business, Enterprise' },
          { name: 'Authentication Services (JWT/OAuth2)', tier: 'All Tiers' },
          { name: 'Authorization & RBAC', tier: 'All Tiers' },
        ],
      },
      {
        title: 'Architecture & Data',
        items: [
          { name: 'Database Design', tier: 'All Tiers' },
          { name: 'Microservices Architecture', tier: 'Enterprise' },
          { name: 'Payment API Integration', tier: 'Business, Enterprise' },
          { name: 'Third-Party API Integration', tier: 'Per integration' },
        ],
      },
      {
        title: 'Documentation & Reliability',
        items: [
          { name: 'API Documentation (Swagger)', tier: 'All Tiers' },
          { name: 'Postman Collection Delivery', tier: 'All Tiers' },
          { name: 'Automated Testing Suite', tier: 'Business, Enterprise' },
          { name: 'Rate Limiting & Throttling', tier: 'Business, Enterprise' },
        ],
      },
    ],
    priceRange: { from: '20,000', to: '80,000' },
    note: 'Typically scoped as a component of a larger website, mobile, or platform engagement — or quoted standalone from NPR 20,000 for a focused API layer to NPR 80,000 for a multi-service architecture.',
  },
  ai: {
    label: 'AI Solutions',
    blurb: 'Applied AI capabilities engineered for production, not proof-of-concept tooling.',
    groups: [
      {
        title: 'Conversational & Language',
        items: [
          { name: 'AI Chatbots & Assistants', tier: 'All Tiers' },
          { name: 'Retrieval-Augmented Generation (RAG)', tier: 'Business, Enterprise' },
          { name: 'LLM Integration', tier: 'All Tiers' },
          { name: 'Vector Database Implementation', tier: 'Business, Enterprise' },
        ],
      },
      {
        title: 'Automation & Documents',
        items: [
          { name: 'Workflow Automation', tier: 'Business, Enterprise' },
          { name: 'Optical Character Recognition (OCR)', tier: 'Business, Enterprise' },
          { name: 'Document Intelligence', tier: 'Enterprise' },
          { name: 'Recommendation Engines', tier: 'Enterprise' },
        ],
      },
      {
        title: 'Vision & Speech',
        items: [
          { name: 'Speech Recognition & Synthesis', tier: 'Enterprise' },
          { name: 'Computer Vision', tier: 'Enterprise' },
        ],
      },
    ],
    priceRange: { from: '30,000', to: '2,00,000' },
    note: 'Ranges from a scoped chatbot implementation to a multi-capability document intelligence platform. Third-party model API usage is billed separately at pass-through rates.',
  },
  design: {
    label: 'UI & UX Design',
    blurb: 'Research-led design, from wireframes through to developer-ready specifications.',
    groups: [
      {
        title: 'Research & Structure',
        items: [
          { name: 'User Research', tier: 'Business, Enterprise' },
          { name: 'Wireframing', tier: 'All Tiers' },
          { name: 'User Flow Mapping', tier: 'All Tiers' },
        ],
      },
      {
        title: 'Systems & Prototyping',
        items: [
          { name: 'Design System Creation', tier: 'Business, Enterprise' },
          { name: 'Interactive Prototypes', tier: 'Business, Enterprise' },
          { name: 'High-Fidelity Visual Design', tier: 'All Tiers' },
        ],
      },
      {
        title: 'Delivery',
        items: [
          { name: 'Responsive Design Specification', tier: 'All Tiers' },
          { name: 'Developer Handoff Package', tier: 'All Tiers' },
        ],
      },
    ],
    priceRange: { from: '18,000', to: '2,00,000' },
    note: 'From a focused wireframe-to-prototype sprint to a full design system supporting a multi-module platform.',
  },
};

const topTabs = [
  { id: 'website', label: 'Website' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI Solutions' },
  { id: 'design', label: 'UI & UX Design' },
];

const websiteSubTabs = [
  { id: 'static', label: 'Static' },
  { id: 'dynamic', label: 'Dynamic' },
  { id: 'ecommerce', label: 'E-Commerce' },
];

/* ------------------------------------------------------------------ */
/*  CELL RENDER HELPER                                                  */
/* ------------------------------------------------------------------ */

const Cell = ({ value, featured }) => {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${featured ? 'bg-white/20' : 'bg-[#0066FF]/10'}`}>
          <Check className={`w-3 h-3 ${featured ? 'text-white' : 'text-[#0066FF]'}`} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className={`w-4 h-4 ${featured ? 'text-white/30' : 'text-gray-300'}`} />
      </div>
    );
  }
  return (
    <span className={`text-xs sm:text-sm text-center block font-sans ${featured ? 'text-white/90' : 'text-gray-600'}`}>
      {value}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  PACKAGE COMPARISON TABLE (Website tiers, Mobile)                   */
/* ------------------------------------------------------------------ */

const PackageComparison = ({ data }) => {
  const { rows, packages, addOns, note } = data;

  return (
    <div>
      {/* Mobile-friendly stacked cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-3xl p-6 sm:p-7 flex flex-col transition-all duration-300 ${
              pkg.featured
                ? 'bg-[#0066FF] text-white shadow-xl shadow-blue-500/20 md:-translate-y-3'
                : 'bg-gray-50 text-gray-900'
            }`}
          >
            {pkg.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-brand-bg text-[#0066FF] text-xs font-bold font-sans px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                Most Popular
              </div>
            )}

            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4">{pkg.name}</h3>

            <div className="mb-6">
              {pkg.price ? (
                <div className="flex items-end gap-1.5 flex-wrap">
                  <span className="font-sans text-xs opacity-70">NPR</span>
                  <span className="font-serif text-3xl sm:text-4xl font-semibold">{pkg.price}</span>
                </div>
              ) : (
                <div className="font-serif text-3xl sm:text-4xl font-semibold">Custom</div>
              )}
              {pkg.priceNote && (
                <p className={`font-sans text-xs mt-1 ${pkg.featured ? 'text-white/60' : 'text-gray-400'}`}>
                  up to NPR {pkg.priceNote}
                </p>
              )}
            </div>

            <ul className="flex flex-col gap-3 flex-1 mb-6">
              {rows.map((row, i) => (
                <li key={row} className="flex items-start justify-between gap-3 text-sm">
                  <span className={`font-sans shrink-0 ${pkg.featured ? 'text-white/70' : 'text-gray-500'}`}>
                    {row}
                  </span>
                  <div className="text-right">
                    <Cell value={pkg.values[i]} featured={pkg.featured} />
                  </div>
                </li>
              ))}
            </ul>

            <button
              className={`group inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 cursor-pointer w-full ${
                pkg.featured
                  ? 'bg-brand-bg text-[#0066FF] hover:bg-white'
                  : 'bg-white text-gray-900 border border-gray-200 hover:border-[#0066FF]'
              }`}
            >
              <span>{pkg.price ? 'Get Started' : 'Book a Call'}</span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0 ${
                  pkg.featured ? 'bg-[#0066FF]' : 'bg-gray-900'
                }`}
              >
                {pkg.price ? (
                  <ArrowRight className="w-4 h-4 text-white" />
                ) : (
                  <Phone className="w-3.5 h-3.5 text-white" />
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      {note && (
        <p className="font-sans text-xs sm:text-sm text-gray-400 mt-6 leading-relaxed max-w-3xl">
          <span className="font-semibold text-gray-500">Pricing note. </span>
          {note}
        </p>
      )}

      {addOns && addOns.length > 0 && (
        <div className="mt-10">
          <h4 className="font-serif text-lg font-semibold text-gray-900 mb-4">Optional Add-Ons</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between gap-4 bg-gray-50 rounded-2xl px-5 py-4"
              >
                <div>
                  <p className="font-sans text-sm font-semibold text-gray-900">{addon.name}</p>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">{addon.desc}</p>
                </div>
                <span className="font-sans text-sm font-semibold text-[#0066FF] whitespace-nowrap">
                  NPR {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  CAPABILITY LIST (Backend, AI, Design — no tiered packages)         */
/* ------------------------------------------------------------------ */

const CapabilityService = ({ data }) => {
  const { groups, priceRange, note } = data;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {groups.map((group) => (
          <div key={group.title} className="bg-gray-50 rounded-3xl p-6 sm:p-7">
            <h4 className="font-serif text-lg font-semibold text-gray-900 mb-4">{group.title}</h4>
            <ul className="flex flex-col gap-3.5">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4.5 h-4.5 rounded-full bg-[#0066FF]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-sans text-sm text-gray-700 leading-snug">{item.name}</p>
                    <p className="font-sans text-[11px] text-gray-400 mt-0.5">{item.tier}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-[#0066FF] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-sans text-xs font-semibold tracking-wide text-white/60 uppercase mb-2">
            Pricing Approach
          </p>
          <div className="flex items-end gap-2 mb-3">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              NPR {priceRange.from}
            </span>
            <span className="font-sans text-sm text-white/60 mb-1">— {priceRange.to}</span>
          </div>
          <p className="font-sans text-sm text-white/80 leading-relaxed max-w-xl">{note}</p>
        </div>
        <button className="group inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 bg-brand-bg hover:bg-white text-[#0066FF] font-sans text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer shrink-0 w-full md:w-fit">
          <span className="whitespace-nowrap">Book a Call</span>
          <div className="w-9 h-9 rounded-full bg-[#0066FF] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0">
            <Phone className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

const PricingDetailed = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [activeSubTab, setActiveSubTab] = useState('static');

  const renderContent = () => {
    switch (activeTab) {
      case 'website':
        return (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {websiteSubTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-5 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-[#0066FF] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="font-sans text-sm text-gray-500 mb-8 max-w-2xl">
              {websiteData[activeSubTab].blurb}
            </p>
            <PackageComparison data={websiteData[activeSubTab]} />
          </div>
        );
      case 'mobile':
        return (
          <div>
            <p className="font-sans text-sm text-gray-500 mb-8 max-w-2xl">
              Native and cross-platform mobile applications for iOS and Android, selected based on
              performance requirements, budget, and platform-specific feature needs.
            </p>
            <PackageComparison data={mobileData} />
          </div>
        );
      case 'backend':
      case 'ai':
      case 'design':
        return (
          <div>
            <p className="font-sans text-sm text-gray-500 mb-8 max-w-2xl">
              {capabilityServices[activeTab].blurb}
            </p>
            <CapabilityService data={capabilityServices[activeTab]} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#0066FF] uppercase mb-3">
            Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Transparent scope. Engineered pricing.
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            Every engagement is led by a named delivery lead, backed by a cross-functional team of
            engineers, designers, and quality specialists. Final pricing is confirmed after a
            discovery workshop.
          </p>
        </div>

        {/* Top-level tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12">
          {topTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}

        <p className="text-center font-sans text-xs sm:text-sm text-gray-400 mt-12">
          Prices are shown in Nepali Rupees (NPR) and reflect standard scope with client-supplied
          content. Third-party fees, licenses, and pass-through API costs are quoted separately.
        </p>
      </div>
    </section>
  );
};

export default PricingDetailed;