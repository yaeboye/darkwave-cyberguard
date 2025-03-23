
import React from 'react';
import { ChevronRight, Book, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  link: string;
  published: string;
  content: string;
  thumbnail: string;
}

const HomeBlogSection = () => {
  // Static blog posts that will always work
  const blogs: BlogPost[] = [
    {
      id: "1",
      title: "How to Create Strong Passwords That Are Easy to Remember",
      link: "https://cybersecurityguide.org/resources/creating-strong-passwords/",
      published: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      content: "Creating strong, unique passwords for all your accounts is one of the most important steps you can take to protect your digital identity. In this guide, we share techniques for creating passwords that are both secure and memorable, eliminating the need to reuse passwords across multiple sites.",
      thumbnail: "https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "2",
      title: "Why Multi-Factor Authentication Is Your Best Defense",
      link: "https://cybersecurityguide.org/resources/importance-of-mfa/",
      published: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      content: "Multi-factor authentication (MFA) adds an essential layer of security beyond just a password. This article explains how MFA works, why it's effective against most common attacks, and how to implement it across your accounts for maximum protection.",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "3",
      title: "Protecting Your Home Network: A Complete Guide",
      link: "https://cybersecurityguide.org/resources/secure-home-network/",
      published: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      content: "Your home network is the foundation of your digital security. Learn how to properly secure your Wi-Fi, update your router firmware, segment your network for guests and IoT devices, and implement other best practices to keep your home network safe from intruders.",
      thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];
  
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
          
          <a href="https://cybersecurityguide.org/blog/" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 cyber-button flex items-center">
            <Book className="mr-2 h-5 w-5" />
            Visit Blog
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="cyber-card group h-full hover:shadow-neon-pink transition-all duration-300 flex flex-col">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
