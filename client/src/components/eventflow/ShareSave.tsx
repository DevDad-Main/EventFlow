import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, X, Link, Twitter, Facebook, Mail, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareSaveProps {
  isSaved: boolean;
  onToggleSave: () => void;
  savedCount: number;
  eventTitle: string;
}

export default function ShareSave({
  isSaved,
  onToggleSave,
  savedCount,
  eventTitle,
}: ShareSaveProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Save */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: isSaved ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)",
            border: isSaved ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.08)",
            color: isSaved ? "#F87171" : "rgba(255,255,255,0.5)",
          }}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart size={16} fill={isSaved ? "#F87171" : "none"} />
          </motion.div>
          <span className="hidden sm:inline">
            {isSaved ? "Saved" : "Save"}
          </span>
          <span className="text-xs text-white/30">
            {((savedCount + (isSaved ? 1 : 0)) / 1000).toFixed(1)}K
          </span>
        </motion.button>

        {/* Share */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">Share</span>
        </motion.button>
      </div>

      {/* Share modal */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShareOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-sm rounded-2xl p-6"
              style={{
                background: "#1E2433",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              }}
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3
                  className="font-bold text-white text-base"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Share Event
                </h3>
                <button
                  onClick={() => setShareOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>

              <p
                className="text-sm text-white/50 mb-5 truncate"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {eventTitle}
              </p>

              {/* Share options */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { icon: <Twitter size={18} />, label: "Twitter", color: "#1DA1F2" },
                  { icon: <Facebook size={18} />, label: "Facebook", color: "#1877F2" },
                  { icon: <Mail size={18} />, label: "Email", color: "#EA4335" },
                  {
                    icon: copied ? <Check size={18} /> : <Link size={18} />,
                    label: copied ? "Copied!" : "Copy",
                    color: "#14B8A6",
                    onClick: handleCopy,
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.onClick}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="text-xs text-white/40"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* URL input */}
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <input
                  readOnly
                  value={window.location.href}
                  className="flex-1 bg-transparent text-xs text-white/40 outline-none truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold px-3 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "rgba(92,97,244,0.2)",
                    color: "#a5b4fc",
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
