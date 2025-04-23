
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Search, ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import CyberHeader from '../../components/CyberHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useToast } from "@/hooks/use-toast";

const ThreatDetection = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    isSafe: boolean;
    threatLevel: 'safe' | 'suspicious' | 'dangerous';
    threats: Array<{type: string; description: string}>;
    summary: string;
  }>(null);

  const handleScan = () => {
    // Validate URL input
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a URL to scan",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    try {
      new URL(url.startsWith('http') ? url : `http://${url}`);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including domain name",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      // For demo purposes, randomly determine if URL is safe or not
      const random = Math.random();
      let result;
      
      if (random > 0.7) {
        // Dangerous URL
        result = {
          isSafe: false,
          threatLevel: 'dangerous',
          threats: [
            { 
              type: 'Phishing', 
              description: 'This site appears to be a phishing attempt designed to steal credentials.' 
            },
            { 
              type: 'Malware', 
              description: 'Suspicious scripts detected that may attempt to download malware.' 
            }
          ],
          summary: 'High risk detected! This URL is likely malicious and should be avoided.'
        };
      } else if (random > 0.4) {
        // Suspicious URL
        result = {
          isSafe: false,
          threatLevel: 'suspicious',
          threats: [
            { 
              type: 'Suspicious Content', 
              description: 'This site contains some suspicious elements that require caution.' 
            }
          ],
          summary: 'Proceed with caution. Some suspicious elements were detected.'
        };
      } else {
        // Safe URL
        result = {
          isSafe: true,
          threatLevel: 'safe',
          threats: [],
          summary: 'No threats detected. This URL appears to be safe.'
        };
      }

      setScanResult(result);
      setScanning(false);
      
      toast({
        title: result.isSafe ? "Scan Complete: Safe" : "Scan Complete: Threats Detected",
        description: result.summary,
        variant: result.isSafe ? "default" : "destructive",
      });
    }, 2500);
  };

  const getThreatIcon = (threatLevel: string) => {
    switch (threatLevel) {
      case 'safe':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'suspicious':
        return <AlertCircle className="h-8 w-8 text-cyber-yellow" />;
      case 'dangerous':
        return <XCircle className="h-8 w-8 text-cyber-red" />;
      default:
        return null;
    }
  };

  const getThreatColor = (threatLevel: string) => {
    switch (threatLevel) {
      case 'safe':
        return 'text-green-500';
      case 'suspicious':
        return 'text-cyber-yellow';
      case 'dangerous':
        return 'text-cyber-red';
      default:
        return 'text-white';
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
            title="Threat Detection" 
            subtitle="Scan URLs for phishing attempts, malware, and other cyber threats before visiting them."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="cyber-card">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-cyber-red mr-3" />
                  <h3 className="font-cyber text-xl">URL Threat Scanner</h3>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-400 mb-2">Enter URL to scan</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="cyber-input w-full"
                      placeholder="https://example.com"
                    />
                    <button
                      onClick={handleScan}
                      disabled={scanning}
                      className="ml-2 cyber-button bg-cyber-red text-white hover:text-white flex-shrink-0 flex items-center"
                    >
                      {scanning ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Scan URL
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {scanning && (
                  <div className="text-center py-10">
                    <Loader2 className="h-12 w-12 text-cyber-blue animate-spin mx-auto mb-4" />
                    <p className="text-cyber-blue text-lg font-cyber">Scanning for threats...</p>
                    <p className="text-gray-400 mt-2">Analyzing URL for potential security risks</p>
                  </div>
                )}
                
                {scanResult && !scanning && (
                  <div className="border rounded-md p-6" 
                       style={{borderColor: scanResult.isSafe ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}}>
                    <div className="flex items-center mb-4">
                      {getThreatIcon(scanResult.threatLevel)}
                      <div className="ml-4">
                        <h4 className={`font-cyber text-lg ${getThreatColor(scanResult.threatLevel)}`}>
                          {scanResult.threatLevel === 'safe' ? 'Safe to Visit' : 
                           scanResult.threatLevel === 'suspicious' ? 'Suspicious URL' : 'Dangerous URL'}
                        </h4>
                        <p className="text-gray-400">{scanResult.summary}</p>
                      </div>
                    </div>
                    
                    {scanResult.threats.length > 0 && (
                      <div className="mt-6">
                        <h5 className="font-cyber text-cyber-red mb-2">Threats Detected:</h5>
                        <ul className="space-y-3">
                          {scanResult.threats.map((threat, index) => (
                            <li key={index} className="border border-gray-700 rounded p-3">
                              <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-cyber-red mr-2 mt-0.5" />
                                <div>
                                  <h6 className="font-cyber text-cyber-red">{threat.type}</h6>
                                  <p className="text-gray-400 text-sm">{threat.description}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {scanResult.isSafe && (
                      <div className="mt-4 p-3 border border-green-800 bg-green-900 bg-opacity-20 rounded-md">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p className="text-green-400 text-sm">
                            This URL has been scanned and no threats were detected. It appears to be safe to visit.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="cyber-card">
                <h3 className="font-cyber text-xl mb-4">About Threat Detection</h3>
                <p className="text-gray-400 mb-4">
                  Our URL threat scanner helps you check if a website is safe before you visit it. It can detect various types of online threats.
                </p>
                <h4 className="font-cyber text-lg mt-6 mb-2 text-cyber-red">Common Online Threats:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Phishing websites</li>
                  <li>Malware distribution</li>
                  <li>Scam and fraud sites</li>
                  <li>Malicious redirects</li>
                  <li>Cryptojacking scripts</li>
                </ul>
                
                <div className="mt-8 p-4 border border-cyber-blue rounded-md bg-cyber-blue bg-opacity-10">
                  <h4 className="font-cyber text-cyber-blue mb-2">Remember</h4>
                  <p className="text-gray-300 text-sm">
                    No scanner is 100% accurate. Always practice safe browsing habits even when a URL is deemed safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreatDetection;
