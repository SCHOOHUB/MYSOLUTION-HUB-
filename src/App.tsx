import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import ServiceDetailsModal from "./components/ServiceDetailsModal";
import OrderTracker from "./components/OrderTracker";
import StatsSection from "./components/StatsSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import { SERVICES, CATEGORIES, MOCK_ORDERS, FAQ_ITEMS } from "./data";
import { Service, ServiceCategory, Order } from "./types";
import { HelpCircle, ChevronRight, Sparkles, Filter, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [trackingQuery, setTrackingQuery] = useState("");

  // FAQ interactive state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Initialize and persist orders
  useEffect(() => {
    const saved = localStorage.getItem("mysolution_hub_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        setOrders(MOCK_ORDERS);
      }
    } else {
      setOrders(MOCK_ORDERS);
      localStorage.setItem("mysolution_hub_orders", JSON.stringify(MOCK_ORDERS));
    }
  }, []);

  const handleOrderSuccess = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("mysolution_hub_orders", JSON.stringify(updated));

    // Automatically feed order reference into tracker for direct user satisfaction!
    setTrackingQuery(newOrder.id);
    setTimeout(() => {
      const trackerEl = document.getElementById("order-tracker-section");
      if (trackerEl) {
        trackerEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  const triggerScrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleTriggerTracking = (orderId: string) => {
    setTrackingQuery(orderId);
    const el = document.getElementById("order-tracker-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsAppDirectly = () => {
    const phoneNumber = "2348034567890";
    const msg = encodeURIComponent("Hello MYSOLUTION HUB, I need assistance with your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  };

  // Filter logic
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#0F8A5F] selection:text-white">
      {/* 40px top-alert notice block (mimicking Moniepoint premium advisory layout) */}
      <div className="bg-[#0A192F] text-slate-350 text-[11px] py-2 px-4 border-b border-slate-900 overflow-hidden text-center flex justify-center items-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span>
          Payment lines fully optimized. Track existing transactions or verify result checker scratch cards immediately online.
        </span>
      </div>

      {/* Primary Navigation Hub header */}
      <Header
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        onTrackOrderClick={() => handleTriggerTracking("#WP20273")}
      />

      {/* Hero Visual Showcase */}
      <Hero
        onWhatsAppClick={openWhatsAppDirectly}
        onRequestServiceClick={triggerScrollToServices}
        onTrackSampleClick={() => handleTriggerTracking("#WP20273")}
      />

      {/* Main Service Catalog Marketplace Section */}
      <main id="services-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#0F8A5F] text-xs font-bold tracking-wider uppercase px-3 py-1 bg-emerald-100 rounded-full">
              Main Catalog
            </span>
            <h2 className="text-3xl font-black mt-3 text-slate-900 tracking-tight leading-none">
              Explore Available Services
            </h2>
            <p className="text-slate-550 text-sm mt-2 leading-relaxed">
              Select any documentation, academic entry, or legal card registration service to proceed to the secure checkout.
            </p>
          </div>

          {/* Quick search input indicator if main search is filled */}
          {searchQuery && (
            <div className="bg-emerald-50 text-[#0F8A5F] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-100 animate-fade-in self-start md:self-auto">
              <Sparkles className="w-4 h-4" />
              <span>
                Found {filteredServices.length} result(s) for "{searchQuery}"
              </span>
              <button
                type="button"
                className="font-bold underline ml-1 cursor-pointer"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Category Filters row - Horizontal Scrollable on Mobile */}
        <div className="flex items-center gap-2.5 pb-4 mb-8 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`flex-shrink-0 px-5 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === "all" ? "bg-[#0A192F] text-white border border-transparent shadow-md" : "bg-white hover:bg-slate-100 text-slate-650 border border-slate-200"}`}
          >
            All Services ({SERVICES.length})
          </button>
          
          {CATEGORIES.map((cat) => {
            const count = SERVICES.filter((s) => s.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex-shrink-0 px-5 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === cat.slug ? "bg-[#0A192F] text-white border border-transparent shadow-md" : "bg-white hover:bg-slate-100 text-slate-650 border border-slate-200"}`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Responsive Grid Layout */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onRequestClick={setSelectedService}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900">No matching services found</h4>
            <p className="text-slate-500 text-xs mt-1 px-4 leading-relaxed">
              We offer customizable registrations not listed. Click the floating WhatsApp support lines below to submit custom requisitions directly to our registry officers.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="bg-[#0A192F] text-white text-xs font-bold px-6 py-2.5 rounded-full mt-4 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Interactive central Order Tracker component */}
      <section className="py-16 md:py-24 bg-slate-100 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderTracker
            orders={orders}
            onSearchQuery={trackingQuery}
            onClearSearch={() => setTrackingQuery("")}
          />
        </div>
      </section>

      {/* High-Fidelity operations guidance and timeline layout */}
      <HowItWorks />

      {/* Statistics verification section */}
      <StatsSection />

      {/* Real client reviews slider show */}
      <Testimonials />

      {/* Interactive FAQs Accordion */}
      <section id="faq-section" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0F8A5F] text-xs font-bold tracking-wider uppercase px-3 py-1 bg-emerald-100 rounded-full">
              Common Knowledge
            </span>
            <h3 className="text-3xl font-black mt-4 text-slate-900 tracking-tight leading-none">
              Client Support Queries
            </h3>
            <p className="text-slate-500 text-sm mt-3">
              Review immediate parameters regarding physical shipping, dynamic registrations, and WAEC e-PIN clearance tokens.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-150 transition-all duration-300"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center bg-slate-50 hover:bg-slate-100/60 rounded-t-2xl focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm pr-4">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600 bg-white rounded-b-2xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating active support line */}
      <WhatsAppButton />

      {/* Professional moniepoint-like footer */}
      <Footer />

      {/* Premium Checkout details panel modal */}
      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
}
