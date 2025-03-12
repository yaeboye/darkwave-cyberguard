import React, { useState, useEffect } from 'react';
import CyberHeader from '../components/CyberHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Calendar, Clock, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  published_at: string;
  category: string;
  image_url: string;
  author?: string;
  content: string;
}

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'Vulnerability', name: 'Vulnerabilities' },
    { id: 'Ransomware', name: 'Ransomware' },
    { id: 'Data Breach', name: 'Data Breaches' },
    { id: 'Phishing', name: 'Phishing' },
    { id: 'Government', name: 'Government' },
    { id: 'Technology', name: 'Technology' },
  ];
  
  useEffect(() => {
    fetchNews();
    
    const channel = supabase
      .channel('public:news_articles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'news_articles' }, 
        (payload) => {
          console.log('Real-time update:', payload);
          fetchNews();
          toast({
            title: "News Updated",
            description: "New cybersecurity information is available.",
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setNews(data as NewsArticle[]);
      }
    } catch (error: any) {
      console.error('Error fetching news:', error);
      setError(error.message || 'Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  };
  
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6">
          <CyberHeader 
            title="Cybersecurity News" 
            subtitle="Stay informed with the latest cybersecurity news, threats, vulnerabilities, and industry updates."
          />
          
          <div className="flex justify-end mb-4">
            <button 
              onClick={fetchNews} 
              className="flex items-center px-3 py-2 text-sm bg-cyber-darkgray text-white hover:bg-cyber-blue hover:text-black transition-colors"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Refresh'} 
              <RefreshCw className={`ml-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 text-red-300 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 font-cyber text-sm whitespace-nowrap transition-all duration-300 
                    ${selectedCategory === category.id 
                      ? 'bg-cyber-blue text-black' 
                      : 'bg-cyber-darkgray text-white hover:bg-gray-800'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {loading && news.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="cyber-card animate-pulse">
                  <div className="h-48 mb-4 bg-gray-800"></div>
                  <div className="h-6 bg-gray-800 mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-800 mb-2 w-full"></div>
                  <div className="h-4 bg-gray-800 mb-2 w-full"></div>
                  <div className="h-4 bg-gray-800 mb-4 w-2/3"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-800 w-1/4"></div>
                    <div className="h-3 bg-gray-800 w-1/4"></div>
                    <div className="h-3 bg-gray-800 w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map(article => (
                <div 
                  key={article.id}
                  className="cyber-card group hover:shadow-neon-blue transition-all duration-300"
                >
                  <div className="relative h-48 mb-4 overflow-hidden border border-cyber-blue">
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-cyber-blue px-2 py-1">
                      <span className="text-xs font-cyber text-black">{article.category}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-cyber text-xl text-white mb-3 group-hover:text-cyber-blue transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {article.summary}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{getReadTime(article.content)} read</span>
                      </div>
                      
                      <div className="flex items-center text-cyber-blue">
                        <span>Read</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-cyber text-gray-400">No articles found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
