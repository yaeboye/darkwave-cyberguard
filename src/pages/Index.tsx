
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, FileText, AlertTriangle, Wrench, ChevronRight, Key, 
  Hash, Database, Globe, Search, QrCode, RefreshCw, ExternalLink, Globe2,
  Newspaper
} from 'lucide-react';
import GlitchText from '../components/GlitchText';
import TerminalText from '../components/TerminalText';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingThreats from '../components/TrendingThreats';
import NewsSection from '../components/NewsSection';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { toast } = useToast();
  const [showTerminalText, setShowTerminalText] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const tools = [
    {
      id: 'password-checker',
      title: 'Password Strength Checker',
      description: 'Analyze your passwords for strength and vulnerability.',
      icon: <Lock className="h-8 w-8 text-cyber-blue mr-3" />,
      color: 'blue',
      link: '/tools/password-checker'
    },
    {
      id: 'password-generator',
      title: 'Password Generator',
      description: 'Create strong, secure passwords with custom options.',
      icon: <Key className="h-8 w-8 text-cyber-pink mr-3" />,
      color: 'pink',
      link: '/tools/password-generator'
    },
    {
      id: 'hash-generator',
      title: 'Hash Generator',
      description: 'Generate cryptographic hashes using various algorithms.',
      icon: <Hash className="h-8 w-8 text-cyber-purple mr-3" />,
      color: 'purple',
      link: '/tools/hash-generator'
    },
    {
      id: 'encryption',
      title: 'Encryption & Decryption',
      description: 'Secure your data with AES, RSA, and Base64 encryption.',
      icon: <Shield className="h-8 w-8 text-cyber-green mr-3" />,
      color: 'green',
      link: '/tools/encryption'
    },
    {
      id: 'threat-detection',
      title: 'Threat Detection',
      description: 'Scan for phishing attempts, malware, and other cyber threats.',
      icon: <AlertTriangle className="h-8 w-8 text-cyber-red mr-3" />,
      color: 'red',
      link: '/tools/threat-detection'
    },
    {
      id: 'password-manager',
      title: 'Password Manager',
      description: 'Securely store and organize all your passwords.',
      icon: <Database className="h-8 w-8 text-cyber-yellow mr-3" />,
      color: 'yellow',
      link: '/tools/password-manager'
    }
  ];

  const fetchCybersecurityNews = async () => {
    setBlogLoading(true);
    try {
      const response = await fetch(
        'https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&apiKey=a0d97574f94c49b1b9d6fccf82a6b824&pageSize=3'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      
      if (data.articles) {
        const formattedArticles = data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          summary: article.description,
          category: 'Cybersecurity',
          date: new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          source: article.source.name,
          link: article.url
        }));
        
        setBlogPosts(formattedArticles);
      }
    } catch (error) {
      console.error('Error fetching cybersecurity news:', error);
      toast({
        title: "Failed to load news",
        description: "Using fallback data instead",
        variant: "destructive",
      });
      
      setBlogPosts([
        {
          id: 1,
          title: "The Rise of Ransomware as a Service",
          summary: "Cybercriminals are now offering ransomware as a subscription model, lowering the barrier to entry for would-be attackers.",
          category: "Threat Intel",
          date: "June 5, 2023",
          source: "Krebs on Security",
          link: "https://krebsonsecurity.com/2023/06/ransomware-as-a-service-the-pandemic-within-a-pandemic/"
        },
        {
          id: 2,
          title: "Zero-Day Vulnerability Found in Popular VPN Service",
          summary: "Security researchers discovered a critical vulnerability that allows remote code execution without authentication.",
          category: "Vulnerabilities",
          date: "July 12, 2023",
          source: "The Hacker News",
          link: "https://thehackernews.com/2023/07/zero-day-vulnerability-in-vpn-services.html"
        },
        {
          id: 3,
          title: "Why Multi-Factor Authentication Is Not Enough",
          summary: "Recent bypass techniques show that MFA needs to be implemented carefully to remain effective.",
          category: "Authentication",
          date: "August 23, 2023",
          source: "Dark Reading",
          link: "https://www.darkreading.com/authentication/multi-factor-authentication-effectiveness"
        }
      ]);
    } finally {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    fetchCybersecurityNews();
    
    const newsRefreshInterval = setInterval(() => {
      fetchCybersecurityNews();
    }, 1800000);

    const terminalTimer = setTimeout(() => {
      setShowTerminalText(true);
    }, 500);
    
    return () => {
      clearInterval(newsRefreshInterval);
      clearTimeout(terminalTimer);
    };
  }, []);

  const handleRefreshBlogs = () => {
    fetchCybersecurityNews();
    toast({
      title: "Refreshing news",
      description: "Getting the latest cybersecurity updates"
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden bg-cyber-black">
          <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
                  <GlitchText 
                    text="CYBER" 
                    className="neon-text-blue" 
                    delay={300}
                  />
                  <GlitchText 
                    text="GUARD" 
                    className="neon-text-pink" 
                    delay={600}
                  />
                </h1>
                
                {showTerminalText && (
                  <TerminalText
                    text="Advanced cybersecurity tools for the modern digital landscape. Protect your digital identity with our cutting-edge security suite."
                    className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
                  />
                )}
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a href="#tools" className="cyber-button flex items-center justify-center bg-cyber-blue text-black hover:text-black">
                    <Wrench className="mr-2 h-5 w-5" />
                    Explore Tools
                  </a>
                </div>
              </div>
              
              <div className="md:w-2/5">
                <div className="relative">
                  <div className="p-1 border border-cyber-blue rounded-lg overflow-hidden bg-cyber-darkgray shadow-neon-blue">
                    <div className="bg-black p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 text-xs text-gray-500">[root@cyberguard] ~ #</div>
                      </div>
                      
                      <TerminalText
                        text="Initializing security protocols..."
                        className="text-cyber-green mb-2"
                        typingSpeed={30}
                        delay={0}
                      />
                      
                      <TerminalText
                        text="Loading encryption modules..."
                        className="text-cyber-yellow mb-2"
                        typingSpeed={30}
                        delay={1000}
                      />
                      
                      <TerminalText
                        text="Scanning for vulnerabilities..."
                        className="text-cyber-pink mb-2"
                        typingSpeed={30}
                        delay={2000}
                      />
                      
                      <TerminalText
                        text="System secured. Welcome to Satvik's CyberGuard."
                        className="text-cyber-blue font-bold"
                        typingSpeed={30}
                        delay={3000}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Add NewsSection component here to display it on the homepage */}
        <NewsSection />
      
        <section id="tools" className="py-16 bg-cyber-darkgray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-cyber text-3xl font-bold mb-4">
                <span className="neon-text-blue">Security</span>{" "}
                <span className="neon-text-pink">Tools</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                CyberGuard offers a comprehensive suite of cybersecurity tools to protect your digital identity and secure your online presence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link 
                  key={tool.id}
                  to={tool.link}
                  className="cyber-card group transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex items-center mb-4">
                    {tool.icon}
                    <h3 className="font-cyber text-xl font-semibold text-white">{tool.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {tool.description}
                  </p>
                  <div className={`flex justify-end text-cyber-${tool.color}`}>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/tools" className="cyber-button inline-flex items-center justify-center">
                <Wrench className="mr-2 h-5 w-5" />
                View All Tools
              </Link>
            </div>
          </div>
        </section>
        
        <TrendingThreats />
        
        <section className="py-16 bg-cyber-darkgray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 flex items-center justify-center">
              <h2 className="font-cyber text-3xl font-bold mb-0 mr-4">
                <span className="neon-text-green">Cybersecurity</span>{" "}
                <span className="neon-text-blue">News</span>
              </h2>
              <button 
                onClick={handleRefreshBlogs}
                className="p-2 rounded-full border border-cyber-blue hover:bg-cyber-blue hover:bg-opacity-20 transition-all duration-200"
                title="Refresh news"
                disabled={blogLoading}
              >
                <RefreshCw className={`h-5 w-5 text-cyber-blue ${blogLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            {blogLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="cyber-loader"></div>
                <span className="ml-3 text-cyber-blue">Loading latest news...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <a 
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-card group transition-all duration-300 hover:transform hover:scale-[1.02]"
                  >
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-cyber-blue bg-opacity-20 text-cyber-blue`}>
                        {post.category}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{post.date}</span>
                    </div>
                    
                    <h3 className="font-cyber text-xl font-medium mb-3 text-white group-hover:text-cyber-blue transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                      <span className="text-sm text-gray-500">Source: {post.source}</span>
                      <ChevronRight className="h-5 w-5 text-cyber-blue" />
                    </div>
                  </a>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center">
              <a 
                href="https://www.darkreading.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button inline-flex items-center justify-center"
              >
                <FileText className="mr-2 h-5 w-5" />
                Read More Articles
              </a>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-cyber-black relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-cyber text-3xl md:text-4xl font-bold mb-6">
                <span className="neon-text-purple">Ready to secure</span>{" "}
                <span className="neon-text-blue">your digital future?</span>
              </h2>
              
              <p className="text-gray-400 mb-8 text-lg">
                Start using CyberGuard today and access our full suite of advanced cybersecurity tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/tools" className="cyber-button bg-cyber-purple text-white hover:text-white">
                  Explore All Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

