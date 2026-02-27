import { useState } from "react";
import { Ticket, Calendar, MapPin, Clock, Download, RefreshCw, ChevronRight, User, Wallet } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "../eventflow/Navbar";
import { motion } from "framer-motion";

const mockTickets = [
  {
    id: "TKT-001",
    eventId: "1",
    eventName: "Summer Music Festival 2026",
    artist: "Various Artists",
    date: "Aug 15, 2026",
    time: "7:00 PM",
    venue: "Central Park, NYC",
    tier: "VIP",
    quantity: 2,
    totalPrice: 298,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop"
  },
  {
    id: "TKT-002",
    eventId: "2",
    eventName: "Comedy Night Live",
    artist: "John Mulaney",
    date: "Mar 22, 2026",
    time: "9:00 PM",
    venue: "Comedy Cellar, NYC",
    tier: "General",
    quantity: 2,
    totalPrice: 90,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=400&h=200&fit=crop"
  }
];

const mockOrders = [
  {
    id: "ORD-2026-001",
    date: "Feb 20, 2026",
    items: 2,
    total: 298,
    status: "completed"
  },
  {
    id: "ORD-2026-002",
    date: "Feb 15, 2026",
    items: 2,
    total: 90,
    status: "completed"
  },
  {
    id: "ORD-2026-003",
    date: "Jan 10, 2026",
    items: 4,
    total: 450,
    status: "completed"
  }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"tickets" | "orders">("tickets");

  return (
    <>
      <Navbar />
      <div style={{ background: "#0A0C10", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="max-w-[1200px] mx-auto px-5 py-12">
          <SignedIn>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
                My Dashboard
              </h1>
              <p className="text-white/40" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Manage your tickets and view order history
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Ticket, label: "Upcoming Events", value: mockTickets.length, color: "#6366F1" },
                { icon: Calendar, label: "Total Tickets", value: mockTickets.reduce((acc, t) => acc + t.quantity, 0), color: "#8B5CF6" },
                { icon: Wallet, label: "Total Spent", value: `$${mockOrders.reduce((acc, o) => acc + o.total, 0)}`, color: "#10B981" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{ 
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <span className="text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: "tickets", label: "My Tickets" },
                { key: "orders", label: "Order History" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as "tickets" | "orders")}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: activeTab === tab.key 
                      ? "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" 
                      : "rgba(255,255,255,0.03)",
                    color: activeTab === tab.key ? "white" : "rgba(255,255,255,0.4)",
                    border: activeTab === tab.key ? "none" : "1px solid rgba(255,255,255,0.05)"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tickets Tab */}
            {activeTab === "tickets" && (
              <div className="space-y-4">
                {mockTickets.map((ticket, i) => (
                  <motion.div 
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ 
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-56 h-40 md:h-auto relative">
                        <img 
                          src={ticket.image} 
                          alt={ticket.eventName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#A5B4FC", fontFamily: "'Outfit', sans-serif" }}>
                                {ticket.tier}
                              </span>
                              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34D399", fontFamily: "'Outfit', sans-serif" }}>
                                {ticket.status}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              {ticket.eventName}
                            </h3>
                            <p className="text-white/40 text-sm mb-3">{ticket.artist}</p>
                            <div className="flex flex-wrap gap-4 text-white/30 text-sm">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={14} /> {ticket.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={14} /> {ticket.time}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin size={14} /> {ticket.venue}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <p className="text-white font-bold text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              ${ticket.totalPrice}
                            </p>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                <Download size={16} /> Download
                              </button>
                              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                                View Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <th className="text-left p-4 text-white/30 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Order ID</th>
                      <th className="text-left p-4 text-white/30 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Date</th>
                      <th className="text-left p-4 text-white/30 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Items</th>
                      <th className="text-left p-4 text-white/30 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Total</th>
                      <th className="text-left p-4 text-white/30 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Status</th>
                      <th className="text-right p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <td className="p-4 text-white font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{order.id}</td>
                        <td className="p-4 text-white/40" style={{ fontFamily: "'Outfit', sans-serif" }}>{order.date}</td>
                        <td className="p-4 text-white/40" style={{ fontFamily: "'Outfit', sans-serif" }}>{order.items} tickets</td>
                        <td className="p-4 text-white font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>${order.total}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34D399", fontFamily: "'Outfit', sans-serif" }}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-white/30 hover:text-white transition-colors">
                            <ChevronRight size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </SignedIn>

          <SignedOut>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <User size={40} className="text-white/30" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
                Sign in to view your dashboard
              </h2>
              <p className="text-white/40 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Access your tickets and order history by signing in
              </p>
            </motion.div>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
