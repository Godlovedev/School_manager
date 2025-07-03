// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import PrivateRoute, { isTokenValid } from "./hook/token";
import Footer from "./components/footer";


export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={isTokenValid() ? <Navigate to={"/dashboard"} /> : <LandingPage />} />
          <Route path="/accounts/register" element={<Register />} />
          <Route path="/accounts/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}