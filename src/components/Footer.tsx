import React from "react";
import { Mail, MapPin, Phone, MessageSquare, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1.5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F8A5F] flex items-center justify-center font-bold text-white text-base">
              M
            </div>
            <span className="text-base font-extrabold text-slate-100 tracking-tight font-sans">MYSOLUTION HUB</span>
          </div>
          <p className="text-[#0F8A5F] font-semibold text-[10px] tracking-wider uppercase font-mono">
            Fast • Reliable • Professional
          </p>
          <p className="text-slate-500 leading-relaxed pr-4">
            Nigeria's dependable, automated digital service marketplace for hassle-free educational registrations, corporate CAC business booking, international transit documentation, and cyber assistance.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 text-sm tracking-wide">Quick Links</h5>
          <ul className="space-y-2.5 font-medium text-slate-400">
            <li>
              <a href="#hero-section" className="hover:text-emerald-400 transition-colors">
                Home Portal
              </a>
            </li>
            <li>
              <a href="#services-section" className="hover:text-emerald-400 transition-colors">
                Browse Marketplace
              </a>
            </li>
            <li>
              <a href="#how-it-works-section" className="hover:text-emerald-400 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#about-section" className="hover:text-emerald-400 transition-colors">
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#order-tracker-section" className="hover:text-emerald-400 transition-colors">
                Order Tracker Console
              </a>
            </li>
          </ul>
        </div>

        {/* Operations Contacts */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 text-sm tracking-wide">Contact Us</h5>
          <ul className="space-y-3 text-slate-400 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>No 12 Ogui Road, Enugu, Enugu State, Nigeria.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#0F8A5F]" />
              <span>+234 803 456 7890</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500" />
              <a href="mailto:support@mysolutionhub.com.ng" className="hover:text-emerald-400 transition-colors">
                support@mysolutionhub.com.ng
              </a>
            </li>
          </ul>
        </div>

        {/* Digital Gateway Security Badge */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 text-sm tracking-wide">Compliance & Safety</h5>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-900 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-bold">Verified Operator</span>
            </div>
            <p className="text-slate-500 text-[10px] leading-relaxed">
              Registrations and scratch cards checks adhere to JAMB, NIMC, FRSC, and CAC compliance schemas. Safe sandboxed payments secured by Paystack protocols.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
        <p>© {currentYear} MYSOLUTION HUB. All rights reserved. Fast • Reliable • Professional</p>
        <p className="flex items-center gap-1">
          <span>Engineered with care in Nigeria</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </p>
      </div>
    </footer>
  );
}
