import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface RelatedEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: number;
  image: string;
  genre: string;
}

interface RelatedEventsProps {
  events: RelatedEvent[];
}

export default function RelatedEvents({ events }: RelatedEventsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          You May Also Like
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-64 cursor-pointer group rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191E28]/80 to-transparent" />
              <span
                className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "rgba(92,97,244,0.2)",
                  border: "1px solid rgba(92,97,244,0.35)",
                  color: "#a5b4fc",
                }}
              >
                {event.genre}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3
                className="font-semibold text-white text-sm mb-1 truncate"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {event.title}
              </h3>
              <p
                className="text-xs text-white/40 mb-0.5 truncate"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {event.date}
              </p>
              <p
                className="text-xs text-white/30 mb-3 truncate"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {event.venue}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-black text-white"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  ${event.price}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{
                    background: "rgba(92,97,244,0.15)",
                    border: "1px solid rgba(92,97,244,0.3)",
                  }}
                >
                  <ArrowRight size={13} color="#818CF8" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
