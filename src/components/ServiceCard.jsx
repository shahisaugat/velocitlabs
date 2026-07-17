import React from 'react';
import { ArrowUpRight } from 'lucide-react';

function ServiceCard({ svc, onClose }) {
    const Icon = svc.icon;
    return (
        <a
            href={svc.href}
            onClick={onClose}
            className="group relative flex flex-col gap-0 px-8 py-8 bg-white transition-colors duration-200 cursor-pointer"
        >
            <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0066FF] flex items-center justify-center shrink-0 transition-colors duration-200">
                        <Icon size={18} className="text-white transition-colors duration-200" strokeWidth={1.6} />
                    </div>
                    <div>
                        <p className="font-semibold text-brand-text text-[18px] leading-tight tracking-[-0.01em]">{svc.title}</p>
                        <p className="text-brand-text/85 text-[15px] mt-0.5 leading-snug">{svc.body}</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full  flex items-center justify-center group-hover:text-white shrink-0 mt-0.5 duration-200 group-hover:bg-primary">
                    <ArrowUpRight size={20} className="text-[#0066FF] group-hover:text-white " />
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[13px] font-medium text-brand-text/75 bg-[#f1f1f1] rounded-full px-4 py-2.5 leading-tight transition-colors duration-150"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.75 overflow-hidden">
            </div>
        </a>
    );
}

export default ServiceCard;