
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index.jsx";
import Tools from "./pages/Tools.tsx";
import NotFound from "./pages/NotFound.tsx";
import Feedback from "./pages/Feedback.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import Contact from "./pages/Contact.tsx";

// Tool Pages
import PasswordChecker from "./pages/tools/PasswordChecker.tsx";
import PasswordGenerator from "./pages/tools/PasswordGenerator.tsx";
import PasswordManager from "./pages/tools/PasswordManager.tsx";

// Create a new query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/feedback" element={<Feedback />} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Tool Routes */}
        <Route path="/tools/password-checker" element={<PasswordChecker />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/password-manager" element={<PasswordManager />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
