import React from "react";
import { Service } from "../types";
import { GraduationCap, FileUser, Briefcase, Building2, Plane, Home, FileText, Printer, Smartphone, Laptop, Clock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  key?: string;
  service: Service;
  onRequestClick: (service: Service) => void;
}

export default function ServiceCard({ service, onRequestClick }: ServiceCardProps) {
  // Map icons based on category
  const getIcon = (category: Service["category"]) => {
    switch (category) {
      case "education":
        return <GraduationCap className="w-5 h-5 text-[#0F8A5F]" />;
      case "identity":
        return <FileUser className="w-5 h-5 text-[#0F8A5F]" />;
      case "nysc":
        return <Briefcase className="w-5 h-5 text-[#0F8A5F]" />;
      case "business":
        return <Building2 className="w-5 h-5 text-[#0F8A5F]" />;
      case "travel":
        return <Plane className="w-5 h-5 text-[#0F8A5F]" />;
      case "property":
        return <Home className="w-5 h-5 text-[#0F8A5F]" />;
      case "employment":
        return <FileText className="w-5 h-5 text-[#0F8A5F]" />;
      case "printing":
        return <Printer className="w-5 h-5 text-[#0F8A5F]" />;
      case "digital":
        return <Smartphone className="w-5 h-5 text-[#0F8A5F]" />;
      case "gadgets":
        return <Laptop className="w-5 h-5 text-[#0F8A5F]" />;
      default:
        return <GraduationCap className="w-5 h-5 text-[#0F8A5F]" />;
    }
  };

  const getCategoryLabel = (category: Service["category"]) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <motion.div
      id={`service-card-${service.id}`}
      whileHover={{ y: -6 }}
      className="bg-white rounded-3xl border border-slate-200/60 p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/5 glow-hover"
    >
      {/* Popular indicator badge */}
      {service.popular && (
        <span className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-emerald-500 text-white text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-bl-2xl uppercase font-display">
          Popular
        </span>
      )}

      <div>
        {/* Category Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100/30">
            {getIcon(service.category)}
          </div>
          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase font-mono">
            {getCategoryLabel(service.category)}
          </span>
        </div>

        {/* Content */}
        <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug font-display tracking-tight">
          {service.name}
        </h4>
        <p className="text-slate-500 text-xs mt-2.5 line-clamp-2 leading-relaxed font-sans">
          {service.description}
        </p>
      </div>

      {/* Meta specifications */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">SLA: {service.estimatedTime}</span>
          </span>
          <span className="font-mono font-bold text-emerald-600 text-base">
            {service.priceRaw > 0 ? `₦${service.priceRaw.toLocaleString()}` : "Inquire Price"}
          </span>
        </div>

        <button
          type="button"
          id={`order-btn-${service.id}`}
          onClick={() => onRequestClick(service)}
          className="w-full bg-[#0A192F] hover:bg-[#0F8A5F] text-white hover:text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-lg group-hover:shadow-emerald-900/10"
        >
          <span>Request Service</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}
