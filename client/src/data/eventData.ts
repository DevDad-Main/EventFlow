export const eventData = {
  id: "evt-001",
  title: "Neon Frequencies",
  subtitle: "An Immersive Electronic Music Experience",
  artist: "ODESZA ft. Bonobo",
  date: "Saturday, August 16, 2025",
  time: "8:00 PM – 2:00 AM",
  doorsOpen: "7:00 PM",
  venue: {
    name: "The Shrine Auditorium",
    address: "665 W Jefferson Blvd",
    city: "Los Angeles, CA 90007",
    lat: 34.0219,
    lng: -118.2814,
  },
  genre: ["Electronic", "Ambient", "Live A/V"],
  rating: 4.9,
  reviewCount: 2847,
  savedCount: 12400,
  heroImage:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1800&q=85",
  galleryImages: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  ],
  description: `Experience music the way it was meant to be felt. ODESZA and Bonobo come together for a singular night of immersive electronic artistry — a rare live convergence that blurs the lines between performance and installation.

The Shrine transforms into a cathedral of light and sound, with custom-built LED rigs, spatial audio arrays, and a 360° visual landscape co-designed by acclaimed visual artist Actual Objects. This isn't a concert. It's architecture you can feel.

Doors open at 7PM with a curated warm-up set by Los Angeles-based producer Sable. The main performance begins at 9PM and runs until 2AM. Limited capacity. Premium tiered seating and standing floor available.`,
  ticketTiers: [
    {
      id: "tier-ga",
      name: "General Admission",
      price: 89,
      originalPrice: null,
      availability: 0.15,
      availabilityLabel: "Few left",
      benefits: [
        "Standing floor access",
        "Full stage view",
        "Bar access included",
      ],
      badge: null,
      color: "default",
    },
    {
      id: "tier-premium",
      name: "Premium Floor",
      price: 149,
      originalPrice: 179,
      availability: 0.35,
      availabilityLabel: "Limited",
      benefits: [
        "Elevated floor section",
        "Dedicated bar access",
        "Priority entry",
        "Complimentary coat check",
      ],
      badge: "Best Value",
      color: "featured",
    },
    {
      id: "tier-vip",
      name: "VIP Experience",
      price: 349,
      originalPrice: null,
      availability: 0.6,
      availabilityLabel: "Available",
      benefits: [
        "Private mezzanine lounge",
        "Open bar (2hrs)",
        "Artist merch bundle",
        "Dedicated concierge",
        "Early entry 6:30 PM",
      ],
      badge: "Exclusive",
      color: "vip",
    },
  ],
  relatedEvents: [
    {
      id: "rel-1",
      title: "Four Tet: Live",
      date: "Aug 23, 2025",
      venue: "Hollywood Palladium",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80",
      genre: "Electronic",
    },
    {
      id: "rel-2",
      title: "Bicep: Isles Tour",
      date: "Sep 5, 2025",
      venue: "Kia Forum",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
      genre: "Electronic",
    },
    {
      id: "rel-3",
      title: "Jamie xx",
      date: "Sep 12, 2025",
      venue: "The Wiltern",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80",
      genre: "Electronic",
    },
    {
      id: "rel-4",
      title: "Floating Points",
      date: "Sep 19, 2025",
      venue: "Greek Theatre",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1501386761578-eaa54b1df2c0?w=400&q=80",
      genre: "Ambient",
    },
    {
      id: "rel-5",
      title: "Nicolas Jaar",
      date: "Oct 3, 2025",
      venue: "Shrine Expo Hall",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
      genre: "Electronic",
    },
  ],
};
