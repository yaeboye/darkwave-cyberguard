
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, ExternalLink, Newspaper, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import CyberLoader from './CyberLoader';

const NewsSection = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using NewsAPI for the latest news with the provided API key
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=a0d97574f94c49b1b9d6fccf82a6b824'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      if (data.articles) {
        setNews(data.articles.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Failed to load news",
        description: "Using fallback data instead",
        variant: "destructive",
      });
      
      // Fallback to static data if API fails
      setNews([
        {
          title: "Cybersecurity Threats on the Rise in 2025",
          description: "Security researchers report an alarming increase in sophisticated phishing and ransomware attacks targeting remote workers.",
          publishedAt: new Date().toISOString(),
          url: "https://cybersecurity-news.com/threats-2025",
          source: { name: "Cybersecurity Today" }
        },
        {
          title: "New Zero-Day Vulnerability Discovered in Popular Software",
          description: "Security teams are racing to patch a critical vulnerability that could allow attackers to gain system-level access.",
          publishedAt: new Date().toISOString(),
          url: "https://tech-security.com/zero-day-alert",
          source: { name: "Tech Security" }
        },
        {
          title: "Government Releases New Cybersecurity Framework",
          description: "The framework includes updated guidelines for organizations to protect against evolving cyber threats.",
          publishedAt: new Date().toISOString(),
          url: "https://policy-watch.com/cyber-framework",
          source: { name: "Policy Watch" }
        },
        {
          title: "AI-Powered Security Tools Show Promise in Threat Detection",
          description: "New research demonstrates how artificial intelligence can identify unusual patterns and potential security breaches faster than traditional methods.",
          publishedAt: new Date().toISOString(),
          url: "https://ai-security.com/research",
          source: { name: "AI Security" }
        },
        {
          title: "Major Data Breach Affects Millions of Users",
          description: "Companies urged to strengthen security protocols after hackers access sensitive customer information through a third-party vendor.",
          publishedAt: new Date().toISOString(),
          url: "https://data-breach-alerts.com/latest",
          source: { name: "Data Breach Alerts" }
        },
        {
          title: "Advanced Encryption Standard Updates Coming Next Year",
          description: "Cryptography experts are finalizing the next generation of encryption protocols designed to resist quantum computing attacks.",
          publishedAt: new Date().toISOString(),
          url: "https://encryption-today.com/aes-next-gen",
          source: { name: "Encryption Today" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
    
    // Setup news refresh interval (every 30 minutes)
    const refreshInterval = setInterval(() => {
      fetchNews();
    }, 1800000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleRefresh = () => {
    fetchNews();
    toast({
      title: "Refreshing news",
      description: "Fetching the latest headlines"
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
    <section className="py-16 bg-cyber-black relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-cyber text-3xl font-bold">
            <span className="neon-text-blue">Latest</span>{" "}
            <span className="neon-text-pink">News</span>
          </h2>
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-full border border-cyber-blue hover:bg-cyber-blue hover:bg-opacity-20 transition-all duration-200"
            title="Refresh news"
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 text-cyber-blue ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <CyberLoader />
            <p className="text-cyber-blue">Fetching the latest news...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={index}
                className="group"
              >
                <Card className="h-full bg-cyber-darkgray border-cyber-gray hover:border-cyber-blue transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="px-3 py-1 text-xs rounded-full bg-cyber-blue bg-opacity-20 text-cyber-blue inline-block">
                        {article.source?.name || "News"}
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-blue transition-colors" />
                    </div>
                    <CardTitle className="mt-2 text-lg font-medium group-hover:text-cyber-blue transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription className="text-gray-400 line-clamp-3">
                      {article.description || "No description available"}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between pt-2 border-t border-gray-800">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <ChevronRight className="h-4 w-4 text-cyber-blue" />
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <a 
            href="https://news.google.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button inline-flex items-center justify-center"
          >
            <Newspaper className="mr-2 h-5 w-5" />
            View More News
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

