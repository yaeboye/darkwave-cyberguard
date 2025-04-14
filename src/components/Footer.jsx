
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Linkedin, Mail, Newspaper } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyber-darkgray border-t border-cyber-blue mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-cyber-blue" />
              <span className="font-cyber font-bold text-lg neon-text-blue">Satvik's<span className="neon-text-pink">CyberGuard</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Securing your digital future with cutting-edge cybersecurity tools and resources.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/yaeboye" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/satvik-jindal-943275276" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:satvikj570@gmail.com" className="text-gray-400 hover:text-cyber-blue transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-cyber text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyber-blue transition-colors">Home</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-cyber-blue transition-colors">News</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-cyber-blue transition-colors">Tools</Link></li>
              <li><Link to="/feedback" className="text-gray-400 hover:text-cyber-blue transition-colors">Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-cyber text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-cyber-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-cyber-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-cyber-blue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Satvik Jindal's CyberGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
