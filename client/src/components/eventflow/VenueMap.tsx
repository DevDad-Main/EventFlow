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
        {/* Google Maps Embed */}
        <div className="relative h-64 overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d193595.15830869428!2d${venue.lng || -74.006}!3d${venue.lat || 40.7128}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${encodeURIComponent(venue.name)}!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Click to open overlay */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{
                background: "rgba(25,30,40,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <ExternalLink size={14} />
              Open in Google Maps
            </div>
          </a>
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
