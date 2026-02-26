import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Ticket, ChevronRight } from "lucide-react";

interface StickyCTAProps {
  selectedTier: string | null;
  tierName: string;
  price: number;
  quantity: number;
  visible: boolean;
  onCheckout: () => void;
}

export default function StickyCTA({
  selectedTier,
  tierName,
  price,
  quantity,
  visible,
  onCheckout,
}: StickyCTAProps) {
  const total = price * quantity;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Backdrop blur */}
          <div
            className="border-t"
            style={{
              background: "rgba(25, 30, 40, 0.92)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="max-w-[1200px] mx-auto px-6 md:px-20 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Left: event summary */}
                <div className="hidden md:flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(92,97,244,0.15)", border: "1px solid rgba(92,97,244,0.3)" }}
                  >
                    <Ticket size={18} color="#818CF8" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {selectedTier ? tierName : "Neon Frequencies"}
                    </p>
                    <p
                      className="text-xs text-white/40"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedTier
                        ? `${quantity} × ${tierName}`
                        : "Select a ticket tier above"}
                    </p>
                  </div>
                </div>

                {/* Right: price + CTA */}
                <div className="flex items-center gap-4 ml-auto">
                  {selectedTier && (
                    <div className="text-right">
                      <p
                        className="text-2xl font-black text-white"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        ${total.toLocaleString()}
                      </p>
                      <p
                        className="text-xs text-white/40"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        incl. all fees
                      </p>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: selectedTier
                        ? "linear-gradient(135deg, #5C61F4 0%, #7C3AED 100%)"
                        : "rgba(255,255,255,0.1)",
                      border: selectedTier
                        ? "none"
                        : "1px solid rgba(255,255,255,0.15)",
                      boxShadow: selectedTier
                        ? "0 4px 24px rgba(92,97,244,0.4)"
                        : "none",
                      cursor: selectedTier ? "pointer" : "default",
                    }}
                  >
                    {selectedTier ? (
                      <>
                        <ShoppingCart size={16} />
                        Continue to Checkout
                        <ChevronRight size={16} />
                      </>
                    ) : (
                      "Select Tickets to Continue"
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
