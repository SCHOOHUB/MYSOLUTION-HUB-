import React from "react";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  const phoneNumber = "2348034567890"; // Standard Nigerian WhatsApp contact placeholder
  const message = encodeURIComponent("Hello MYSOLUTION HUB, I need assistance with your services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      id="floating-whatsapp-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0F8A5F] hover:bg-[#0c734f] text-white p-4 rounded-full shadow-xl shadow-emerald-950/20 md:px-5 md:py-3 transition-colors duration-300"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <Phone className="w-6 h-6 fill-white stroke-none" />
      <span className="hidden md:inline font-medium text-sm">Chat on WhatsApp</span>
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
      </span>
    </motion.a>
  );
}
