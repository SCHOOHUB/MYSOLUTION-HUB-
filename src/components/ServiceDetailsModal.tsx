import React, { useState } from "react";
import { Service, Order } from "../types";
import { X, CreditCard, Landmark, PhoneCall, ShieldCheck, RefreshCw, CheckCircle, ArrowRight, Wallet, MapPin, Printer, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceDetailsModalProps {
  service: Service | null;
  onClose: () => void;
  onOrderSuccess: (newOrder: Order) => void;
}

type CheckoutStep = "details" | "payment" | "processing" | "success";
type PaymentMethodType = "Paystack" | "Bank Transfer" | "USSD";

export default function ServiceDetailsModal({ service, onClose, onOrderSuccess }: ServiceDetailsModalProps) {
  if (!service) return null;

  const [step, setStep] = useState<CheckoutStep>("details");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("Paystack");
  const [processingMsg, setProcessingMsg] = useState("");
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);
  const [bankCopied, setBankCopied] = useState(false);

  // Card input states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Email/contact states (Default values from standard logged in user or placeholder)
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const validateDetailsStep = () => {
    if (!clientName.trim()) return "Please enter your full name.";
    if (!clientEmail.trim() || !clientEmail.includes("@")) return "Please enter a valid email address.";
    if (!clientPhone.trim()) return "Please enter your phone number.";

    for (const field of service.fields) {
      if (field.required && !formData[field.name]?.trim()) {
        return `Please fill out the "${field.label}" field.`;
      }
    }
    return "";
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateDetailsStep();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError("");
    setStep("payment");
  };

  const triggerPaymentSimulation = () => {
    setStep("processing");
    const stepsText = [
      "Securing gateway token connection...",
      "Resolving inter-bank authorization channels...",
      "Configuring biometric digital certificates...",
      "Generating official reference and secure e-PINs...",
    ];

    let currentIdx = 0;
    setProcessingMsg(stepsText[0]);

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < stepsText.length) {
        setProcessingMsg(stepsText[currentIdx]);
      } else {
        clearInterval(interval);
        finalizeOrder();
      }
    }, 1200);
  };

  const generateMockCredentials = () => {
    // Generates a mock pin and serial
    if (service.id === "purchase-pin") {
      const pinSegments = [
        Math.floor(1000 + Math.random() * 9000),
        Math.floor(1000 + Math.random() * 9000),
        Math.floor(1000 + Math.random() * 9000),
        Math.floor(1000 + Math.random() * 9000),
      ];
      const serialRand = Math.floor(100000000 + Math.random() * 900000000);
      const prefix = formData.cardType?.includes("WAEC") ? "WRN" : formData.cardType?.includes("NECO") ? "NCN" : "NAB";
      return {
        pin: pinSegments.join("-"),
        serial: `${prefix}2026${serialRand}`,
        note: `Instant PIN retrieved successfully for ${formData.cardType || "Exams"}. Valid for 5 portal submissions.`,
      };
    }
    return {
      note: `We have received your payment check for ₦${service.priceRaw.toLocaleString()}. Our professional agents are processing your registration. Processing estimated time: ${service.estimatedTime}.`,
    };
  };

  const finalizeOrder = () => {
    const generatedId = `#${service.id === "purchase-pin" ? "WP" : service.category.substring(0, 3).toUpperCase()}${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: generatedId,
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      userName: clientName,
      userEmail: clientEmail,
      userPhone: clientPhone,
      status: "completed", // Automatic completion on PINs, or processing on long items
      orderDate: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      amount: service.priceRaw,
      paymentMethod: paymentMethod === "Paystack" ? "Card" : paymentMethod === "Bank Transfer" ? "Bank Transfer" : "USSD",
      paymentStatus: "paid",
      details: {
        ...formData,
      },
      generatedData: generateMockCredentials(),
    };

    // If it's something complex like CAC or Passport, mark as processing on state load
    if (service.id !== "purchase-pin" && service.id !== "airtime-top" && service.id !== "data-sub") {
      newOrder.status = "processing";
    }

    setGeneratedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep("success");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Sheet container */}
        <motion.div
          id="checkout-modal-container"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-slate-900 border border-slate-850 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-slate-100"
        >
          {/* Header */}
          <div className="bg-[#0A192F] p-5 flex justify-between items-center border-b border-slate-800">
            <div>
              <span className="text-[#0F8A5F] text-xs font-semibold uppercase tracking-wider block">
                {service.category.toUpperCase()} MARKETPLACE
              </span>
              <h3 className="text-lg md:text-xl font-bold tracking-tight mt-0.5">{service.name}</h3>
            </div>
            <button
              type="button"
              id="checkout-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress bar */}
          <div className="bg-slate-950 py-3 px-6 flex items-center justify-between text-xs border-b border-slate-900 font-mono text-slate-400">
            <span className={step === "details" ? "text-[#0F8A5F] font-bold" : "text-slate-500"}>1. Required Details</span>
            <span className="text-slate-700">➔</span>
            <span className={step === "payment" ? "text-[#0F8A5F] font-bold" : "text-slate-500"}>2. Gateway Sandbox</span>
            <span className="text-slate-700">➔</span>
            <span className={step === "processing" ? "text-[#0F8A5F] font-bold" : "text-slate-500"}>3. Verification</span>
            <span className="text-slate-700">➔</span>
            <span className={step === "success" ? "text-[#0F8A5F] font-bold" : "text-slate-400"}>4. Complete Receipts</span>
          </div>

          {/* Scrollable scrollbody */}
          <div className="overflow-y-auto p-6 flex-1 space-y-6">
            {step === "details" && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-slate-400">REGISTRATION VALUE</span>
                    <h4 className="text-2xl font-bold text-emerald-400 font-mono mt-1">₦{service.priceRaw.toLocaleString()}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">ESTIMATED SLA TIME</span>
                    <p className="text-sm font-semibold text-slate-200 mt-1">{service.estimatedTime}</p>
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 bg-rose-500/10 text-rose-300 rounded-xl flex items-center gap-2 text-xs border border-rose-500/20">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Primary Contact Details */}
                <h4 className="text-xs text-[#0F8A5F] font-bold tracking-wider uppercase border-b border-slate-850 pb-2">
                  Client Identification
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm"
                      placeholder="e.g. Samuel Yusuf"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Active Email Address *</label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm"
                      placeholder="e.g., samuel@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Active Telephone (NIN verification) *</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm"
                      placeholder="e.g., 08035511221"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Dynamic fields from Service item */}
                <h4 className="text-xs text-[#0F8A5F] font-bold tracking-wider uppercase border-b border-slate-850 pb-2 pt-2">
                  Service Custom Inputs
                </h4>

                <div className="space-y-4">
                  {service.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {field.label} {field.required && "*"}
                      </label>

                      {field.type === "select" ? (
                        <select
                          className="w-full bg-slate-950 text-slate-100 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="">-- Select option --</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm"
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm"
                          placeholder={field.placeholder}
                          id={`input-field-${field.name}`}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#0F8A5F] hover:bg-[#0c734f] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/10 cursor-pointer"
                  >
                    <span>Proceed to Secure Gateway</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold">Secure Marketplace checkout</h4>
                  <p className="text-xs text-slate-400 mt-1">Payment processed in 256-bit sandbox environment. Supported by Paystack.</p>
                </div>

                <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-850">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Paystack")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${paymentMethod === "Paystack" ? "bg-slate-900 border border-slate-800 text-emerald-400" : "text-slate-400"}`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Paystack Sandboxed Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Bank Transfer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${paymentMethod === "Bank Transfer" ? "bg-slate-900 border border-slate-800 text-emerald-400" : "text-slate-400"}`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Instant Bank Transfer</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === "Paystack" ? (
                    <motion.div
                      id="simulated-paystack-form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <span className="text-[#00c3a6] font-bold text-xs tracking-wider uppercase flex items-center gap-1.5">
                          <Wallet className="w-4 h-4" /> PAYSTACK SANDBOX
                        </span>
                        <span className="bg-slate-850 px-2 py-0.5 rounded text-[10px] text-slate-400 uppercase font-mono">Test Cards Accepted</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Debit Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim())}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Validity Period</label>
                            <input
                              type="text"
                              maxLength={5}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-center text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Secure CVV Code</label>
                            <input
                              type="password"
                              maxLength={3}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-center text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-center">
                        <p className="text-[10px] text-slate-500">
                          Click Payment authorized below. Zero real funds will be processed.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <span className="text-emerald-400 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5">
                          <Landmark className="w-4 h-4" /> BANK TRANSFER DETAILS
                        </span>
                        <span className="bg-[#0F8A5F]/10 px-2 py-0.5 rounded text-[10px] text-slate-400 uppercase font-mono text-emerald-400">Zenith Bank Plc</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-slate-850/40 pb-2">
                          <span className="text-slate-500">BANK BRAND:</span>
                          <span className="text-slate-200">Zenith Bank Plc</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-850/40 pb-2">
                          <span className="text-slate-500">ACCOUNT NAME:</span>
                          <span className="text-slate-200 font-semibold">MYSOLUTION INTEGRATED SYSTEM</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                          <span className="text-slate-500">ACCOUNT NUMBER:</span>
                          <span className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                            <span>1012938482</span>
                            <button
                              type="button"
                              id="copy-account-btn"
                              onClick={() => {
                                navigator.clipboard.writeText("1012938482");
                                setBankCopied(true);
                                setTimeout(() => setBankCopied(false), 3000);
                              }}
                              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 bg-slate-900 border border-slate-800"
                              title="Copy account reference"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              {bankCopied && (
                                <span className="text-[10px] text-emerald-400 font-mono animate-pulse font-normal">
                                  Copied!
                                </span>
                              )}
                            </button>
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed text-left">
                        Our centralized payment webhook automatically scans Nigerian inter-bank transactions. Complete the local money transfer using your banking application, then click the validation command below.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="border border-slate-800 hover:bg-slate-850 text-slate-300 px-6 py-3 rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Back to Form
                  </button>
                  <button
                    type="button"
                    id="trigger-sandbox-payment-btn"
                    onClick={triggerPaymentSimulation}
                    className="flex-1 bg-[#0F8A5F] hover:bg-[#0c734f] text-white py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center shadow-lg shadow-emerald-950/20"
                  >
                    Authorize Payment (₦{service.priceRaw.toLocaleString()})
                  </button>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="h-64 flex flex-col items-center justify-center space-y-6 text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-[#0F8A5F] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#0F8A5F]/75" />
                  </div>
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-bold text-slate-100">Verifying checkouts</h4>
                  <p className="text-xs text-[#0F8A5F] font-mono animate-pulse">{processingMsg}</p>
                </div>
              </div>
            )}

            {step === "success" && generatedOrder && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-100">Transaction Authorized!</h4>
                  <p className="text-xs text-slate-400 mt-1">Receipt reference generated successfully by MYSOLUTION HUB servers.</p>
                </div>

                {/* Simulated Invoice Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div className="flex justify-between border-b border-slate-850/55 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">ORDER ID</span>
                      <h5 className="font-bold font-mono text-emerald-450 tracking-wide text-sm">{generatedOrder.id}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">SLA DELIVERY TIME</span>
                      <span className="text-slate-300 font-semibold text-xs">{service.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 border-b border-slate-850/40 pb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service:</span>
                      <span className="text-slate-300 font-medium text-right">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Client:</span>
                      <span className="text-slate-300">{clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment:</span>
                      <span className="text-slate-300 font-mono text-[10px] uppercase">{generatedOrder.paymentMethod} • PAID</span>
                    </div>
                  </div>

                  {/* Generated Code if Applicable (WAEC result PIN check!!!) */}
                  {generatedOrder.generatedData?.pin ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                      <span className="text-[10px] text-emerald-400 font-mono tracking-wider block mb-1 uppercase font-semibold">Generated Credentials</span>
                      <p className="text-base font-extrabold text-slate-200 font-mono tracking-widest">{generatedOrder.generatedData.pin}</p>
                      {generatedOrder.generatedData.serial && (
                        <p className="text-xs text-slate-400 font-mono mt-1">Serial Code: {generatedOrder.generatedData.serial}</p>
                      )}
                      <p className="text-[10px] text-slate-500 mt-2">Valid for WAEC examination result checking portal services.</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-xs text-slate-400 leading-relaxed text-left">
                      📋 {generatedOrder.generatedData?.note || "Document queued successfully. Processing started on the registry servers."}
                    </div>
                  )}

                  <div className="bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs p-3 rounded-xl">
                    💡 You can copy your Transaction Reference <span className="font-mono text-emerald-400 font-bold">{generatedOrder.id}</span> to monitor its dispatch schedule on the homepage Order Tracker console anytime.
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#0F8A5F] hover:bg-[#0c734f] text-white px-10 py-3 rounded-2xl font-bold text-sm tracking-wide cursor-pointer"
                  >
                    Return to Hub
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
