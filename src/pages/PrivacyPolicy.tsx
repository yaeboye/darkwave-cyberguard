
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import CyberHeader from '@/components/CyberHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-6">
            <Link to="/" className="flex items-center text-gray-400 hover:text-cyber-blue transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <CyberHeader 
            title="Privacy Policy" 
            subtitle="How we collect, use, and protect your information"
          />
          
          <div className="cyber-card space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Introduction</h2>
              <p className="text-gray-300">
                At CyberGuard, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, and protect your personal information when you use our services.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Information We Collect</h2>
              <p className="text-gray-300">
                We collect information that you provide directly to us, such as when you create an account, 
                use our password manager, or contact us for support.
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Account information: email address and encrypted password</li>
                <li>Password vault data: all password data is encrypted end-to-end</li>
                <li>Usage data: how you interact with our services</li>
                <li>Feedback and communications</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">How We Use Your Information</h2>
              <p className="text-gray-300">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate security measures to protect your personal information. All sensitive 
                data, including passwords stored in your vault, are encrypted using industry-standard algorithms.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-cyber-blue">privacy@cyberguard.example.com</p>
            </div>
            
            <div className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
