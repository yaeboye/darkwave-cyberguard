
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Check, X, AlertTriangle, Info, Eye, EyeOff, ArrowLeft
} from 'lucide-react';
import CyberHeader from '../../components/CyberHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  
  // Password criteria
  const criteria = [
    { id: 'length', label: 'At least 8 characters', valid: false },
    { id: 'uppercase', label: 'Contains uppercase letters', valid: false },
    { id: 'lowercase', label: 'Contains lowercase letters', valid: false },
    { id: 'number', label: 'Contains numbers', valid: false },
    { id: 'special', label: 'Contains special characters', valid: false },
  ];
  
  // Update criteria validity based on password
  useEffect(() => {
    // Check password criteria
    criteria[0].valid = password.length >= 8;
    criteria[1].valid = /[A-Z]/.test(password);
    criteria[2].valid = /[a-z]/.test(password);
    criteria[3].valid = /[0-9]/.test(password);
    criteria[4].valid = /[^A-Za-z0-9]/.test(password);
    
    // Calculate strength (0-100)
    const validCriteriaCount = criteria.filter(c => c.valid).length;
    const newStrength = password.length > 0 ? (validCriteriaCount / criteria.length) * 100 : 0;
    setStrength(newStrength);
    
    // Generate feedback
    const newFeedback = [];
    
    if (password.length > 0) {
      if (password.length < 8) {
        newFeedback.push('Password is too short');
      }
      
      if (!/[A-Z]/.test(password)) {
        newFeedback.push('Add uppercase letters');
      }
      
      if (!/[a-z]/.test(password)) {
        newFeedback.push('Add lowercase letters');
      }
      
      if (!/[0-9]/.test(password)) {
        newFeedback.push('Add numbers');
      }
      
      if (!/[^A-Za-z0-9]/.test(password)) {
        newFeedback.push('Add special characters');
      }
      
      // Check for common patterns
      if (/^(123|abc|qwerty|password|admin|letmein)/i.test(password)) {
        newFeedback.push('Avoid common patterns');
      }
      
      if (password.length > 0 && validCriteriaCount === criteria.length) {
        newFeedback.push('Strong password! Good job!');
      }
    }
    
    setFeedback(newFeedback);
  }, [password]);
  
  // Get strength label and color
  const getStrengthInfo = () => {
    if (strength === 0) return { label: 'None', color: 'gray-500' };
    if (strength < 40) return { label: 'Weak', color: 'cyber-red' };
    if (strength < 80) return { label: 'Moderate', color: 'cyber-yellow' };
    return { label: 'Strong', color: 'cyber-green' };
  };
  
  const strengthInfo = getStrengthInfo();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Link to="/tools" className="flex items-center text-gray-400 hover:text-cyber-blue transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Tools</span>
            </Link>
          </div>
          
          <CyberHeader 
            title="Password Strength Checker" 
            subtitle="Analyze your password to determine its strength and security. We don't store or transmit your password - all checks are performed locally in your browser."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-6 neon-text-blue">Enter Password to Check</h3>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="cyber-input w-full pr-10"
                      placeholder="Enter password to analyze"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-blue"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Strength:</span>
                    <span className={`text-${strengthInfo.color}`}>{strengthInfo.label}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${strengthInfo.color} transition-all duration-500`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                </div>
                
                {password.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-cyber text-lg mb-3 text-white">Feedback:</h4>
                    <ul className="space-y-2">
                      {feedback.map((item, index) => (
                        <li 
                          key={index} 
                          className={`flex items-start space-x-2 ${
                            item.includes('Strong password') 
                              ? 'text-cyber-green' 
                              : 'text-cyber-red'
                          }`}
                        >
                          {item.includes('Strong password') ? (
                            <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          )}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="font-cyber text-lg mb-3 text-white">Password Requirements:</h4>
                  <ul className="space-y-3">
                    {criteria.map((criterion) => (
                      <li 
                        key={criterion.id}
                        className={`flex items-center ${
                          password.length === 0 
                            ? 'text-gray-500' 
                            : criterion.valid 
                              ? 'text-cyber-green' 
                              : 'text-cyber-red'
                        }`}
                      >
                        {password.length === 0 ? (
                          <Info className="h-5 w-5 mr-2" />
                        ) : criterion.valid ? (
                          <Check className="h-5 w-5 mr-2" />
                        ) : (
                          <X className="h-5 w-5 mr-2" />
                        )}
                        <span>{criterion.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <div className="cyber-card mb-6">
                <h3 className="font-cyber text-xl mb-4 neon-text-pink">Password Tips</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-cyber-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Never use the same password for multiple accounts.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-cyber-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Avoid using personal information like birthdays or names.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-cyber-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use a password manager to store and generate strong passwords.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-cyber-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Change passwords regularly, especially for sensitive accounts.</span>
                  </li>
                </ul>
              </div>
              
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4 neon-text-purple">Need a Better Password?</h3>
                <p className="text-gray-400 mb-4">
                  Use our secure password generator to create strong, unique passwords.
                </p>
                <Link to="/tools/password-generator" className="cyber-button w-full flex items-center justify-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Generate Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PasswordChecker;
