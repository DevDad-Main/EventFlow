import Navbar from "../eventflow/Navbar";

const venues = [
  {
    id: "1",
    name: "Central Park",
    address: "Central Park, New York, NY",
    city: "New York",
    events: 156,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop"
  },
  {
    id: "2",
    name: "Comedy Cellar",
    address: "MacDougal St, New York, NY",
    city: "New York",
    events: 89,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop"
  },
  {
    id: "3",
    name: "Moscone Center",
    address: "747 Howard St, San Francisco, CA",
    city: "San Francisco",
    events: 42,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
  },
  {
    id: "4",
    name: "Hollywood Bowl",
    address: "2301 N Highland Ave, Los Angeles, CA",
    city: "Los Angeles",
    events: 78,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop"
  }
];

export default function VenuesPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#0F1419", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Venues
          </h1>
          <p className="text-white/50 mb-8">Find events at venues near you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.id}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}
              >
                <div className="h-48 relative">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ 
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))"
                    }}
                  >
                    <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {venue.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white/50 text-sm mb-3">{venue.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-sm">{venue.events} events</span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: "linear-gradient(135deg, #5C61F4, #7C3AED)"
                      }}
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Explore All Venues
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1svenues!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
