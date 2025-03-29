
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, AlertTriangle, Wrench, ChevronRight, Key } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import TerminalText from '../components/TerminalText';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrendingThreats from '../components/TrendingThreats';

const Index = () => {
  const [showTerminalText, setShowTerminalText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTerminalText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-cyber-black">
          <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
                  <GlitchText 
                    text="CYBER" 
                    className="neon-text-blue" 
                    delay={300}
                  />
                  <GlitchText 
                    text="GUARD" 
                    className="neon-text-pink" 
                    delay={600}
                  />
                </h1>
                
                {showTerminalText && (
                  <TerminalText
                    text="Advanced cybersecurity tools for the modern digital landscape. Protect your digital identity with our cutting-edge security suite."
                    className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
                  />
                )}
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/tools" className="cyber-button flex items-center justify-center bg-cyber-blue text-black hover:text-black">
                    <Wrench className="mr-2 h-5 w-5" />
                    Explore Tools
                  </Link>
                </div>
              </div>
              
              <div className="md:w-2/5">
                <div className="relative">
                  <div className="p-1 border border-cyber-blue rounded-lg overflow-hidden bg-cyber-darkgray shadow-neon-blue">
                    <div className="bg-black p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 text-xs text-gray-500">[root@cyberguard] ~ #</div>
                      </div>
                      
                      <TerminalText
                        text="Initializing security protocols..."
                        className="text-cyber-green mb-2"
                        typingSpeed={30}
                        delay={0}
                      />
                      
                      <TerminalText
                        text="Loading encryption modules..."
                        className="text-cyber-yellow mb-2"
                        typingSpeed={30}
                        delay={1000}
                      />
                      
                      <TerminalText
                        text="Scanning for vulnerabilities..."
                        className="text-cyber-pink mb-2"
                        typingSpeed={30}
                        delay={2000}
                      />
                      
                      <TerminalText
                        text="System secured. Welcome to CyberGuard."
                        className="text-cyber-blue font-bold"
                        typingSpeed={30}
                        delay={3000}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-cyber-darkgray">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-cyber text-3xl font-bold mb-4">
                <span className="neon-text-blue">Advanced Security</span>{" "}
                <span className="neon-text-pink">Tools</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                CyberGuard offers a comprehensive suite of cybersecurity tools to protect your digital identity and secure your online presence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <Lock className="h-8 w-8 text-cyber-blue mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Password Tools</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Generate strong passwords and analyze your existing ones for vulnerabilities.
                </p>
                <Link to="/tools/password-generator" className="flex items-center text-cyber-blue hover:text-cyber-purple transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <Key className="h-8 w-8 text-cyber-green mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Password Manager</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Securely store and organize all your passwords in an encrypted vault.
                </p>
                <Link to="/tools/password-manager" className="flex items-center text-cyber-green hover:text-cyber-blue transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-cyber-purple mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Encryption Suite</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Encrypt and decrypt sensitive data using industry-standard algorithms.
                </p>
                <Link to="/tools/encryption" className="flex items-center text-cyber-purple hover:text-cyber-blue transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-cyber-red mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Threat Detection</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Scan for phishing attempts, malware, and other cyber threats.
                </p>
                <Link to="/tools/threat-detection" className="flex items-center text-cyber-red hover:text-cyber-blue transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-cyber-green mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Security Guides</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Browse comprehensive guides on cybersecurity best practices.
                </p>
                <Link to="/guides" className="flex items-center text-cyber-green hover:text-cyber-blue transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="cyber-card group">
                <div className="flex items-center mb-4">
                  <Wrench className="h-8 w-8 text-cyber-yellow mr-3" />
                  <h3 className="font-cyber text-xl font-semibold text-white">Hash Generator</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Create and verify cryptographic hashes using various algorithms.
                </p>
                <Link to="/tools/hash-generator" className="flex items-center text-cyber-yellow hover:text-cyber-blue transition-colors">
                  Explore
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Threats Section */}
        <TrendingThreats />
        
        {/* CTA Section */}
        <section className="py-20 bg-cyber-black relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-cyber text-3xl md:text-4xl font-bold mb-6">
                <span className="neon-text-purple">Ready to secure</span>{" "}
                <span className="neon-text-blue">your digital future?</span>
              </h2>
              
              <p className="text-gray-400 mb-8 text-lg">
                Start using CyberGuard today and access our full suite of advanced cybersecurity tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/tools" className="cyber-button">
                  Explore Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
