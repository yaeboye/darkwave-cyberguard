
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import CyberHeader from '@/components/CyberHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
            title="Terms of Service" 
            subtitle="Rules and guidelines for using CyberGuard"
          />
          
          <div className="cyber-card space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using CyberGuard services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Use of Services</h2>
              <p className="text-gray-300">
                Our services are designed to help you improve your cybersecurity posture. You agree to use our
                services only for lawful purposes and in accordance with these Terms.
              </p>
              <p className="text-gray-300">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Prohibited Activities</h2>
              <p className="text-gray-300">
                When using our services, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our services</li>
                <li>Transmit any malicious code or harmful content</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Intellectual Property</h2>
              <p className="text-gray-300">
                All content, features, and functionality of our services are owned by CyberGuard and are protected
                by copyright, trademark, and other intellectual property laws.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Disclaimer of Warranties</h2>
              <p className="text-gray-300">
                Our services are provided on an "as is" and "as available" basis. CyberGuard makes no warranties,
                express or implied, regarding the reliability, availability, or security of our services.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-cyber text-cyber-blue">Changes to Terms</h2>
              <p className="text-gray-300">
                We may update these Terms from time to time. We will notify you of any changes by posting the new
                Terms on this page and updating the "Last updated" date.
              </p>
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

export default TermsOfService;
