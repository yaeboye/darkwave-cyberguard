
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Newspaper, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  published_at: string;
  category: string;
  image_url: string | null;
}

const HomeNewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('id, title, summary, published_at, category, image_url')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Remove any duplicates by id
        const uniqueNews = Array.from(new Map(data.map(item => [item.id, item])).values());
        setNews(uniqueNews);
        console.log('Fetched news successfully:', uniqueNews);
      } else {
        console.log('No news data available, triggering refresh');
        // If no news is available, trigger a refresh from the edge function
        await triggerNewsRefresh();
      }
    } catch (error: any) {
      console.error('Error fetching news:', error);
      setError(error.message || 'Failed to fetch news articles');
      toast({
        title: "Error fetching news",
        description: "Please try again later or check your connection.",
        variant: "destructive"
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
      
      // Use Supabase function invoke instead of fetch
      const { data, error } = await supabase.functions.invoke('fetch-cyber-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to refresh news data');
      }
      
      console.log('News refresh result:', data);
      
      if (data.success) {
        toast({
          title: "News updated",
          description: `Successfully loaded ${data.count} articles`
        });
        // Refetch news after a short delay to allow DB to update
        setTimeout(fetchNews, 1000);
      }
    } catch (error: any) {
      console.error('Error refreshing news:', error);
      setError(error.message || 'Failed to refresh news data');
      toast({
        title: "Error refreshing news",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Only fetch news once on component mount
    fetchNews();
    
    // Set up Supabase realtime subscription
    const channel = supabase
      .channel('public:news_articles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'news_articles' }, 
        () => {
          console.log('News update detected via realtime subscription');
          fetchNews();
        }
      )
      .subscribe();
    
    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <section className="py-16 bg-cyber-black relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="font-cyber text-3xl font-bold mb-2">
              <span className="neon-text-purple">Cyber</span>{" "}
              <span className="neon-text-blue">Intelligence</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Stay informed with the latest cybersecurity news and updates.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={triggerNewsRefresh} 
              className="cyber-button-small flex items-center bg-cyber-darkgray hover:bg-cyber-blue"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link to="/news" className="cyber-button flex items-center">
              <Newspaper className="mr-2 h-5 w-5" />
              View All News
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 text-red-300 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="cyber-card animate-pulse h-96">
                <div className="h-48 mb-4 bg-gray-800"></div>
                <div className="h-6 bg-gray-800 mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-800 mb-2 w-full"></div>
                <div className="h-4 bg-gray-800 mb-2 w-full"></div>
                <div className="h-4 bg-gray-800 mb-4 w-2/3"></div>
                <div className="h-3 bg-gray-800 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((article) => (
                <div key={article.id} className="cyber-card group h-full hover:shadow-neon-blue transition-all duration-300 flex flex-col">
                  <div className="relative h-48 mb-4 overflow-hidden border border-cyber-blue">
                    <img 
                      src={article.image_url || '/placeholder.svg'} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback for image load errors
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-cyber-blue px-2 py-1">
                      <span className="text-xs font-cyber text-black">{article.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-cyber text-xl text-white mb-3 group-hover:text-cyber-blue transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    
                    <div className="flex items-center text-cyber-blue">
                      <span>Read More</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Newspaper className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-cyber text-gray-400">No news articles found</h3>
                <p className="text-gray-500 mb-4">Click refresh to load the latest cybersecurity news</p>
                <button 
                  onClick={triggerNewsRefresh} 
                  className="cyber-button-small flex items-center mx-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Load News
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeNewsSection;
