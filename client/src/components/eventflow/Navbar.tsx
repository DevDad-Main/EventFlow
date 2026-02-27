import React from "react";
import { Ticket, Menu, Search } from "lucide-react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30"
      style={{
        background: "rgba(25, 30, 40, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #5C61F4, #7C3AED)" }}
          >
            <Ticket size={16} color="white" />
          </div>
          <span
            className="font-bold text-white text-lg tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            EventFlow
          </span>
        </div>

        {/* Nav links */}
        <div
          className="hidden md:flex items-center gap-8 text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {["Discover", "Artists", "Venues", "My Tickets"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <Search size={15} />
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, #5C61F4, #7C3AED)",
                }}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </SignedIn>
          <button className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
            <Menu size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
