// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Accueil from "./pages/accueil";
import Navbar from "./components/navbar";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-22">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;