import Navbar from "../eventflow/Navbar";

export default function ArtistsPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#0F1419", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Artists
          </h1>
          <p className="text-white/50">Coming soon...</p>
        </div>
      </div>
    </>
  );
}
