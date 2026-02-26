import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface HeroProps {
  heroImage: string;
  galleryImages: string[];
  title: string;
  subtitle: string;
  genre: string[];
  date: string;
  venue: { name: string; city: string };
  rating: number;
  reviewCount: number;
  savedCount: number;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function HeroModule({
  heroImage,
  galleryImages,
  title,
  subtitle,
  genre,
  date,
  venue,
  rating,
  reviewCount,
  savedCount,
  isSaved,
  onToggleSave,
}: HeroProps) {
  const [activeGallery, setActiveGallery] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const allImages = [heroImage, ...galleryImages];

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeGallery}
            src={allImages[activeGallery]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191E28] via-[#191E28]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191E28]/60 via-transparent to-transparent" />

        {/* Gallery nav arrows */}
        <button
          onClick={() =>
            setActiveGallery((p) =>
              p === 0 ? allImages.length - 1 : p - 1
            )
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() =>
            setActiveGallery((p) => (p === allImages.length - 1 ? 0 : p + 1))
          }
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <ChevronRight size={18} />
        </button>

        {/* Expand button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <Expand size={15} />
        </button>

        {/* Gallery dots */}
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-2">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveGallery(i)}
              className={`transition-all rounded-full ${
                i === activeGallery
                  ? "w-6 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-20 pb-10">
          <div className="max-w-[1200px] mx-auto">
            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
                  style={{
                    background: "rgba(92, 97, 244, 0.2)",
                    border: "1px solid rgba(92, 97, 244, 0.4)",
                    color: "#a5b4fc",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-black text-white leading-none mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            <p
              className="text-lg text-white/70 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {subtitle}
            </p>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-5 text-sm text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {venue.name}, {venue.city}
              </span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-white font-medium">{rating}</span>
                <span className="text-white/40">({reviewCount.toLocaleString()} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={18} />
            </button>
            <motion.img
              src={allImages[activeGallery]}
              alt={title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGallery(i);
                  }}
                  className={`w-12 h-8 rounded overflow-hidden transition-all ${
                    i === activeGallery ? "ring-2 ring-[#5C61F4]" : "opacity-50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
