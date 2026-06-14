import React from "react";
import { MousePointerClick, FileEdit, CheckCircle, SmartphoneNfc } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Service",
      desc: "Search or browse our verified catalog of 100+ education, corporate CAC, identity, and traveling services.",
      icon: <MousePointerClick className="w-6 h-6 text-current" />,
    },
    {
      num: "02",
      title: "Submit Details",
      desc: "Provide necessary profile codes, names, and parameters through our customized dynamic entry forms.",
      icon: <FileEdit className="w-6 h-6 text-current" />,
    },
    {
      num: "03",
      title: "Make Payment",
      desc: "Authorize sandboxed payments instantly through our secure gateway (mimicking Paystack / Bank Transfer).",
      icon: <SmartphoneNfc className="w-6 h-6 text-current" />,
    },
    {
      num: "04",
      title: "Receive Delivery",
      desc: "Receive scratch card PINs immediately on screen or files/certificates delivered securely via email.",
      icon: <CheckCircle className="w-6 h-6 text-current" />,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-t border-slate-100 dark:border-slate-900 relative transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[#0F8A5F] dark:text-emerald-400 text-xs font-bold tracking-widest uppercase px-4.5 py-1.5 bg-emerald-100/70 dark:bg-[#0F8A5F]/20 rounded-full border border-emerald-200/40 dark:border-emerald-500/10">
            Operational Protocol
          </span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-950 dark:text-white mt-6 tracking-tight font-display leading-tight">
            How It Works — Simple & Fast
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans font-light">
            Eliminate endless physical queues and complicated state office runs. Complete your entire documentation cycle in four beautiful, automated stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector timeline line */}
          <div className="hidden lg:block absolute top-[28%] left-12 right-12 h-0.5 bg-slate-200/70 dark:bg-slate-800/80 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-white dark:bg-slate-900 p-7 rounded-[32px] border border-slate-200/50 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:hover:shadow-none flex flex-col justify-between h-72 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-350 z-10 group"
            >
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/45 text-[#0F8A5F] dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-100/60 dark:border-emerald-500/10 group-hover:bg-[#0F8A5F] group-hover:text-white dark:group-hover:text-white transition-all duration-350 shadow-sm">
                  <div className="group-hover:scale-110 transition-transform duration-350">
                    {step.icon}
                  </div>
                </div>
                <span className="text-4xl font-black text-slate-100 dark:text-slate-800 tracking-tighter transition-all duration-350 font-mono group-hover:text-emerald-100 dark:group-hover:text-slate-755">
                  {step.num}
                </span>
              </div>

              <div className="mt-4">
                <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-base font-display tracking-tight">{step.title}</h5>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2.5 leading-relaxed font-sans">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
