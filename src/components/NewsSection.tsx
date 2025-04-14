
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
      // Using NewsAPI for the latest news
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=1b9b89b1e69a4fde9f7db452082f2676'
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
          title: "Global Tech Giants Announce New Partnership",
          description: "Leading technology companies form alliance to address industry challenges and innovations.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/tech-news",
          source: { name: "Tech Daily" }
        },
        {
          title: "Innovative Renewable Energy Solution Unveiled",
          description: "Scientists develop breakthrough technology that could revolutionize how we harness solar power.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/energy-news",
          source: { name: "Science Today" }
        },
        {
          title: "New Study Reveals Health Benefits of Mediterranean Diet",
          description: "Research confirms significant improvements in longevity and reduced risk of chronic diseases.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/health-news",
          source: { name: "Health Journal" }
        },
        {
          title: "Global Economic Forum Addresses Climate Change",
          description: "World leaders gather to discuss economic policies aimed at reducing carbon emissions.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/economic-news",
          source: { name: "Economic Times" }
        },
        {
          title: "Advancements in Artificial Intelligence Research",
          description: "New AI models demonstrate unprecedented capabilities in problem-solving and language understanding.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/ai-news",
          source: { name: "Tech Insider" }
        },
        {
          title: "Space Exploration Mission Discovers New Exoplanets",
          description: "Astronomers identify potentially habitable planets outside our solar system.",
          publishedAt: new Date().toISOString(),
          url: "https://example.com/space-news",
          source: { name: "Space Observatory" }
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
