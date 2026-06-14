import React, { useState } from "react";
import { Menu, X, Search, FileSearch, ShieldCheck, HelpCircle } from "lucide-react";
import { ServiceCategory } from "../types";
import { CATEGORIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  activeCategory: ServiceCategory | "all";
  onCategorySelect: (category: ServiceCategory | "all") => void;
  onTrackOrderClick: () => void;
}

export default function Header({
  onSearchChange,
  searchQuery,
  activeCategory,
  onCategorySelect,
  onTrackOrderClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleMobileNavClick = (catSlug: ServiceCategory | "all") => {
    onCategorySelect(catSlug);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand details */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#0F8A5F] flex items-center justify-center font-extrabold text-white shadow-lg shadow-emerald-900/30">
            <span className="text-xl font-display tracking-tighter">M</span>
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-150 tracking-tight font-display block leading-none">MYSOLUTION HUB</span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-widest font-mono uppercase mt-0.5 block">
              Automated • Nigeria
            </span>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <button
            onClick={() => handleMobileNavClick("all")}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${activeCategory === "all" ? "text-emerald-400" : ""}`}
          >
            All Services
          </button>
          <a href="#how-it-works-section" className="hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <button
            onClick={onTrackOrderClick}
            className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FileSearch className="w-4 h-4 text-emerald-400" />
            <span>Track Order</span>
          </button>
          <a href="#about-section" className="hover:text-emerald-400 transition-colors">
            Why Us
          </a>
          <a href="#testimonials-section" className="hover:text-emerald-400 transition-colors">
            Reviews
          </a>
          <a href="#faq-section" className="hover:text-emerald-400 transition-colors text-slate-300">
            Clearance FAQ
          </a>
        </nav>

        {/* Desktop Search & Request triggers */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              id="header-search-bar"
              className="w-56 lg:w-64 bg-slate-900/60 hover:bg-slate-900 focus:bg-slate-900 text-slate-200 text-xs rounded-full pl-9 pr-4 py-2.5 border border-slate-800/80 focus:outline-none focus:border-emerald-500/80 transition-all font-sans"
              placeholder="Search JAMB, CAC, WAEC PIN..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <a
            href="#services-section"
            className="bg-[#0F8A5F] hover:bg-[#12a16f] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-950/25"
          >
            Request Service
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            id="mobile-search-toggle"
            onClick={() => setShowSearchBox(!showSearchBox)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive search box */}
      <AnimatePresence>
        {showSearchBox && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-slate-950 border-t border-slate-900 px-4 py-3 flex md:hidden overflow-hidden"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                id="mobile-search-input"
                type="text"
                className="w-full bg-slate-900 text-slate-100 rounded-xl pl-9 pr-4 py-2 border border-slate-800 text-xs focus:outline-none focus:border-emerald-500 font-sans"
                placeholder="Search services (e.g. WAEC, NIN, Passport...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 z-30 lg:hidden bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-slate-950 border-b border-slate-850 px-6 py-8 space-y-6 flex flex-col max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-4 text-sm font-semibold text-slate-300">
                <button
                  type="button"
                  onClick={() => handleMobileNavClick("all")}
                  className={`text-left hover:text-white py-1 transition-colors cursor-pointer ${activeCategory === "all" ? "text-emerald-400 pl-2 border-l-2 border-emerald-500" : ""}`}
                >
                  All Hub Services
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTrackOrderClick();
                  }}
                  className="text-left py-1 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FileSearch className="w-4 h-4 text-emerald-400" />
                  <span>Track Active Requests (#WP...)</span>
                </button>

                <a
                  href="#how-it-works-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white py-1 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#about-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white py-1 transition-colors"
                >
                  Why Solutions Hub
                </a>
                <a
                  href="#testimonials-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white py-1 transition-colors"
                >
                  Client Reviews
                </a>
                <a
                  href="#faq-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white py-1 transition-colors"
                >
                  System FAQ
                </a>
              </div>

              {/* Categorization Shortcuts within Drawer */}
              <div className="space-y-2 border-t border-slate-900 pt-5">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Filter Category</span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-medium">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => handleMobileNavClick(cat.slug)}
                      className={`text-left p-2 rounded-xl transition-all hover:bg-slate-900 cursor-pointer ${activeCategory === cat.slug ? "bg-slate-900 border border-slate-800/80 text-emerald-400" : ""}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
