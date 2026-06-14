import React, { useState } from "react";
import { Search, Clock, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Printer } from "lucide-react";
import { Order } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface OrderTrackerProps {
  orders: Order[];
  onSearchQuery?: string;
  onClearSearch?: () => void;
}

export default function OrderTracker({ orders, onSearchQuery = "", onClearSearch }: OrderTrackerProps) {
  const [searchId, setSearchId] = useState(onSearchQuery);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (onSearchQuery) {
      setSearchId(onSearchQuery);
      handleTrack(onSearchQuery);
    }
  }, [onSearchQuery]);

  const handleTrack = (idToSearch: string) => {
    const cleanId = idToSearch.trim();
    if (!cleanId) {
      setErrorMsg("Please enter a valid Order ID.");
      setActiveOrder(null);
      return;
    }

    const found = orders.find(
      (o) => o.id.toLowerCase() === cleanId.toLowerCase() || o.id.toLowerCase() === `#${cleanId.toLowerCase()}`
    );

    if (found) {
      setActiveOrder(found);
      setErrorMsg("");
    } else {
      setActiveOrder(null);
      setErrorMsg(`No active order found with Reference ID "${cleanId}". Make sure it starts with #.`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status badge style helper
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "processing":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "pending":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      default:
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    }
  };

  return (
    <div id="order-tracker-section" className="bg-[#0A192F] text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto text-center mb-8">
        <span className="text-[#0F8A5F] text-xs font-semibold tracking-wider uppercase px-3 py-1 bg-emerald-500/10 rounded-full">
          Secure Portal Tracker
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-3 text-slate-100">
          Track Your Service Request
        </h3>
        <p className="text-slate-400 text-sm mt-2">
          Enter your Order ID (e.g. <span className="text-emerald-400 font-mono">#WP20273</span>) to check progress and retrieve code credentials instantly.
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrack(searchId);
          }}
          className="relative flex items-center bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 focus-within:border-emerald-500/50 shadow-inner"
        >
          <div className="pl-3 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="tracker-input-field"
            type="text"
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 px-3 py-2.5 focus:outline-none text-base font-mono"
            placeholder="Type ID #WP20273..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            id="tracker-submit-btn"
            type="submit"
            className="bg-[#0F8A5F] hover:bg-[#0c734f] text-white px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-rose-500/10 text-rose-300 rounded-xl flex items-center gap-2 text-xs border border-rose-500/20"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeOrder ? (
          <motion.div
            id="order-receipt-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-2xl relative"
          >
            {/* Header Receipt Style */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-5 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-500 font-mono">ORDER ID</span>
                <h4 className="text-xl font-extrabold text-emerald-400 font-mono tracking-wide">{activeOrder.id}</h4>
                <p className="text-xs text-slate-400 mt-1">Submitted on {activeOrder.orderDate}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500">STATUS</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase mt-1 ${getStatusBadge(activeOrder.status)}`}>
                  {activeOrder.status}
                </span>
              </div>
            </div>

            {/* Service & Client Specs */}
            <div className="py-5 space-y-4 text-sm border-b border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">SERVICE TYPE</span>
                  <span className="text-slate-200 font-medium">{activeOrder.serviceName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">TOTAL VALUATION</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    ₦{activeOrder.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">CLIENT NAME</span>
                  <span className="text-slate-200">{activeOrder.userName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">PHONE NUMBER</span>
                  <span className="text-slate-300 font-mono">{activeOrder.userPhone}</span>
                </div>
              </div>

              {/* Dynamic form inputs submitted */}
              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                <span className="text-xs text-slate-500 block mb-2 font-semibold uppercase tracking-wider">Submitted Form Details</span>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {Object.entries(activeOrder.details).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-4 border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500">{key.replace(/([A-Z])/g, " $1")}:</span>
                      <span className="text-slate-300 font-medium text-right break-words max-w-[240px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PIN Code / Delivery Box (Fintech Style) */}
            <div className="pt-5 space-y-4">
              {activeOrder.status === "completed" && activeOrder.generatedData?.pin ? (
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 py-1 px-3 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase rounded-bl-xl tracking-wider">
                    Official PIN
                  </div>
                  <span className="text-xs text-emerald-400/80 font-bold tracking-wider block mb-2 uppercase">
                    {activeOrder.details.cardType || "Online Result Checker PIN"}
                  </span>

                  <div className="bg-slate-950 px-4 py-3 rounded-xl border border-emerald-500/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="text-left w-full sm:w-auto">
                      <span className="text-[10px] text-slate-500 block font-mono">PIN VALUE / TOKEN</span>
                      <span className="text-lg font-bold text-slate-200 font-mono tracking-wider">
                        {activeOrder.generatedData.pin}
                      </span>
                    </div>
                    {activeOrder.generatedData.serial && (
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[10px] text-slate-500 block font-mono">SERIAL NO.</span>
                        <span className="text-sm font-semibold text-slate-300 font-mono">
                          {activeOrder.generatedData.serial}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${activeOrder.generatedData?.pin} (Serial: ${activeOrder.generatedData?.serial})`)}
                      className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg hover:bg-emerald-500/20 border border-emerald-500/20 cursor-pointer self-end sm:self-center"
                      title="Copy credentials"
                    >
                      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>

                  {activeOrder.generatedData.note && (
                    <p className="text-xs text-slate-400 mt-3 text-left leading-relaxed">
                      {activeOrder.generatedData.note}
                    </p>
                  )}
                </div>
              ) : activeOrder.status === "processing" ? (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                  <div className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h5 className="font-bold text-amber-400 text-sm">Processing in Mainframe</h5>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {activeOrder.generatedData?.note || "Your data details are currently being loaded into the central registry database. Updates will reflect shortly."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/40 rounded-2xl p-4 text-xs text-slate-400 leading-relaxed">
                  {activeOrder.generatedData?.note || "This documentation process is currently in queue. Our registry officer will finalize submission details within the estimated time SLA."}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-4 text-xs pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                {activeOrder.generatedData?.deliveredFile && (
                  <a
                    href={activeOrder.generatedData.deliveredFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-md mx-auto text-center py-6 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <p className="text-slate-500 text-sm">No transaction selected yet.</p>
            <p className="text-slate-600 text-xs mt-1">Hint: Type <span className="text-slate-500 font-mono font-bold">#WP20273</span> to see standard WAEC pin result clearances.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
