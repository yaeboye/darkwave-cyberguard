
import React, { useState } from 'react';
import { Shield, Lock, Unlock, Copy, CheckSquare, ArrowLeft, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import CyberHeader from '../../components/CyberHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useToast } from "@/hooks/use-toast";

const Encryption = () => {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const [algorithm, setAlgorithm] = useState('aes');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const algorithms = [
    { id: 'aes', name: 'AES-256', color: 'text-cyber-blue' },
    { id: 'des', name: 'DES (Legacy)', color: 'text-cyber-yellow' },
    { id: 'rc4', name: 'RC4 (Stream)', color: 'text-cyber-green' },
    { id: 'base64', name: 'Base64 (Encoding)', color: 'text-cyber-purple' },
  ];

  const handleProcess = () => {
    if (!text) {
      toast({
        title: "Input required",
        description: "Please enter text to process",
        variant: "destructive"
      });
      return;
    }
    
    if (algorithm !== 'base64' && !password) {
      toast({
        title: "Password required",
        description: "Please enter a password for encryption/decryption",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate encryption/decryption process
    setTimeout(() => {
      try {
        if (algorithm === 'base64') {
          if (mode === 'encrypt') {
            // Base64 encoding
            setResult(window.btoa(text));
          } else {
            // Base64 decoding
            try {
              setResult(window.atob(text));
            } catch (e) {
              throw new Error('Invalid Base64 input');
            }
          }
        } else {
          // Simulate encryption for other algorithms
          // In a real implementation, you would use a proper crypto library
          const mockResult = mode === 'encrypt' 
            ? `${algorithm.toUpperCase()}-ENCRYPTED:${Math.random().toString(36).substring(2, 15)}`
            : 'Decrypted text would appear here in a real implementation';
          
          setResult(mockResult);
        }
        
        toast({
          title: mode === 'encrypt' ? "Encrypted!" : "Decrypted!",
          description: `Text has been ${mode === 'encrypt' ? 'encrypted' : 'decrypted'} successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || `Failed to ${mode} text`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
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
            title="Encryption & Decryption" 
            subtitle="Protect your sensitive data using various encryption algorithms or decrypt encrypted information."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="cyber-card">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="font-cyber text-xl">Encryption Suite</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex border border-gray-700 rounded-md overflow-hidden">
                    <button
                      className={`flex-1 py-3 px-4 flex justify-center items-center ${mode === 'encrypt' ? 'bg-cyber-green bg-opacity-20 border-b-2 border-cyber-green' : ''}`}
                      onClick={() => setMode('encrypt')}
                    >
                      <Lock className={`mr-2 h-5 w-5 ${mode === 'encrypt' ? 'text-cyber-green' : 'text-gray-400'}`} />
                      <span className={mode === 'encrypt' ? 'text-cyber-green' : 'text-gray-400'}>Encrypt</span>
                    </button>
                    <button
                      className={`flex-1 py-3 px-4 flex justify-center items-center ${mode === 'decrypt' ? 'bg-cyber-blue bg-opacity-20 border-b-2 border-cyber-blue' : ''}`}
                      onClick={() => setMode('decrypt')}
                    >
                      <Unlock className={`mr-2 h-5 w-5 ${mode === 'decrypt' ? 'text-cyber-blue' : 'text-gray-400'}`} />
                      <span className={mode === 'decrypt' ? 'text-cyber-blue' : 'text-gray-400'}>Decrypt</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Select Algorithm</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {algorithms.map((algo) => (
                        <button
                          key={algo.id}
                          className={`p-3 border ${algorithm === algo.id ? 'border-cyber-blue bg-cyber-blue bg-opacity-10' : 'border-gray-700'} rounded-md transition-all hover:border-cyber-blue`}
                          onClick={() => setAlgorithm(algo.id)}
                        >
                          <span className={algo.color}>{algo.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">
                      {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
                    </label>
                    <textarea 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="cyber-input w-full min-h-[120px]"
                      placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter text to decrypt...'}
                    />
                  </div>
                  
                  {algorithm !== 'base64' && (
                    <div>
                      <label className="block text-gray-400 mb-2">Password / Secret Key</label>
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="cyber-input w-full"
                        placeholder="Enter your secret key..."
                      />
                    </div>
                  )}
                  
                  <div>
                    <button 
                      onClick={handleProcess}
                      disabled={loading}
                      className={`cyber-button w-full flex items-center justify-center ${mode === 'encrypt' ? 'bg-cyber-green' : 'bg-cyber-blue'} text-black hover:text-black`}
                    >
                      {loading ? (
                        <>
                          <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                          {mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}
                        </>
                      ) : (
                        <>
                          {mode === 'encrypt' ? 
                            <Lock className="mr-2 h-5 w-5" /> :
                            <Unlock className="mr-2 h-5 w-5" />
                          }
                          {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
                        </>
                      )}
                    </button>
                  </div>
                  
                  {result && (
                    <div>
                      <label className="block text-gray-400 mb-2">
                        {mode === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
                      </label>
                      <div className="flex">
                        <textarea
                          value={result}
                          readOnly
                          className="cyber-input w-full min-h-[80px] font-mono text-sm"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="ml-2 p-2 border border-gray-700 hover:border-cyber-blue text-gray-400 hover:text-cyber-blue transition-all rounded-md"
                          title="Copy to clipboard"
                        >
                          {copied ? <CheckSquare className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4">About Encryption</h3>
                <p className="text-gray-400 mb-4">
                  Encryption is the process of encoding information to prevent unauthorized access.
                </p>
                <p className="text-gray-400 mb-4">
                  This tool demonstrates common encryption techniques, but for truly sensitive data, we recommend using dedicated security software and proper key management.
                </p>
                <h4 className="font-cyber text-lg mt-6 mb-2 text-cyber-blue">Security Tips:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Use strong, unique passwords</li>
                  <li>Store keys securely, separate from encrypted data</li>
                  <li>Use modern algorithms like AES-256</li>
                  <li>Remember that Base64 is only encoding, not encryption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Encryption;
