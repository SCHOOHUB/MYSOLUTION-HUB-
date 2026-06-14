import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => {
    setActiveIdx((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIdx((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));
  };

  const activeTest = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F8A5F] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#0F8A5F] text-xs font-bold tracking-wider uppercase px-3 py-1 bg-emerald-500/10 rounded-full">
            Client Consensus
          </span>
          <h3 className="text-3xl font-extrabold text-slate-100 mt-4 leading-tight">
            Loved By Candidates & Enterprises Across Nigeria
          </h3>
        </div>

        <div className="relative min-h-[340px] md:min-h-[280px] bg-slate-950 p-8 md:p-10 rounded-[32px] border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="absolute top-6 left-6 text-slate-800/40 pointer-events-none">
            <Quote className="w-16 h-16 transform -scale-x-100" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative"
            >
              {/* Rating stars */}
              <div className="flex gap-1">
                {[...Array(activeTest.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>

              {/* Review block */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-medium text-left">
                "{activeTest.content}"
              </p>

              {/* Author profiles */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-900">
                <img
                  src={activeTest.avatar}
                  alt={activeTest.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-bold text-slate-200 text-sm">{activeTest.name}</h5>
                  <p className="text-slate-500 text-xs mt-0.5">{activeTest.role}</p>
                  <p className="text-emerald-400/80 text-[10px] font-bold tracking-wider uppercase mt-1 font-mono">
                    📍 {activeTest.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls button triggers */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              type="button"
              id="testimonial-prev-btn"
              onClick={prev}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              id="testimonial-next-btn"
              onClick={next}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-slate-400 hover:text-white cursor-pointer"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
