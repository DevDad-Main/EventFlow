import { useState } from "react";
import { Search, Calendar, MapPin, ArrowRight, Sparkles, Users, Ticket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../eventflow/Navbar";
import { motion } from "framer-motion";

const featuredEvents = [
  {
    id: "1",
    title: "Summer Music Festival",
    artist: "Various Artists",
    date: "Aug 15, 2026",
    venue: "Central Park, NYC",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    category: "Music"
  },
  {
    id: "2",
    title: "Comedy Night Live",
    artist: "John Mulaney",
    date: "Mar 22, 2026",
    venue: "Comedy Cellar, NYC",
    price: 45,
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800&h=600&fit=crop",
    category: "Comedy"
  },
  {
    id: "3",
    title: "Tech Summit 2026",
    artist: "Industry Leaders",
    date: "Apr 5, 2026",
    venue: "Moscone Center, SF",
    price: 299,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "Conference"
  },
  {
    id: "4",
    title: "Jazz Evening",
    artist: "The Blue Note Trio",
    date: "May 10, 2026",
    venue: "Hollywood Bowl, LA",
    price: 75,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop",
    category: "Music"
  }
];

const categories = [
  { name: "All Events", icon: Sparkles },
  { name: "Concerts", icon: Ticket },
  { name: "Comedy", icon: Users },
  { name: "Sports", icon: TrendingUp },
];

const stats = [
  { value: "50K+", label: "Live Events" },
  { value: "2M+", label: "Happy Users" },
  { value: "150+", label: "Cities" },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");

  return (
    <>
      <Navbar />
      <div style={{ background: "#0A0C10", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-5 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="relative max-w-[1200px] mx-auto">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(99, 102, 241, 0.15)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                <Sparkles size={14} style={{ color: "#A5B4FC" }} />
                <span className="text-sm font-medium" style={{ color: "#C7D2FE", fontFamily: "'Outfit', sans-serif" }}>
                  Over 50,000 events available now
                </span>
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em" }}>
                Find Your Next
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)" }}>
                  Unforgettable
                </span>{" "}
                Experience
              </h1>
              <p className="text-lg text-white/50 max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Discover concerts, comedy shows, sports, and more happening near you.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div 
                className="rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2"
                style={{ 
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
                  <Search size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input 
                    type="text"
                    placeholder="Search events, artists, venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-base"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
                <button
                  className="w-full md:w-auto px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  }}
                >
                  Search Events
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-12 md:gap-20"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
                  <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-5">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: activeCategory === cat.name 
                      ? "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" 
                      : "rgba(255,255,255,0.03)",
                    color: activeCategory === cat.name ? "white" : "rgba(255,255,255,0.45)",
                    border: activeCategory === cat.name ? "none" : "1px solid rgba(255,255,255,0.06)"
                  }}
                >
                  <cat.icon size={16} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-8 px-5 pb-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
                Trending This Week
              </h2>
              <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                View All Events
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={`/event/${event.id}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                    style={{ 
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-md" 
                          style={{ 
                            background: "rgba(0,0,0,0.5)",
                            color: "white",
                            fontFamily: "'Outfit', sans-serif"
                          }}
                        >
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white/70 text-xs font-medium flex items-center gap-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          <Calendar size={12} /> {event.date}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-1 truncate group-hover:text-purple-300 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {event.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-3 truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {event.artist}
                      </p>
                      <div className="flex items-center gap-1 text-white/30 text-xs mb-4">
                        <MapPin size={12} />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          ${event.price}
                        </span>
                        <span className="text-xs font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Get Tickets →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-5">
          <div className="max-w-[1200px] mx-auto">
            <div 
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
                  Never Miss a Moment
                </h2>
                <p className="text-white/50 max-w-lg mx-auto mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Create an account to save events, track your favorites, and get exclusive access to presales.
                </p>
                <button
                  className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  }}
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-5 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                  <Ticket size={18} color="white" />
                </div>
                <span className="font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  EventFlow
                </span>
              </div>
              <p className="text-white/30 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                © 2026 EventFlow. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
