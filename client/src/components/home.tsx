import { useState, useEffect } from "react";
import { eventData } from "@/data/eventData";
import HeroModule from "./eventflow/HeroModule";
import TicketTiers from "./eventflow/TicketTiers";
import StickyCTA from "./eventflow/StickyCTA";
import MetadataPanel from "./eventflow/MetadataPanel";
import VenueMap from "./eventflow/VenueMap";
import RelatedEvents from "./eventflow/RelatedEvents";
import ShareSave from "./eventflow/ShareSave";
import { Toaster } from "sonner";
import Navbar from "./eventflow/Navbar";

function Home() {
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      // Show sticky CTA after hero section
      setShowStickyCTA(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize quantities
  useEffect(() => {
    const newQuantities: Record<string, number> = {};
    eventData.ticketTiers.forEach((tier) => {
      newQuantities[tier.id] = 1;
    });
    setQuantities(newQuantities);
  }, []);

  const handleSelectTier = (id: string) => {
    setSelectedTier(id);
  };

  const handleQuantityChange = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleCheckout = () => {
    if (selectedTier) {
      alert(
        `Proceeding to checkout: ${quantities[selectedTier]} tickets for $${
          eventData.ticketTiers.find((t) => t.id === selectedTier)!.price *
          quantities[selectedTier]
        }`
      );
    }
  };

  const selectedTierData = eventData.ticketTiers.find(
    (t) => t.id === selectedTier
  );

  return (
    <>
      <Navbar />
      <main
        className="w-full pt-16"
        style={{ background: "#0F1419" }}
      >
        {/* Hero Module */}
        <HeroModule
          heroImage={eventData.heroImage}
          galleryImages={eventData.galleryImages}
          title={eventData.title}
          subtitle={eventData.subtitle}
          genre={eventData.genre}
          date={eventData.date}
          venue={eventData.venue}
          rating={eventData.rating}
          reviewCount={eventData.reviewCount}
          savedCount={eventData.savedCount}
          isSaved={isSaved}
          onToggleSave={() => setIsSaved(!isSaved)}
        />

        {/* Main content */}
        <div className="px-6 md:px-20 py-20">
          <div className="max-w-[1200px] mx-auto">
            {/* Share & Save Bar */}
            <div
              className="flex items-center justify-between mb-16 pb-10 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div>
                <h2
                  className="text-2xl font-bold text-white mb-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {eventData.artist}
                </h2>
                <p
                  className="text-sm text-white/50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {eventData.date} • {eventData.venue.city}
                </p>
              </div>
              <ShareSave
                isSaved={isSaved}
                onToggleSave={() => setIsSaved(!isSaved)}
                savedCount={eventData.savedCount}
                eventTitle={eventData.title}
              />
            </div>

            {/* Grid layout: Tickets + Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
              {/* Left: Tickets */}
              <div className="lg:col-span-2">
                <TicketTiers
                  tiers={eventData.ticketTiers}
                  selectedTier={selectedTier}
                  quantities={quantities}
                  onSelectTier={handleSelectTier}
                  onQuantityChange={handleQuantityChange}
                />
              </div>

              {/* Right: Metadata */}
              <div>
                <MetadataPanel
                  date={eventData.date}
                  time={eventData.time}
                  doorsOpen={eventData.doorsOpen}
                  venue={eventData.venue}
                  genre={eventData.genre}
                  artist={eventData.artist}
                  savedCount={eventData.savedCount}
                  description={eventData.description}
                />
              </div>
            </div>

            {/* Venue Map */}
            <div className="mb-20">
              <VenueMap venue={eventData.venue} />
            </div>

            {/* Related Events */}
            <RelatedEvents events={eventData.relatedEvents} />
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-20" />
      </main>

      {/* Sticky CTA */}
      <StickyCTA
        selectedTier={selectedTier}
        tierName={selectedTierData?.name || ""}
        price={selectedTierData?.price || 0}
        quantity={selectedTier ? quantities[selectedTier] : 1}
        visible={showStickyCTA}
        onCheckout={handleCheckout}
      />

      {/* Toast notifications */}
      <Toaster theme="dark" position="top-center" />
    </>
  );
}

export default Home;
