import React from "react";
import { STATS } from "../data";
import { Award, Zap, Hourglass, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function StatsSection() {
  const icons = [
    <Award className="w-6 h-6 text-emerald-400" />,
    <Zap className="w-6 h-6 text-emerald-400" />,
    <Hourglass className="w-6 h-6 text-emerald-400" />,
    <ShieldCheck className="w-6 h-6 text-emerald-400" />,
  ];

  return (
    <section id="about-section" className="py-20 bg-[#0A192F] text-white relative overflow-hidden border-t border-slate-900/60">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 text-xs font-bold font-mono tracking-widest uppercase px-4.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Proven Integrity
          </span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-6 tracking-tight font-display leading-tight">
            Why Thousands Choose MYSOLUTION HUB
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans font-light">
            Leading the digital, clearing, and registration workspace in Nigeria through verified consistency, error-free databases, and rapid customer processing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              id={`stat-card-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900/45 backdrop-blur-md p-6 rounded-[28px] border border-slate-800/80 flex flex-col justify-between h-52 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-350 relative group overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-30 transition-opacity duration-350 pointer-events-none" />

              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800/60 group-hover:bg-[#0F8A5F] group-hover:border-emerald-400/45 transition-colors">
                  <div className="group-hover:scale-110 group-hover:text-white group-hover:stroke-white transition-all">
                    {icons[idx] || <Award className="w-6 h-6 text-emerald-400" />}
                  </div>
                </div>
                <span className="text-[9px] text-[#0F8A5F] group-hover:text-emerald-400 font-bold uppercase tracking-widest font-mono">
                  Verified SLA
                </span>
              </div>

              <div className="z-10 mt-2">
                <h4 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display">
                  {stat.value}
                </h4>
                <p className="text-[#0F8A5F] text-xs font-bold tracking-wide uppercase font-mono mt-1.5">{stat.label}</p>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1 font-sans">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
