
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Pages
import Index from "./pages/Index.jsx";
import Tools from "./pages/Tools.tsx";
import News from "./pages/News.tsx";
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

// Initial data loader function
const initialDataLoader = async () => {
  try {
    // Check if there are news articles in the database
    const { data, error } = await supabase
      .from('news_articles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error checking news articles:', error);
      return;
    }

    // If no news articles, fetch them
    if (!data || data.length === 0) {
      console.log('No news articles found, fetching initial data...');
      
      const { data: refreshData, error: refreshError } = await supabase.functions.invoke('fetch-real-news', {
        method: 'POST',
      });
      
      if (refreshError) {
        console.error('Error fetching initial news data:', refreshError);
        return;
      }
      
      if (refreshData?.success) {
        console.log(`Successfully loaded ${refreshData.count} initial news articles`);
      }
    } else {
      console.log('News articles already exist in database');
    }
  } catch (err) {
    console.error('Error in initial data loader:', err);
  }
};

const AppContent = () => {
  useEffect(() => {
    // Load initial data when the app first mounts
    initialDataLoader().catch(console.error);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/news" element={<News />} />
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
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
