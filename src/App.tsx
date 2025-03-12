
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Feedback from "./pages/Feedback";

// Tool Pages
import PasswordChecker from "./pages/tools/PasswordChecker";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import PasswordManager from "./pages/tools/PasswordManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/news" element={<News />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/feedback" element={<Feedback />} />
              
              {/* Tool Routes */}
              <Route path="/tools/password-checker" element={<PasswordChecker />} />
              <Route path="/tools/password-generator" element={<PasswordGenerator />} />
              <Route path="/tools/password-manager" element={<PasswordManager />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
