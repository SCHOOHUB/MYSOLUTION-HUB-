import React from "react";
import { CheckCircle2, ChevronRight, Phone, Landmark, ShieldCheck, Heart } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onWhatsAppClick: () => void;
  onRequestServiceClick: () => void;
  onTrackSampleClick: () => void;
}

export default function Hero({ onWhatsAppClick, onRequestServiceClick, onTrackSampleClick }: HeroProps) {
  const trustBadges = [
    { label: "Fast Delivery", desc: "Digital verification delivered swiftly" },
    { label: "Secure Processing", desc: "Protected by Paystack gateway servers" },
    { label: "Professional Support", desc: "Help Desk operators available 24/7" },
    { label: "Nationwide Service", desc: "Digital delivery anywhere in Nigeria" },
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center pt-8 pb-16">
      {/* Visual background decorations */}
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-[#0F8A5F] opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-5 w-80 h-80 bg-indigo-600 opacity-10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Grid subtle overlay print */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09101f_1px,transparent_1px),linear-gradient(to_bottom,#09101f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy - Left */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6 text-center lg:text-left">
            {/* Glowing Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited Cyberservice & Document Operators</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 font-display leading-none"
            >
              Your Automated <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-300 bg-clip-text text-transparent">
                Digital Service Hub
              </span>{" "}
              in Nigeria
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-355 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Fast, secure, and stress-free registration, documentation, educational, business, and cyber services all in one place.
            </motion.p>

            {/* Call to action layout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                type="button"
                id="hero-request-cta"
                onClick={onRequestServiceClick}
                className="bg-[#0F8A5F] hover:bg-[#0c734f] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-950/40 cursor-pointer flex items-center gap-2 group"
              >
                <span>Request Service</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-whatsapp-cta"
                onClick={onWhatsAppClick}
                className="border border-slate-850 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-100 px-8 py-4 rounded-full font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400 fill-emerald-400/20 stroke-emerald-500" />
                <span>Chat on WhatsApp</span>
              </button>
            </motion.div>

            {/* Custom Interactive shortcut to order lookup */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-3 text-xs text-slate-400"
            >
              <span>Made payment already?</span>
              <button
                type="button"
                onClick={onTrackSampleClick}
                className="text-emerald-400 hover:text-emerald-350 hover:underline font-bold font-mono transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Track Order #WP20273</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* Premium UI/UX dashboard display graphic - Right (Fintech Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient neon radial glows */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[36px] blur-xl opacity-20 group-hover:opacity-30 transition duration-1000 pointer-events-none"></div>

            <div className="relative mx-auto max-w-[360px] md:max-w-[400px] bg-slate-900/90 backdrop-blur-xl p-6 rounded-[32px] border border-slate-800 shadow-2xl overflow-hidden glass-panel">
              {/* Internal card glass gloss */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Top Status Bar Details */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse-slow"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Solutions Hub Cloud Gateway</span>
                </div>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold font-mono">LIVE OK</span>
              </div>

              {/* Status Display Grid */}
              <div className="py-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div className="space-y-0.5">
                    <span className="text-slate-500 text-[9px] uppercase font-mono tracking-wider">Gateway Integrity</span>
                    <p className="font-display font-extrabold text-xl text-slate-100">99.98% SLA</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-slate-500 text-[9px] uppercase font-mono tracking-wider">Active Handlers</span>
                    <p className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/5 py-1 px-2 rounded-lg inline-block">12 Officers Online</p>
                  </div>
                </div>

                {/* Simulated Recent Feed (Realistic transaction queue) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-slate-550 text-[10px] uppercase tracking-wider block font-bold font-mono">Digital Dispatch Feed</span>

                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/60 flex justify-between items-center text-xs hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-slate-200">WAEC Scratch Card Pin</p>
                        <p className="text-[9px] text-slate-500">Delivered to owohpaul*** • 10s ago</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/5 px-2 py-1 rounded">₦4,000</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/60 flex justify-between items-center text-xs hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-slate-200">Corporate CAC Filing</p>
                        <p className="text-[9px] text-slate-500">Official Clearance Approved • 2m ago</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-teal-400 font-bold bg-teal-400/5 px-2 py-1 rounded">₦22,000</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/60 flex justify-between items-center text-xs hover:border-emerald-500/30 transition-colors hidden sm:flex">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-slate-200">JAMB Admission Clearance</p>
                        <p className="text-[9px] text-slate-500">Original Retransmit Sent • 5m ago</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-blue-400 font-bold bg-blue-500/5 px-2 py-1 rounded">₦3,500</span>
                  </div>
                </div>
              </div>

              {/* Secure payment partner endorsement */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PAYMENT SANDBOX SECURED</span>
                </span>
                <span className="text-slate-500">Paystack / Bank</span>
              </div>
              
            </div>
          </motion.div>
          
        </div>

        {/* Outer Trust guarantee grid row */}
        <div className="mt-16 pt-10 border-t border-slate-900">
          <p className="text-[#0F8A5F] text-xs font-bold uppercase tracking-widest text-center mb-8">
            The MYSOLUTION HUB Guarantee
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="bg-slate-900/40 p-4 rounded-2xl border border-slate-900 hover:border-slate-850 transition-colors"
              >
                <div className="inline-flex p-1.5 bg-[#0F8A5F]/10 rounded-lg text-[#0F8A5F] mb-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <h5 className="font-bold text-slate-200 text-sm">{badge.label}</h5>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
