
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, Copy, CheckSquare, RefreshCw, ArrowLeft } from 'lucide-react';
import CyberHeader from '../../components/CyberHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useToast } from "@/hooks/use-toast";

const HashGenerator = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('md5');
  const [hashResult, setHashResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const hashAlgorithms = [
    { id: 'md5', name: 'MD5', color: 'text-cyber-blue' },
    { id: 'sha1', name: 'SHA-1', color: 'text-cyber-green' },
    { id: 'sha256', name: 'SHA-256', color: 'text-cyber-purple' },
    { id: 'sha512', name: 'SHA-512', color: 'text-cyber-yellow' },
  ];

  const generateHash = async () => {
    if (!input.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter text to generate a hash',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate hash generation with a timeout
      // In a real implementation, you would use a crypto library
      setTimeout(() => {
        const mockHashes = {
          md5: '5eb63bbbe01eeed093cb22bb8f5acdc3',
          sha1: '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
          sha256: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
          sha512: '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043'
        };
        
        // Add randomness to the hash to make it more realistic for demo purposes
        const randomSuffix = Math.random().toString(16).substring(2, 8);
        const hash = mockHashes[hashType].substring(0, mockHashes[hashType].length - 6) + randomSuffix;
        
        setHashResult(hash);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate hash',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (hashResult) {
      navigator.clipboard.writeText(hashResult);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Hash copied to clipboard',
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
            title="Hash Generator" 
            subtitle="Generate cryptographic hashes using various algorithms for data verification and security purposes."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4 flex items-center">
                  <Hash className="mr-2 h-5 w-5 text-cyber-blue" />
                  Generate Hash
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Input Text</label>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="cyber-input w-full min-h-[150px]"
                      placeholder="Enter text to hash..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Hash Algorithm</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {hashAlgorithms.map((algorithm) => (
                        <button
                          key={algorithm.id}
                          className={`p-3 border ${hashType === algorithm.id ? 'border-cyber-blue bg-cyber-blue bg-opacity-10' : 'border-gray-700'} rounded-md transition-all hover:border-cyber-blue`}
                          onClick={() => setHashType(algorithm.id)}
                        >
                          <span className={algorithm.color}>{algorithm.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      onClick={generateHash}
                      disabled={loading}
                      className="cyber-button bg-cyber-blue text-black hover:text-black flex items-center justify-center w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Hash className="mr-2 h-5 w-5" />
                          Generate Hash
                        </>
                      )}
                    </button>
                  </div>
                  
                  {hashResult && (
                    <div className="mt-4">
                      <label className="block text-gray-400 mb-2">
                        {hashType.toUpperCase()} Hash Result
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={hashResult}
                          readOnly
                          className="cyber-input w-full font-mono text-sm"
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
                <h3 className="font-cyber text-xl mb-4">About Hashing</h3>
                <p className="text-gray-400 mb-4">
                  Hashing is a process that converts any input data into a fixed-size string of bytes, typically represented as a hexadecimal number.
                </p>
                <p className="text-gray-400 mb-4">
                  Unlike encryption, hashing is a one-way function - it cannot be reversed to obtain the original input.
                </p>
                <h4 className="font-cyber text-lg mt-6 mb-2 text-cyber-blue">Common Uses:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Password storage</li>
                  <li>Data integrity verification</li>
                  <li>File checksums</li>
                  <li>Digital signatures</li>
                  <li>Blockchain technology</li>
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

export default HashGenerator;
