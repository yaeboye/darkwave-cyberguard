
import React from 'react';
import { Shield } from 'lucide-react';

interface CyberHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const CyberHeader: React.FC<CyberHeaderProps> = ({ 
  title, 
  subtitle, 
  center = false 
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <div className="flex items-center mb-3 space-x-2">
        <Shield className="h-8 w-8 text-cyber-blue" />
        <h1 className="text-3xl md:text-4xl font-cyber font-bold">
          <span className="neon-text-blue">{title}</span>
        </h1>
      </div>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
    </div>
  );
};

export default CyberHeader;
