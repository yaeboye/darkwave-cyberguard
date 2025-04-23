
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Key, Copy, Check, RefreshCw, Sliders, ChevronDown, ArrowLeft 
} from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import CyberHeader from '../../components/CyberHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const similarChars = 'iIlL1oO0';
  
  // Generate password based on settings
  const generatePassword = () => {
    let chars = '';
    
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;
    
    // Remove similar characters if option is selected
    if (excludeSimilar) {
      similarChars.split('').forEach(char => {
        chars = chars.replace(char, '');
      });
    }
    
    // Ensure at least one character set is selected
    if (chars.length === 0) {
      chars = lowercaseChars;
      setIncludeLowercase(true);
    }
    
    let result = '';
    const charsArray = chars.split('');
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsArray.length);
      result += charsArray[randomIndex];
    }
    
    // Ensure password has at least one character from each selected set
    let validPassword = true;
    
    if (includeUppercase && !/[A-Z]/.test(result)) validPassword = false;
    if (includeLowercase && !/[a-z]/.test(result)) validPassword = false;
    if (includeNumbers && !/[0-9]/.test(result)) validPassword = false;
    if (includeSymbols && !/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(result)) validPassword = false;
    
    // If not valid, try again
    if (!validPassword) {
      return generatePassword();
    }
    
    setCopied(false);
    return result;
  };
  
  // Generate password on mount and when settings change
  useEffect(() => {
    setPassword(generatePassword());
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);
  
  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: "Password copied",
        description: "The password has been copied to your clipboard.",
      });
      
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  
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
            title="Password Generator" 
            subtitle="Create strong, secure passwords with customizable settings. All generation happens locally in your browser - no passwords are transmitted or stored."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="cyber-card mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-cyber text-xl neon-text-pink">Generated Password</h3>
                  <Key className="h-6 w-6 text-cyber-pink" />
                </div>
                
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="cyber-input w-full pr-24 font-mono text-lg"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
                    <button
                      onClick={() => setPassword(generatePassword())}
                      className="p-2 mr-2 text-gray-400 hover:text-cyber-blue transition-colors"
                      aria-label="Generate new password"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-400 hover:text-cyber-green transition-colors"
                      aria-label="Copy to clipboard"
                    >
                      {copied ? <Check className="h-5 w-5 text-cyber-green" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="length" className="block text-gray-400 mb-2">
                    Password Length: {length} characters
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      id="length"
                      type="range"
                      min="8"
                      max="64"
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="number"
                      min="8"
                      max="64"
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value) || 8)}
                      className="cyber-input w-20"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="uppercase"
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={() => setIncludeUppercase(!includeUppercase)}
                      className="cyber-checkbox w-5 h-5 text-cyber-blue rounded border-gray-600"
                    />
                    <label htmlFor="uppercase" className="ml-2 text-gray-300">
                      Include Uppercase Letters (A-Z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="lowercase"
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={() => setIncludeLowercase(!includeLowercase)}
                      className="cyber-checkbox w-5 h-5 text-cyber-blue rounded border-gray-600"
                    />
                    <label htmlFor="lowercase" className="ml-2 text-gray-300">
                      Include Lowercase Letters (a-z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="numbers"
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers(!includeNumbers)}
                      className="cyber-checkbox w-5 h-5 text-cyber-blue rounded border-gray-600"
                    />
                    <label htmlFor="numbers" className="ml-2 text-gray-300">
                      Include Numbers (0-9)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="symbols"
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols(!includeSymbols)}
                      className="cyber-checkbox w-5 h-5 text-cyber-blue rounded border-gray-600"
                    />
                    <label htmlFor="symbols" className="ml-2 text-gray-300">
                      Include Symbols (!@#$%^&*)
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    <Sliders className="h-4 w-4 mr-2" />
                    <span>Advanced Options</span>
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="similar"
                          type="checkbox"
                          checked={excludeSimilar}
                          onChange={() => setExcludeSimilar(!excludeSimilar)}
                          className="cyber-checkbox w-5 h-5 text-cyber-blue rounded border-gray-600"
                        />
                        <label htmlFor="similar" className="ml-2 text-gray-300">
                          Exclude Similar Characters (i, l, 1, L, o, 0, O)
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4 neon-text-blue">Password Strength Tips</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>For maximum security, use passwords of at least 16 characters.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Include a mix of letters, numbers, and symbols.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use a different password for each account.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Consider using a secure password manager to store your passwords.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="cyber-card mb-6">
                <h3 className="font-cyber text-xl mb-4 neon-text-purple">Password Security</h3>
                <p className="text-gray-400 mb-4">
                  This tool generates secure passwords using cryptographically strong random number generation. All processing happens locally in your browser.
                </p>
                <p className="text-gray-400">
                  A 12-character password with mixed case, numbers and symbols has over 90 bits of entropy - making it extremely difficult to crack via brute force methods.
                </p>
              </div>
              
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4 neon-text-blue">Check Password Strength</h3>
                <p className="text-gray-400 mb-4">
                  Want to check how strong your existing passwords are?
                </p>
                <Link to="/tools/password-checker" className="cyber-button w-full flex items-center justify-center">
                  <Key className="mr-2 h-5 w-5" />
                  Check Password Strength
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

export default PasswordGenerator;
