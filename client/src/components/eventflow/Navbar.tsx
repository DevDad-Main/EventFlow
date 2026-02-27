import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ticket, Menu, X, Search } from "lucide-react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Discover", path: "/" },
  { name: "Artists", path: "/artists" },
  { name: "Venues", path: "/venues" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10, 12, 16, 0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)" }}
            >
              <Ticket size={18} color="white" strokeWidth={2.5} />
            </div>
            <span
              className="font-bold text-white text-lg tracking-tight hidden sm:block"
              style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}
            >
              EventFlow
            </span>
          </Link>

          {/* Nav links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: location.pathname === link.path ? "white" : "rgba(255,255,255,0.45)",
                }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366F1, #A855F7)" }}
                  />
                )}
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <SignedIn>
              <Link
                to="/dashboard"
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: location.pathname === "/dashboard" ? "white" : "rgba(255,255,255,0.45)",
                }}
              >
                My Tickets
                {location.pathname === "/dashboard" && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366F1, #A855F7)" }}
                  />
                )}
              </Link>
            </SignedIn>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button 
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Search size={16} />
            </button>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  }}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-white/10 hover:ring-purple-500/50 transition-all"
                    }
                  }}
                />
              </Link>
            </SignedIn>
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(10, 12, 16, 0.98)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="px-5 py-4 space-y-1">
              {[...navLinks, ...(true ? [{ name: "My Tickets", path: "/dashboard" }] : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium transition-colors"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: location.pathname === link.path ? "white" : "rgba(255,255,255,0.5)",
                    background: location.pathname === link.path ? "rgba(99, 102, 241, 0.15)" : "transparent",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
