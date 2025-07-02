// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}