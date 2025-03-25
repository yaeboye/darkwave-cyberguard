
import React, { useEffect, useState } from 'react';
import { ChevronRight, Book, Calendar, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
  url: string;
}

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to fetch blog posts');
      }
      
      if (data && data.success && data.posts && data.posts.length > 0) {
        setBlogs(data.posts.slice(0, 3)); // Take only 3 posts for the home page
        console.log('Fetched blog posts successfully:', data.posts);
      } else {
        console.error('No blog posts returned from API');
        setError('No blog posts found. Please try again later.');
      }
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      setError(error.message || 'Failed to fetch blog posts');
      toast({
        title: "Error fetching blog posts",
        description: "Please try again later or check your connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const extractSummary = (content: string, maxLength: number = 150) => {
    // Remove HTML tags
    const plainText = content?.replace(/<[^>]+>/g, '') || '';
    // Truncate to maxLength
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };
  
  return (
    <section className="py-16 bg-cyber-darkgray relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="font-cyber text-3xl font-bold mb-2">
              <span className="neon-text-purple">Security</span>{" "}
              <span className="neon-text-pink">Blog</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Latest insights and articles from cybersecurity experts.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={fetchBlogs} 
              className="cyber-button-small flex items-center bg-cyber-darkgray hover:bg-cyber-pink"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <a 
              href="https://cybersecurityguide.org/blog/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cyber-button flex items-center"
            >
              <Book className="mr-2 h-5 w-5" />
              Browse Blogs
            </a>
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
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <div key={post.id} className="cyber-card group h-full hover:shadow-neon-pink transition-all duration-300 flex flex-col">
                  <div className="relative h-48 mb-4 overflow-hidden border border-cyber-pink">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-cyber-pink px-2 py-1">
                      <span className="text-xs font-cyber text-black">{post.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-cyber text-xl text-white mb-3 group-hover:text-cyber-pink transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.summary || extractSummary(post.content)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-cyber-pink"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Book className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-cyber text-gray-400">No blog posts found</h3>
                <p className="text-gray-500 mb-4">Click refresh to load the latest cybersecurity articles</p>
                <button 
                  onClick={fetchBlogs} 
                  className="cyber-button-small flex items-center mx-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Load Blogs
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlogSection;
