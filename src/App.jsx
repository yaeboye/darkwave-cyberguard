
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
