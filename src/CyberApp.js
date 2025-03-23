// CyberApp.js - Main application with combined features for easier explanation
// This file combines key functionality for a cybersecurity web application

// ----------------- IMPORTS -----------------
// React core
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// UI components and styling
import { Shield, Lock, Mail, LogIn, LogOut, User, 
         Menu, X, Monitor, Cpu, Terminal, FileText, 
         Wrench, MessageSquare, ChevronRight, Newspaper, 
         Calendar, AlertCircle, RefreshCw } from 'lucide-react';

// Supabase client
const SUPABASE_URL = "https://nkswikevsglbmbbhljpr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rc3dpa2V2c2dsYm1iYmhsanByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDI2MDYsImV4cCI6MjA1NzM3ODYwNn0.RVnl8VngcJs7Y_alPtvknSD8QqYQ2_TZizyAkRNk0AU";

// ----------------- AUTHENTICATION -----------------
// Auth Context - Manages user authentication state
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('Auth state changed:', event, currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Sign in successful:', data);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('Sign up successful:', data);
      toast({
        title: "Account created",
        description: "Check your email to confirm your account.",
      });
      
      // Automatically sign in after signup
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        navigate('/');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    supabase
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ----------------- UI COMPONENTS -----------------

// Simple toast notification system
const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = "default" }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.variant}`}>
            <div className="toast-title">{t.title}</div>
            <div className="toast-description">{t.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  return React.useContext(ToastContext);
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <Shield className="logo-icon" />
            <span className="logo-text">CYBER<span className="highlight">GUARD</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className="nav-link">
              <Monitor className="nav-icon" />
              <span>Home</span>
            </Link>
            <Link to="/tools" className="nav-link">
              <Wrench className="nav-icon" />
              <span>Tools</span>
            </Link>
            <Link to="/news" className="nav-link">
              <FileText className="nav-icon" />
              <span>News</span>
            </Link>
            <Link to="/feedback" className="nav-link">
              <MessageSquare className="nav-icon" />
              <span>Feedback</span>
            </Link>
            
            {user ? (
              <div className="auth-links">
                <Link to="/tools/password-manager" className="user-link">
                  <User className="nav-icon" />
                  <span>My Vault</span>
                </Link>
                <button onClick={signOut} className="auth-button">
                  <LogOut className="button-icon" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="auth-button">
                <LogIn className="button-icon" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
          >
            {isOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              <Monitor className="nav-icon" />
              <span>Home</span>
            </Link>
            <Link 
              to="/tools" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              <Wrench className="nav-icon" />
              <span>Tools</span>
            </Link>
            <Link 
              to="/news" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="nav-icon" />
              <span>News</span>
            </Link>
            <Link 
              to="/feedback" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="nav-icon" />
              <span>Feedback</span>
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/tools/password-manager" 
                  className="mobile-nav-link highlight"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="nav-icon" />
                  <span>My Vault</span>
                </Link>
                <button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }} 
                  className="mobile-nav-button"
                >
                  <LogOut className="nav-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="mobile-nav-link highlight"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="nav-icon" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Shield className="logo-icon" />
            <span className="logo-text">CYBER<span className="highlight">GUARD</span></span>
          </div>
          <p className="footer-text">
            Your personal cybersecurity toolkit for digital safety
          </p>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/feedback" className="footer-link">Feedback</Link>
          </div>
          <p className="copyright">
            &copy; {new Date().getFullYear()} CyberGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ----------------- NEWS COMPONENTS -----------------

// News Section - Displays cybersecurity news
function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { supabase } = useAuth();
  
  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('id, title, summary, published_at, category, image_url')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Remove duplicates by id
        const uniqueNews = Array.from(new Map(data.map(item => [item.id, item])).values());
        setNews(uniqueNews);
      } else {
        // Trigger refresh from edge function
        await triggerNewsRefresh();
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message || 'Failed to fetch news articles');
      toast({
        title: "Error fetching news",
        description: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const triggerNewsRefresh = async () => {
    try {
      setLoading(true);
      toast({
        title: "Refreshing news data",
        description: "This may take a moment..."
      });
      
      // Use Supabase function invoke
      const { data, error } = await supabase.functions.invoke('fetch-cyber-news');
      
      if (error) throw new Error(error.message || 'Failed to refresh news data');
      
      console.log('News refresh result:', data);
      
      if (data.success) {
        toast({
          title: "News updated",
          description: `Successfully loaded ${data.count} articles`
        });
        setTimeout(fetchNews, 1000);
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
      setError(error.message || 'Failed to refresh news data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('public:news_articles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'news_articles' }, 
        () => {
          console.log('News update detected');
          fetchNews();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span className="highlight-purple">Cyber</span>{" "}
              <span className="highlight-blue">Intelligence</span>
            </h2>
            <p className="section-description">
              Stay informed with the latest cybersecurity news and updates.
            </p>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={triggerNewsRefresh} 
              className="refresh-button"
              disabled={loading}
            >
              <RefreshCw className={`button-icon ${loading ? 'spin' : ''}`} />
              Refresh
            </button>
            <Link to="/news" className="view-all-button">
              <Newspaper className="button-icon" />
              View All News
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="news-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="news-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-date"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="news-grid">
            {news.length > 0 ? (
              news.map((article) => (
                <div key={article.id} className="news-card">
                  <div className="news-image-container">
                    <img 
                      src={article.image_url || '/placeholder.svg'} 
                      alt={article.title} 
                      className="news-image"
                      onError={(e) => {
                        e.target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="news-category">
                      <span>{article.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-summary">{article.summary}</p>
                  
                  <div className="news-meta">
                    <div className="news-date">
                      <Calendar className="meta-icon" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    
                    <div className="read-more">
                      <span>Read More</span>
                      <ChevronRight className="meta-icon" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-news">
                <Newspaper className="empty-icon" />
                <h3 className="empty-title">No news articles found</h3>
                <p className="empty-description">Click refresh to load the latest cybersecurity news</p>
                <button 
                  onClick={triggerNewsRefresh} 
                  className="load-news-button"
                >
                  <RefreshCw className="button-icon" />
                  Load News
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ----------------- STATIC BLOG POSTS -----------------

// Static blog posts for simplicity
const blogPosts = [
  {
    id: "1",
    title: "5 Essential Password Security Tips",
    summary: "Learn how to create and manage strong passwords to protect your accounts from unauthorized access.",
    author: "Security Expert",
    category: "Password Security",
    image_url: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    title: "How to Detect and Prevent Phishing Attacks",
    summary: "Phishing attacks are becoming increasingly sophisticated. Learn how to recognize and avoid these dangerous scams.",
    author: "Cybersecurity Analyst",
    category: "Phishing",
    image_url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    title: "The Importance of Two-Factor Authentication",
    summary: "Two-factor authentication adds an essential layer of security to your accounts. Here's why you should enable it everywhere.",
    author: "Security Researcher",
    category: "Authentication",
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Blog Section Component
function BlogSection() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span className="highlight-blue">Cyber</span>{" "}
              <span className="highlight-purple">Knowledge</span>
            </h2>
            <p className="section-description">
              Expert guides to help you stay secure online
            </p>
          </div>
          
          <Link to="/blog" className="view-all-button">
            <FileText className="button-icon" />
            View All Articles
          </Link>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-image-container">
                <img 
                  src={post.image_url || '/placeholder.svg'} 
                  alt={post.title} 
                  className="blog-image"
                />
                <div className="blog-category">
                  <span>{post.category}</span>
                </div>
              </div>
              
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-summary">{post.summary}</p>
                
                <div className="blog-meta">
                  <div className="blog-author">{post.author}</div>
                  <div className="blog-date">
                    <Calendar className="meta-icon" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                </div>
                
                <div className="read-more">
                  <span>Read More</span>
                  <ChevronRight className="meta-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------- APP PAGES -----------------

// Authentication Page
function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Clear form when switching between login and signup
    setEmail('');
    setPassword('');
  }, [isSignUp]);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  const validateForm = () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return false;
    }
    
    if (!password.trim()) {
      toast({
        title: "Password required",
        description: "Please enter your password",
        variant: "destructive",
      });
      return false;
    }
    
    if (isSignUp && password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <main className="auth-content">
        <div className="auth-container">
          <div className="auth-header">
            <Shield className="auth-icon" />
            <h1 className="auth-title">
              {isSignUp ? "Create Your Account" : "Secure Authentication"}
            </h1>
            <p className="auth-description">
              {isSignUp 
                ? "Join CyberGuard to access protected tools and features" 
                : "Access your secure password vault and other protected tools"}
            </p>
          </div>
          
          <div className="auth-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-text">Processing...</span>
                ) : (
                  <>
                    <LogIn className="button-icon" />
                    {isSignUp ? "Create Account" : "Sign In"}
                  </>
                )}
              </button>
            </form>
            
            <div className="auth-toggle">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="toggle-button"
                type="button"
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// ----------------- MAIN APP COMPONENT -----------------

// App Component - Main application component
function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <NewsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

// Various Page Components
function NewsPage() {
  // News page implementation
}

function ToolsPage() {
  // Tools page implementation
}

function FeedbackPage() {
  // Feedback page implementation
}

function NotFoundPage() {
  // 404 page implementation
}

// ----------------- CSS STYLING -----------------

// CSS for the application
const styles = `
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --cyber-black: #0a0b0e;
  --cyber-darkgray: #1a1c23;
  --cyber-gray: #2e3039;
  --cyber-blue: #00b3e6;
  --cyber-purple: #d000ff;
  --cyber-pink: #ff0086;
  --cyber-yellow: #ffd000;
  --light-gray: #a0a0b0;
  --white: #ffffff;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--cyber-black);
  color: var(--white);
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animation keyframes */
@keyframes glow-pulse {
  0% { filter: drop-shadow(0 0 2px var(--cyber-blue)); }
  50% { filter: drop-shadow(0 0 8px var(--cyber-blue)); }
  100% { filter: drop-shadow(0 0 2px var(--cyber-blue)); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Utility classes */
.highlight-blue {
  color: var(--cyber-blue);
}

.highlight-purple {
  color: var(--cyber-purple);
}

.highlight-pink {
  color: var(--cyber-pink);
}

.spin {
  animation: spin 1s linear infinite;
}

/* Navbar styles */
.navbar {
  background-color: var(--cyber-black);
  border-bottom: 1px solid var(--cyber-blue);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-icon {
  height: 2rem;
  width: 2rem;
  color: var(--cyber-blue);
  animation: glow-pulse 3s infinite;
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  color: var(--cyber-blue);
}

.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  color: var(--white);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--cyber-blue);
}

.nav-icon {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-link {
  display: flex;
  align-items: center;
  color: var(--cyber-purple);
  text-decoration: none;
  transition: color 0.2s;
}

.user-link:hover {
  color: var(--cyber-blue);
}

.auth-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--cyber-blue);
  color: black;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.auth-button:hover {
  background-color: var(--cyber-purple);
}

.button-icon {
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
}

.mobile-menu-button {
  display: block;
  background: none;
  border: none;
  color: var(--cyber-blue);
  cursor: pointer;
}

@media (min-width: 768px) {
  .mobile-menu-button {
    display: none;
  }
}

.icon {
