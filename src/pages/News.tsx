
import React, { useState, useEffect } from 'react';
import CyberHeader from '../components/CyberHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Calendar, Clock, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Types for our news data
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
    
    // Set up real-time subscription for news updates
    const channel = supabase
      .channel('public:news_articles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'news_articles' }, 
        (payload) => {
          console.log('Real-time update:', payload);
          // Refresh news data when there are changes
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
      
      if (data && data.length > 0) {
        setNews(data as NewsArticle[]);
      } else {
        // If no data exists yet, use the mock data
        insertMockData();
      }
    } catch (error: any) {
      console.error('Error fetching news:', error);
      setError(error.message || 'Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  };
  
  // Insert mock data if no news articles exist yet
  const insertMockData = async () => {
    const mockNewsData = [
      {
        title: 'Critical Vulnerability Discovered in Popular Software',
        summary: 'Security researchers have found a zero-day vulnerability affecting millions of users worldwide. The flaw allows attackers to execute remote code and gain system privileges.',
        content: 'Security researchers at a leading cybersecurity firm have discovered a critical zero-day vulnerability in widely-used software that could potentially affect millions of users worldwide. The vulnerability, tracked as CVE-2023-XXXXX, allows attackers to execute arbitrary code remotely and escalate privileges on affected systems.\n\nThe affected software is used by many Fortune 500 companies and government agencies, making this vulnerability particularly concerning. Experts are urging users to update their systems immediately as patches have been released.\n\n"This is one of the most serious vulnerabilities we've seen this year," said the lead researcher. "The ease of exploitation combined with the widespread use of this software creates a perfect storm for attackers."',
        source: 'CyberNews',
        author: 'Jane Smith',
        category: 'Vulnerability',
        image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date().toISOString()
      },
      {
        title: 'New Ransomware Strain Targets Healthcare Organizations',
        summary: 'A sophisticated ransomware campaign is specifically targeting hospitals and healthcare providers. The attack encrypts patient records and demands substantial cryptocurrency payments.',
        content: 'A new, highly sophisticated ransomware strain dubbed "MediLock" has been observed targeting healthcare organizations across North America and Europe. This ransomware variant specifically targets electronic health record systems and medical imaging databases.\n\nUnlike previous ransomware attacks, MediLock appears to be surgically precise in its targeting, suggesting the attackers have deep knowledge of healthcare IT infrastructure. The ransomware encrypts patient records and medical images, rendering them inaccessible until a ransom is paid in cryptocurrency.\n\nCybersecurity experts are warning that this campaign appears to be the work of a nation-state backed group rather than conventional cybercriminals, raising concerns about potential data exfiltration beyond the encryption attack.',
        source: 'Security Weekly',
        author: 'Michael Chen',
        category: 'Ransomware',
        image_url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Government Issues Advisory on State-Sponsored Hacking',
        summary: 'The Cybersecurity and Infrastructure Security Agency (CISA) has released a joint advisory warning about increased state-sponsored cyber operations targeting critical infrastructure.',
        content: 'The Cybersecurity and Infrastructure Security Agency (CISA), in coordination with the FBI and NSA, has issued a joint advisory warning of sophisticated, persistent threats from state-sponsored threat actors targeting critical infrastructure sectors.\n\nAccording to the advisory, these advanced persistent threat (APT) groups are exploiting known vulnerabilities in internet-facing systems, deploying custom malware, and using advanced social engineering techniques to breach sensitive networks.\n\nThe sectors most at risk include energy, water, transportation, and communications. The advisory contains detailed technical indicators of compromise and recommended mitigation strategies for organizations in these sectors.\n\n"These are not opportunistic attacks," said the CISA Director. "These are calculated campaigns designed to gain persistent access to critical systems."',
        source: 'Tech Security Today',
        author: 'Robert Johnson',
        category: 'Government',
        image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Major Data Breach Exposes Millions of User Records',
        summary: 'A popular online service has confirmed a massive data breach affecting over 50 million users. Exposed data includes email addresses, passwords, and personal information.',
        content: 'A major online service provider has confirmed that it suffered a significant data breach affecting approximately 50 million users worldwide. The breach was discovered after user data appeared for sale on a dark web marketplace.\n\nAccording to the company\'s statement, the breach occurred due to an API vulnerability that has since been patched. The exposed data includes email addresses, hashed passwords, names, phone numbers, and in some cases, payment information.\n\nCybersecurity researchers who have analyzed samples of the leaked data confirm its authenticity and warn that despite the passwords being hashed, weaker passwords could be cracked using modern computing resources.\n\nThe company is requiring password resets for all users and has enabled mandatory two-factor authentication. They are also offering free credit monitoring for affected users.',
        source: 'Breach Report',
        author: 'Sarah Williams',
        category: 'Data Breach',
        image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'New Phishing Campaign Targets Remote Workers',
        summary: 'Security experts have identified a sophisticated phishing operation aimed at remote workers. The attack uses fake collaboration tool notifications to steal credentials.',
        content: 'Cybersecurity researchers have uncovered a sophisticated phishing campaign specifically targeting remote workers who use popular collaboration tools such as Slack, Microsoft Teams, and Google Workspace.\n\nThe phishing emails mimic notifications from these platforms, informing recipients that they have missed important messages or that their account requires attention. Users who click on the links are directed to convincing clone sites designed to harvest login credentials.\n\nWhat makes this campaign particularly effective is its use of context-aware social engineering. The attackers appear to have knowledge of organizational structures and ongoing projects, making their phishing attempts more convincing.\n\n"The level of research these attackers are doing before sending these phishing emails is unprecedented," noted a senior threat analyst. "They're crafting messages that reference real projects and colleagues."',
        source: 'Phishing Alert',
        author: 'David Kim',
        category: 'Phishing',
        image_url: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'AI-Powered Cybersecurity Solutions on the Rise',
        summary: 'The cybersecurity industry is increasingly turning to artificial intelligence to combat evolving threats. New AI-powered tools can detect anomalies and respond to incidents faster than human analysts.',
        content: 'The cybersecurity industry is witnessing a significant shift toward AI-powered security solutions as organizations struggle to keep pace with the volume and sophistication of modern threats.\n\nThese next-generation security platforms employ machine learning algorithms to establish baseline network behavior and identify anomalies that might indicate a breach. Unlike traditional signature-based systems, AI security tools can detect previously unknown threats based on behavioral analysis.\n\nA recent industry report indicates that organizations implementing AI-powered security solutions have reduced their breach detection time by an average of 73% and have experienced 45% fewer successful attacks compared to those using conventional security measures.\n\n"The volume of threats has simply outpaced human capability," explained a cybersecurity executive. "AI doesn\'t replace human analysts, but it dramatically expands what they can monitor and how quickly they can respond."',
        source: 'Tech Innovations',
        author: 'Lisa Chen',
        category: 'Technology',
        image_url: 'https://images.unsplash.com/photo-1676288173684-d19c075c6e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    try {
      // Insert mock data into the news_articles table
      const { error } = await supabase
        .from('news_articles')
        .insert(mockNewsData);

      if (error) {
        throw error;
      }

      // Fetch the newly inserted mock data
      fetchNews();
    } catch (error: any) {
      console.error('Error inserting mock news data:', error);
      setError(error.message || 'Failed to initialize news data');
    }
  };
  
  // Filter news based on selected category
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Estimate read time based on content length
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
          
          {/* Refresh button and loading indicator */}
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
          
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 text-red-300 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
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
