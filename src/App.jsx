
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index.jsx";
import Tools from "./pages/Tools.jsx";
import News from "./pages/News.jsx";
import NotFound from "./pages/NotFound.jsx";
import Feedback from "./pages/Feedback.jsx";

// Tool Pages
import PasswordChecker from "./pages/tools/PasswordChecker.jsx";
import PasswordGenerator from "./pages/tools/PasswordGenerator.jsx";
import PasswordManager from "./pages/tools/PasswordManager.jsx";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/news" element={<News />} />
            <Route path="/feedback" element={<Feedback />} />
            
            {/* Tool Routes */}
            <Route path="/tools/password-checker" element={<PasswordChecker />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/password-manager" element={<PasswordManager />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
