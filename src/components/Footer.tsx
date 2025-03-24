
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-darkgray border-t border-cyber-blue mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-cyber-blue" />
              <span className="font-cyber font-bold text-lg neon-text-blue">CYBER<span className="neon-text-pink">GUARD</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Securing your digital future with cutting-edge cybersecurity tools and resources.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-cyber text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyber-blue transition-colors">Home</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-cyber-blue transition-colors">Tools</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-cyber-blue transition-colors">News</Link></li>
              <li><Link to="/auth" className="text-gray-400 hover:text-cyber-blue transition-colors">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-cyber text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/password-checker" className="text-gray-400 hover:text-cyber-blue transition-colors">Password Checker</Link></li>
              <li><Link to="/tools/password-generator" className="text-gray-400 hover:text-cyber-blue transition-colors">Password Generator</Link></li>
              <li><Link to="/tools/password-manager" className="text-gray-400 hover:text-cyber-blue transition-colors">Password Manager</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-cyber text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/not-found" className="text-gray-400 hover:text-cyber-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/not-found" className="text-gray-400 hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/feedback" className="text-gray-400 hover:text-cyber-blue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CyberGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
