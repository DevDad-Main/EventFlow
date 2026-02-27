import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Home from "./components/home";
import UserDashboard from "./components/dashboard/UserDashboard";
import ArtistsPage from "./components/pages/ArtistsPage";
import VenuesPage from "./components/pages/VenuesPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/:id" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/venues" element={<VenuesPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
