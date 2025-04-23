
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Shield, Hash, FileText, AlertTriangle, 
  QrCode, Key, Globe, Search, Database, Wrench
} from 'lucide-react';
import CyberHeader from '../components/CyberHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Tools = () => {
  const tools = [
    {
      id: 'password-checker',
      title: 'Password Strength Checker',
      description: 'Analyze your passwords for strength and vulnerability.',
      icon: <Lock className="h-10 w-10 text-cyber-blue" />,
      color: 'blue',
      link: '/tools/password-checker'
    },
    {
      id: 'password-generator',
      title: 'Password Generator',
      description: 'Create strong, secure passwords with custom options.',
      icon: <Key className="h-10 w-10 text-cyber-pink" />,
      color: 'pink',
      link: '/tools/password-generator'
    },
    {
      id: 'hash-generator',
      title: 'Hash Generator',
      description: 'Generate cryptographic hashes using various algorithms.',
      icon: <Hash className="h-10 w-10 text-cyber-purple" />,
      color: 'purple',
      link: '/tools/hash-generator'
    },
    {
      id: 'encryption',
      title: 'Encryption & Decryption',
      description: 'Secure your data with AES, RSA, and Base64 encryption.',
      icon: <Shield className="h-10 w-10 text-cyber-green" />,
      color: 'green',
      link: '/tools/encryption'
    },
    {
      id: 'qr-code',
      title: 'QR Code Generator',
      description: 'Create QR codes for websites, contacts, and more.',
      icon: <QrCode className="h-10 w-10 text-cyber-yellow" />,
      color: 'yellow',
      link: '/tools/qr-code'
    },
    {
      id: 'phishing-checker',
      title: 'Phishing Link Checker',
      description: 'Verify if a URL is a potential phishing threat.',
      icon: <AlertTriangle className="h-10 w-10 text-cyber-red" />,
      color: 'red',
      link: '/tools/phishing-checker'
    },
    {
      id: 'data-breach',
      title: 'Data Leak Checker',
      description: 'Check if your information has been exposed in data breaches.',
      icon: <Database className="h-10 w-10 text-cyber-blue" />,
      color: 'blue',
      link: '/tools/data-breach'
    },
    {
      id: 'ip-checker',
      title: 'IP Address Checker',
      description: 'Get details about an IP address, including geolocation.',
      icon: <Globe className="h-10 w-10 text-cyber-pink" />,
      color: 'pink',
      link: '/tools/ip-checker'
    },
    {
      id: 'vulnerability-scanner',
      title: 'Website Vulnerability Scanner',
      description: 'Scan for basic web vulnerabilities and security issues.',
      icon: <Search className="h-10 w-10 text-cyber-purple" />,
      color: 'purple',
      link: '/tools/vulnerability-scanner'
    },
    {
      id: 'dark-web',
      title: 'Dark Web Exposure Checker',
      description: 'Find out if your data is exposed on the dark web.',
      icon: <FileText className="h-10 w-10 text-cyber-red" />,
      color: 'red',
      link: '/tools/dark-web'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6">
          <CyberHeader 
            title="Security Tools" 
            subtitle="Explore our collection of advanced cybersecurity tools to protect your digital identity and secure your online presence."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link 
                key={tool.id}
                to={tool.link}
                className="cyber-card group h-full transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-center mb-4">
                  {tool.icon}
                  <h3 className={`font-cyber text-xl font-semibold ml-3 text-cyber-${tool.color}`}>
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-6">
                  {tool.description}
                </p>
                <div className={`flex justify-end text-cyber-${tool.color} mt-auto`}>
                  <Wrench className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
