import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Star } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  availability: number;
  availabilityLabel: string;
  benefits: string[];
  badge: string | null;
  color: string;
}

interface TicketTiersProps {
  tiers: Tier[];
  selectedTier: string | null;
  quantities: Record<string, number>;
  onSelectTier: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

function AvailabilityBar({ availability }: { availability: number }) {
  const color =
    availability < 0.2
      ? "#EF4444"
      : availability < 0.5
      ? "#F59E0B"
      : "#14B8A6";
  return (
    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${availability * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function TicketTiers({
  tiers,
  selectedTier,
  quantities,
  onSelectTier,
  onQuantityChange,
}: TicketTiersProps) {
  return (
    <section id="tickets">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Select Tickets
        </h2>
        <span
          className="text-sm text-white/40"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          All prices include service fee
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => {
          const isSelected = selectedTier === tier.id;
          const qty = quantities[tier.id] || 1;
          const isFeatured = tier.color === "featured";
          const isVip = tier.color === "vip";

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectTier(tier.id)}
              className="relative rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                background: isSelected
                  ? isFeatured
                    ? "linear-gradient(135deg, rgba(92,97,244,0.2) 0%, rgba(92,97,244,0.05) 100%)"
                    : isVip
                    ? "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.03) 100%)"
                    : "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? isFeatured
                    ? "1.5px solid rgba(92,97,244,0.6)"
                    : isVip
                    ? "1.5px solid rgba(245,158,11,0.5)"
                    : "1.5px solid rgba(255,255,255,0.2)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isSelected
                  ? isFeatured
                    ? "0 8px 32px rgba(92,97,244,0.2)"
                    : isVip
                    ? "0 8px 32px rgba(245,158,11,0.15)"
                    : "0 8px 24px rgba(0,0,0,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isFeatured
                      ? "linear-gradient(90deg, #5C61F4, #818CF8)"
                      : "linear-gradient(90deg, #F59E0B, #FBBF24)",
                    color: "white",
                  }}
                >
                  {isVip && <Crown size={10} className="inline mr-1" />}
                  {isFeatured && <Star size={10} className="inline mr-1" />}
                  {tier.badge}
                </div>
              )}

              <div className="p-7">
                {/* Tier name */}
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-semibold text-white text-base"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {tier.name}
                  </h3>
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: isFeatured ? "#5C61F4" : isVip ? "#F59E0B" : "#fff" }}
                    >
                      <Check size={11} color={isFeatured || isVip ? "white" : "#191E28"} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl font-black text-white"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      ${tier.price}
                    </span>
                    {tier.originalPrice && (
                      <span
                        className="text-lg text-white/30 line-through"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        ${tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs text-white/40 mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    per person
                  </p>
                </div>

                {/* Availability */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span
                      className="text-xs text-white/40"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Availability
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color:
                          tier.availability < 0.2
                            ? "#EF4444"
                            : tier.availability < 0.5
                            ? "#F59E0B"
                            : "#14B8A6",
                      }}
                    >
                      {tier.availability < 0.2 && (
                        <Zap size={10} className="inline mr-0.5" />
                      )}
                      {tier.availabilityLabel}
                    </span>
                  </div>
                  <AvailabilityBar availability={tier.availability} />
                </div>

                {/* Benefits */}
                <ul className="space-y-2.5 mb-6">
                  {tier.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-white/60"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: isFeatured
                            ? "rgba(92,97,244,0.2)"
                            : isVip
                            ? "rgba(245,158,11,0.2)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <Check
                          size={9}
                          strokeWidth={3}
                          color={
                            isFeatured
                              ? "#818CF8"
                              : isVip
                              ? "#FBBF24"
                              : "#9CA3AF"
                          }
                        />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Quantity selector (visible when selected) */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm text-white/60"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Quantity
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (qty > 1) onQuantityChange(tier.id, qty - 1);
                          }}
                          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/40 transition-colors text-lg leading-none"
                        >
                          −
                        </button>
                        <span
                          className="text-white font-semibold w-6 text-center"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {qty}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (qty < 10) onQuantityChange(tier.id, qty + 1);
                          }}
                          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/40 transition-colors text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span
                        className="text-sm text-white/40"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        ${(tier.price * qty).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
