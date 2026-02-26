import React from "react";
import { MapPin, Navigation, Bus, Car, ExternalLink } from "lucide-react";

interface VenueMapProps {
  venue: {
    name: string;
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
}

export default function VenueMap({ venue }: VenueMapProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name} ${venue.address} ${venue.city}`
  )}`;

  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    `${venue.name} ${venue.address} ${venue.city}`
  )}`;

  // Use a static map image from Unsplash as placeholder for the map
  const mapPlaceholder =
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=70";

  return (
    <section>
      <h2
        className="text-2xl font-bold text-white mb-6"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
      >
        Venue
      </h2>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Map image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={mapPlaceholder}
            alt="Map"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7) brightness(0.6)" }}
          />
          {/* Frosted glass overlay with pin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex flex-col items-center gap-1"
              style={{ backdropFilter: "blur(0px)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #5C61F4, #7C3AED)",
                  boxShadow: "0 0 0 4px rgba(92,97,244,0.3)",
                }}
              >
                <MapPin size={20} color="white" fill="white" />
              </div>
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white text-center max-w-[180px]"
                style={{
                  background: "rgba(25,30,40,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {venue.name}
              </div>
            </div>
          </div>
          {/* Open full map overlay */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
          />
        </div>

        {/* Venue info + directions */}
        <div
          className="p-5"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3
                className="font-semibold text-white text-base mb-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {venue.name}
              </h3>
              <p
                className="text-sm text-white/50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {venue.address}, {venue.city}
              </p>
            </div>
          </div>

          {/* Transit info */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Bus size={13} />, label: "Metro Line E – Jefferson/USC" },
              { icon: <Car size={13} />, label: "Parking on Jefferson Blvd" },
            ].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-white/50"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>

          {/* Direction buttons */}
          <div className="flex gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(92,97,244,0.15)",
                border: "1px solid rgba(92,97,244,0.3)",
                color: "#a5b4fc",
              }}
            >
              <Navigation size={14} />
              Google Maps
              <ExternalLink size={11} />
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <Navigation size={14} />
              Apple Maps
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
