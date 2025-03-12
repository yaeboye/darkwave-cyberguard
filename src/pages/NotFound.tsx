
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import TerminalText from '../components/TerminalText';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-4">
      <div className="scanline"></div>
      
      <div className="cyber-card max-w-md w-full mx-auto text-center p-8">
        <AlertTriangle className="h-16 w-16 text-cyber-red mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-5xl font-cyber font-bold mb-6">
          <GlitchText text="404" className="neon-text-red" intensity="high" />
        </h1>
        
        <TerminalText
          text="ACCESS DENIED: The requested resource could not be found on this server."
          className="text-cyber-red mb-6"
          typingSpeed={20}
        />
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="cyber-button inline-flex items-center justify-center w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Main Terminal
        </Link>
        
        <div className="mt-6 text-xs text-gray-600 font-cyber">
          <span className="text-cyber-blue">Error code:</span> 404 Not Found
        </div>
      </div>
    </div>
  );
};

export default NotFound;
