
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Monitor, Cpu, Terminal, FileText, Wrench, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cyber-black border-b border-cyber-blue bg-opacity-80 backdrop-blur-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyber-blue animate-glow-pulse" />
            <span className="font-cyber font-bold text-xl neon-text-blue">CYBER<span className="neon-text-pink">GUARD</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-cyber text-white hover:text-cyber-blue transition-colors flex items-center">
              <Monitor className="mr-1 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/tools" className="font-cyber text-white hover:text-cyber-blue transition-colors flex items-center">
              <Wrench className="mr-1 h-4 w-4" />
              <span>Tools</span>
            </Link>
            <Link to="/news" className="font-cyber text-white hover:text-cyber-blue transition-colors flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              <span>News</span>
            </Link>
            <Link to="/login" className="cyber-button flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-cyber-blue hover:text-cyber-purple transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cyber-darkgray border-b border-cyber-blue animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="block font-cyber py-2 px-4 text-white hover:bg-cyber-blue hover:bg-opacity-20 transition-all flex items-center"
              onClick={toggleMenu}
            >
              <Monitor className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/tools" 
              className="block font-cyber py-2 px-4 text-white hover:bg-cyber-blue hover:bg-opacity-20 transition-all flex items-center"
              onClick={toggleMenu}
            >
              <Wrench className="mr-2 h-4 w-4" />
              <span>Tools</span>
            </Link>
            <Link 
              to="/news" 
              className="block font-cyber py-2 px-4 text-white hover:bg-cyber-blue hover:bg-opacity-20 transition-all flex items-center"
              onClick={toggleMenu}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>News</span>
            </Link>
            <Link 
              to="/login" 
              className="block font-cyber py-2 px-4 text-cyber-blue hover:bg-cyber-blue hover:bg-opacity-20 transition-all flex items-center"
              onClick={toggleMenu}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
