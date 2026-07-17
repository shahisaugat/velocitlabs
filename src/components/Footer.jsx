import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const footerLinks = {
    Company: [
        { label: 'Showcase', href: '#showcase' },
        { label: 'Services', href: '#services' },
        { label: 'Case Studies', href: '#case-studies' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About Us', href: '#about' },
    ],
    Services: [
        { label: 'Website Development', href: '#services' },
        { label: 'Mobile App Development', href: '#services' },
        { label: 'UI & UX Design', href: '#services' },
        { label: 'Backend Development', href: '#services' },
        { label: 'AI Solutions', href: '#services' },
        { label: 'Cloud & DevOps', href: '#services' },
    ],
    Resources: [
        { label: 'Engineering Notes', href: '#blog' },
        { label: 'Careers', href: '#careers' },
        { label: 'FAQs', href: '#faq' },
        { label: 'Contact Us', href: '#contact' },
    ],
    Legal: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Security', href: '#security' },
        { label: 'Cookie Policy', href: '#cookies' },
    ],
};

const socials = [
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
];

const badges = [
    { icon: ShieldCheck, label: 'Enterprise-grade security' },
    { icon: Zap, label: 'Shipped at pace' },
];

const Footer = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setEmail('');
    };

    return (
        <footer className="relative bg-[#F7FAFD] overflow-hidden">
            <div className="relative max-w-8xl mx-auto p-6 sm:p-10 lg:px-12 lg:pt-12">

                {/* Brand + link columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12 pb-12">

                    {/* Brand, badges, contact, newsletter */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4">
                        <a
                            href="/"
                            className="shrink-0 flex items-center mb-4"
                        >
                            <img
                                src="/brand-light.png"
                                alt="Velocit Labs"
                                className="h-6 sm:h-7 w-auto object-contain transition-all duration-300"
                            />
                        </a>
                        <p className="font-sans text-base text-gray-500 leading-relaxed max-w-sm">
                            The engineering partner for ambitious teams with aggressive timelines.
                        </p>

                        <div className="flex flex-col gap-3 mt-6">
                            {badges.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-[#0066FF]/8 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-[#0066FF]" />
                                    </div>
                                    <span className="font-sans text-base text-gray-600">{label}</span>
                                </div>
                            ))}
                        </div>

                        <ul className="space-y-3 mt-7">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4.5 h-4.5 text-[#0066FF] mt-0.5 shrink-0" />
                                <span className="font-sans text-base text-gray-600">Lalitpur, Nepal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4.5 h-4.5 text-[#0066FF] shrink-0" />
                                <a
                                    href="mailto:support.velocitlabs@gmail.com"
                                    className="font-sans text-base text-gray-600 hover:text-[#0066FF] transition-colors duration-200"
                                >
                                    support.velocitlabs@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4.5 h-4.5 text-[#0066FF] shrink-0" />
                                <a
                                    href="tel:+9770000000"
                                    className="font-sans text-base text-gray-600 hover:text-[#0066FF] transition-colors duration-200"
                                >
                                    +977-9866291003
                                </a>
                            </li>
                        </ul>

                        <div className="flex items-center gap-3 mt-7">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 4 link columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading} className="col-span-1 lg:col-span-2">
                            <h4 className="font-sans text-sm font-semibold tracking-[0.1em] uppercase text-gray-400 mb-5">
                                {heading}
                            </h4>
                            <ul className="space-y-3.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="font-sans text-base text-gray-600 hover:text-[#0066FF] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-sm text-gray-400 order-2 sm:order-1">
                        &copy; {new Date().getFullYear()} Velocit Technologies. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 order-1 sm:order-2">
                        <a href="#privacy" className="font-sans text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#terms" className="font-sans text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#refund-policy" className="font-sans text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
                            Refund Policy
                        </a>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Globe className="w-4 h-4" />
                            <span className="font-sans text-sm">EN</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;