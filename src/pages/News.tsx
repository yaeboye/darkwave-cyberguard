
import React, { useState, useEffect } from 'react';
import CyberHeader from '../components/CyberHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Calendar, Clock, ExternalLink } from 'lucide-react';

// Mock data for news articles
const mockNews = [
  {
    id: 1,
    title: 'Critical Vulnerability Discovered in Popular Software',
    summary: 'Security researchers have found a zero-day vulnerability affecting millions of users worldwide. The flaw allows attackers to execute remote code and gain system privileges.',
    source: 'CyberNews',
    date: '2023-10-15',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Vulnerability'
  },
  {
    id: 2,
    title: 'New Ransomware Strain Targets Healthcare Organizations',
    summary: 'A sophisticated ransomware campaign is specifically targeting hospitals and healthcare providers. The attack encrypts patient records and demands substantial cryptocurrency payments.',
    source: 'Security Weekly',
    date: '2023-10-12',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Ransomware'
  },
  {
    id: 3,
    title: 'Government Issues Advisory on State-Sponsored Hacking',
    summary: 'The Cybersecurity and Infrastructure Security Agency (CISA) has released a joint advisory warning about increased state-sponsored cyber operations targeting critical infrastructure.',
    source: 'Tech Security Today',
    date: '2023-10-10',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Government'
  },
  {
    id: 4,
    title: 'Major Data Breach Exposes Millions of User Records',
    summary: 'A popular online service has confirmed a massive data breach affecting over 50 million users. Exposed data includes email addresses, passwords, and personal information.',
    source: 'Breach Report',
    date: '2023-10-08',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Data Breach'
  },
  {
    id: 5,
    title: 'New Phishing Campaign Targets Remote Workers',
    summary: 'Security experts have identified a sophisticated phishing operation aimed at remote workers. The attack uses fake collaboration tool notifications to steal credentials.',
    source: 'Phishing Alert',
    date: '2023-10-05',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Phishing'
  },
  {
    id: 6,
    title: 'AI-Powered Cybersecurity Solutions on the Rise',
    summary: 'The cybersecurity industry is increasingly turning to artificial intelligence to combat evolving threats. New AI-powered tools can detect anomalies and respond to incidents faster than human analysts.',
    source: 'Tech Innovations',
    date: '2023-10-03',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1676288173684-d19c075c6e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    url: '#',
    category: 'Technology'
  },
];

const News = () => {
  const [news, setNews] = useState(mockNews);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'Vulnerability', name: 'Vulnerabilities' },
    { id: 'Ransomware', name: 'Ransomware' },
    { id: 'Data Breach', name: 'Data Breaches' },
    { id: 'Phishing', name: 'Phishing' },
    { id: 'Government', name: 'Government' },
    { id: 'Technology', name: 'Technology' },
  ];
  
  // Filter news based on selected category
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);
  
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
          
          {/* Categories */}
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
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(article => (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={article.id}
                className="cyber-card group hover:shadow-neon-blue transition-all duration-300"
              >
                <div className="relative h-48 mb-4 overflow-hidden border border-cyber-blue">
                  <img 
                    src={article.image} 
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
                      <span>{article.date}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime} read</span>
                    </div>
                    
                    <div className="flex items-center text-cyber-blue">
                      <span>Read</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
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
