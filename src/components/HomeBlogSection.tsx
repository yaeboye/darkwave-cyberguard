
import React, { useEffect, useState } from 'react';
import { ChevronRight, Book, Calendar, AlertCircle } from 'lucide-react';

interface BlogPost {
  title: string;
  link: string;
  published: string;
  content: string;
  thumbnail?: string;
}

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        // Use a CORS proxy to fetch the RSS feed from scaremedia.blogspot.com
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://scaremedia.blogspot.com/feeds/posts/default?alt=rss'
          )}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        
        if (!data || !data.contents) {
          throw new Error('Invalid response data');
        }
        
        // Parse the XML content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        
        // For debugging
        console.log('Found items:', items.length);
        
        const parsedPosts: BlogPost[] = [];
        
        items.forEach((item) => {
          const title = item.querySelector('title')?.textContent || 'Untitled';
          const link = item.querySelector('link')?.textContent || '#';
          const published = item.querySelector('pubDate')?.textContent || '';
          const content = item.querySelector('description')?.textContent || '';
          
          // Extract thumbnail from content if available
          let thumbnail = '';
          const imgRegex = /<img[^>]+src="([^">]+)"/;
          const imgMatch = content.match(imgRegex);
          if (imgMatch && imgMatch[1]) {
            thumbnail = imgMatch[1];
          }
          
          console.log('Parsed post:', { title, link, published });
          
          parsedPosts.push({
            title,
            link,
            published,
            content,
            thumbnail: thumbnail || 'https://placehold.co/600x400/252a33/e1e7ef?text=CyberGuard'
          });
        });
        
        console.log('Total parsed posts:', parsedPosts.length);
        setBlogs(parsedPosts.slice(0, 3)); // Get the 3 most recent posts
      } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        setError(error.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
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
    const plainText = content.replace(/<[^>]+>/g, '');
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
              Latest insights and articles from our cybersecurity blog.
            </p>
          </div>
          
          <a href="https://scaremedia.blogspot.com/" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 cyber-button flex items-center">
            <Book className="mr-2 h-5 w-5" />
            Visit Blog
          </a>
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
              blogs.map((post, index) => (
                <div key={index} className="cyber-card group h-full hover:shadow-neon-pink transition-all duration-300 flex flex-col">
                  <div className="relative h-48 mb-4 overflow-hidden border border-cyber-pink">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-cyber-pink px-2 py-1">
                      <span className="text-xs font-cyber text-black">Blog</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-cyber text-xl text-white mb-3 group-hover:text-cyber-pink transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {extractSummary(post.content)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.published)}</span>
                    </div>
                    
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-cyber-pink"
                    >
                      <span>Read More</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Book className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-cyber text-gray-400">No blog posts found</h3>
                <p className="text-gray-500">Check back later for updates</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlogSection;
