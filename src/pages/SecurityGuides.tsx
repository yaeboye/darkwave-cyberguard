
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Shield, Lock, Smartphone, Globe, Wifi, Mail, Eye, Users } from 'lucide-react';
import CyberHeader from '../components/CyberHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SecurityGuides = () => {
  const guides = [
    {
      id: 'password-security',
      title: 'Creating Strong Passwords',
      description: 'Learn how to create and manage secure passwords that are difficult to crack but easy to remember.',
      icon: <Lock className="h-10 w-10 text-cyber-blue" />,
      category: 'Password Security',
      readTime: '5 min read',
      level: 'Beginner'
    },
    {
      id: 'phishing-prevention',
      title: 'Recognizing Phishing Attempts',
      description: 'Discover the warning signs of phishing attacks and learn how to protect yourself from these common threats.',
      icon: <Mail className="h-10 w-10 text-cyber-red" />,
      category: 'Social Engineering',
      readTime: '8 min read',
      level: 'Intermediate'
    },
    {
      id: 'two-factor-authentication',
      title: 'Setting Up Two-Factor Authentication',
      description: 'Add an extra layer of security to your accounts by implementing two-factor authentication.',
      icon: <Smartphone className="h-10 w-10 text-cyber-green" />,
      category: 'Account Security',
      readTime: '6 min read',
      level: 'Beginner'
    },
    {
      id: 'public-wifi-safety',
      title: 'Staying Safe on Public Wi-Fi',
      description: 'Protect your data when using public networks with these essential security practices.',
      icon: <Wifi className="h-10 w-10 text-cyber-yellow" />,
      category: 'Network Security',
      readTime: '7 min read',
      level: 'Intermediate'
    },
    {
      id: 'browser-security',
      title: 'Securing Your Web Browser',
      description: 'Configure your browser settings and extensions for maximum security while browsing online.',
      icon: <Globe className="h-10 w-10 text-cyber-purple" />,
      category: 'Browser Security',
      readTime: '10 min read',
      level: 'Intermediate'
    },
    {
      id: 'privacy-settings',
      title: 'Optimizing Privacy Settings',
      description: 'Take control of your digital privacy by properly configuring settings on your accounts and devices.',
      icon: <Eye className="h-10 w-10 text-cyber-blue" />,
      category: 'Privacy',
      readTime: '12 min read',
      level: 'Advanced'
    },
    {
      id: 'social-media-security',
      title: 'Social Media Security',
      description: 'Best practices for keeping your social media accounts secure and your personal information private.',
      icon: <Users className="h-10 w-10 text-cyber-pink" />,
      category: 'Social Media',
      readTime: '8 min read',
      level: 'Beginner'
    },
    {
      id: 'device-security',
      title: 'Securing Your Devices',
      description: 'Essential steps to protect your computers, smartphones, and other devices from cyber threats.',
      icon: <Shield className="h-10 w-10 text-cyber-green" />,
      category: 'Device Security',
      readTime: '9 min read',
      level: 'Intermediate'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6">
          <CyberHeader 
            title="Security Guides" 
            subtitle="Comprehensive guides and tutorials to help you stay secure in the digital world."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {guides.map((guide) => (
              <div key={guide.id} className="cyber-card group h-full">
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-cyber-darkgray px-3 py-1 rounded-full text-xs text-gray-300">{guide.category}</span>
                    <span className="text-xs text-gray-400">{guide.readTime}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  {guide.icon}
                </div>
                
                <h3 className="font-cyber text-xl font-semibold mb-2 text-white group-hover:text-cyber-blue transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {guide.description}
                </p>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    guide.level === 'Beginner' ? 'bg-green-900 text-green-400' :
                    guide.level === 'Intermediate' ? 'bg-blue-900 text-blue-400' :
                    'bg-purple-900 text-purple-400'
                  }`}>
                    {guide.level}
                  </span>
                  
                  <Link to={`/guides/${guide.id}`} className="flex items-center text-cyber-blue hover:text-cyber-purple transition-colors">
                    <span className="mr-1">Read Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 cyber-card text-center py-8">
            <FileText className="h-12 w-12 text-cyber-green mx-auto mb-4" />
            <h3 className="font-cyber text-2xl mb-3">Need More Specific Guidance?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Our team is continuously developing new security guides based on the latest cybersecurity trends and threats.
              Check back regularly for new content or subscribe to our newsletter.
            </p>
            <Link to="/contact" className="cyber-button bg-cyber-green text-black hover:text-black inline-flex items-center">
              Request a Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityGuides;
