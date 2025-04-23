
import React from 'react';
import { AlertTriangle, TrendingUp, Bug, Shield, ArrowUpRight, Zap } from 'lucide-react';

interface Threat {
  id: number;
  name: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'stable' | 'down';
}

const TrendingThreats = () => {
  const threats: Threat[] = [
    {
      id: 1,
      name: 'Ransomware Attacks',
      level: 'critical',
      description: 'Rising ransomware attacks targeting healthcare and education sectors',
      icon: <Zap className="h-5 w-5 text-cyber-pink" />,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Zero-Day Exploits',
      level: 'high',
      description: 'Critical vulnerabilities discovered in popular web browsers',
      icon: <Bug className="h-5 w-5 text-cyber-yellow" />,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Phishing Campaigns',
      level: 'high',
      description: 'Sophisticated phishing attempts impersonating financial institutions',
      icon: <AlertTriangle className="h-5 w-5 text-cyber-red" />,
      trend: 'stable'
    },
    {
      id: 4,
      name: 'Supply Chain Attacks',
      level: 'medium',
      description: 'Emerging threats targeting third-party software dependencies',
      icon: <Shield className="h-5 w-5 text-cyber-green" />,
      trend: 'up'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-900 text-red-200';
      case 'high':
        return 'bg-orange-900 text-orange-200';
      case 'medium':
        return 'bg-yellow-900 text-yellow-200';
      case 'low':
        return 'bg-green-900 text-green-200';
      default:
        return 'bg-blue-900 text-blue-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="ml-1 h-3 w-3 text-red-400" />;
      case 'down':
        return <TrendingUp className="ml-1 h-3 w-3 text-green-400 transform rotate-180" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-cyber-black relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="font-cyber text-3xl font-bold mb-2">
              <span className="neon-text-blue">Trending</span>{" "}
              <span className="neon-text-pink">Threats</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Stay ahead of emerging cybersecurity threats and vulnerabilities.
            </p>
          </div>
          
          <a href="/threats" className="mt-4 md:mt-0 cyber-button flex items-center">
            <ArrowUpRight className="mr-2 h-5 w-5" />
            View All Threats
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {threats.map((threat) => (
            <div 
              key={threat.id} 
              className="cyber-card group transition-all duration-200 hover:border-cyber-pink"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {threat.icon}
                  <span className={`ml-2 text-xs py-1 px-2 rounded ${getLevelColor(threat.level)}`}>
                    {threat.level.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <span>Trend</span>
                  {getTrendIcon(threat.trend)}
                </div>
              </div>
              
              <h3 className="font-cyber text-lg text-white mb-2 group-hover:text-cyber-pink transition-colors">
                {threat.name}
              </h3>
              
              <p className="text-gray-400 text-sm">
                {threat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingThreats;
