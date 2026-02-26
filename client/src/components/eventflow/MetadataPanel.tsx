import React from "react";
import { Calendar, Clock, MapPin, Music, Users, Shield } from "lucide-react";

interface MetadataPanelProps {
  date: string;
  time: string;
  doorsOpen: string;
  venue: { name: string; address: string; city: string };
  genre: string[];
  artist: string;
  savedCount: number;
  description: string;
}

function MetaItem({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="flex items-start gap-4 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: "rgba(92,97,244,0.1)", border: "1px solid rgba(92,97,244,0.2)" }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-xs text-white/30 uppercase tracking-widest mb-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-sm font-medium text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {value}
        </p>
        {subValue && (
          <p
            className="text-xs text-white/40 mt-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MetadataPanel({
  date,
  time,
  doorsOpen,
  venue,
  genre,
  artist,
  savedCount,
  description,
}: MetadataPanelProps) {
  return (
    <div className="space-y-10">
      {/* About */}
      <section>
        <h2
          className="text-2xl font-bold text-white mb-5"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          About This Event
        </h2>
        <div className="space-y-4">
          {description.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Event Details */}
      <section>
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Event Details
        </h2>
        <div>
          <MetaItem
            icon={<Calendar size={17} color="#818CF8" />}
            label="Date"
            value={date}
          />
          <MetaItem
            icon={<Clock size={17} color="#818CF8" />}
            label="Time"
            value={time}
            subValue={`Doors open at ${doorsOpen}`}
          />
          <MetaItem
            icon={<MapPin size={17} color="#818CF8" />}
            label="Venue"
            value={venue.name}
            subValue={`${venue.address}, ${venue.city}`}
          />
          <MetaItem
            icon={<Music size={17} color="#818CF8" />}
            label="Artist"
            value={artist}
            subValue={genre.join(" · ")}
          />
          <MetaItem
            icon={<Users size={17} color="#818CF8" />}
            label="Interest"
            value={`${(savedCount / 1000).toFixed(1)}K people saved this`}
          />
          <div className="py-5">
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}
              >
                <Shield size={17} color="#14B8A6" />
              </div>
              <div>
                <p
                  className="text-xs text-white/30 uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Buyer Protection
                </p>
                <p
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  100% Guaranteed
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#14B8A6" }}
                >
                  Full refund if event is cancelled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
