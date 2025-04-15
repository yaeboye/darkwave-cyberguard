
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import PasswordChecker from "./pages/tools/PasswordChecker";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import HashGenerator from "./pages/tools/HashGenerator";
import Encryption from "./pages/tools/Encryption";
import ThreatDetection from "./pages/tools/ThreatDetection";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import SecurityGuides from "./pages/SecurityGuides";
import PasswordManager from "./pages/tools/PasswordManager";
import Feedback from "./pages/Feedback";
import NewsSection from "./components/NewsSection";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/password-checker" element={<PasswordChecker />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/hash-generator" element={<HashGenerator />} />
          <Route path="/tools/encryption" element={<Encryption />} />
          <Route path="/tools/threat-detection" element={<ThreatDetection />} />
          <Route path="/tools/password-manager" element={<PasswordManager />} />
          <Route path="/guides" element={<SecurityGuides />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
