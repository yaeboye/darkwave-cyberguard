
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, User, Cpu, Code, Database, Lock, Key, FileText, RefreshCw, AlertTriangle, Wifi, Search, Globe, Link, Server, Layout as LayoutIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-black">
      <Navbar />
      
      <main className="flex-grow px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-2 text-center mb-12">
            <h1 className="text-4xl font-cyber font-bold">
              <span className="neon-text-blue">About</span> <span className="neon-text-pink">Us</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the White Hat team from VIT Chennai who created this cybersecurity web application
            </p>
          </div>
          
          <div className="mb-12">
            <div className="border-b border-cyber-blue pb-4 mb-6">
              <h2 className="text-2xl font-cyber text-cyber-blue">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              At White Hat, we're committed to empowering users with the tools and knowledge they need to protect their digital lives. 
              Our mission is to make cybersecurity accessible to everyone through intuitive and effective tools.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This project was developed by a team of three cybersecurity enthusiasts from VIT Chennai, each bringing unique skills and expertise to create a comprehensive security toolkit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Satvik's Card */}
            <Card className="bg-cyber-darkgray border-cyber-blue text-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-cyber text-cyber-blue">Satvik Jindal</CardTitle>
                  <Shield className="h-6 w-6 text-cyber-blue" />
                </div>
                <CardDescription className="text-gray-400">Project Lead & Backend Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Led the project development, hosted the site, and managed the database integration with Supabase.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-cyber-blue" />
                      <span className="text-sm text-gray-300">Database Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Server className="h-4 w-4 text-cyber-blue" />
                      <span className="text-sm text-gray-300">Site Hosting & Deployment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-cyber-blue" />
                      <span className="text-sm text-gray-300">Application Architecture</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Ashish's Card */}
            <Card className="bg-cyber-darkgray border-cyber-blue text-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-cyber text-cyber-purple">Ashish Singh</CardTitle>
                  <Lock className="h-6 w-6 text-cyber-purple" />
                </div>
                <CardDescription className="text-gray-400">Security Tools Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Developed the core security tools and features that power CyberGuard's functionality.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-1">
                      <Key className="h-3 w-3 text-cyber-purple" />
                      <span className="text-xs text-gray-300">Password Checker</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RefreshCw className="h-3 w-3 text-cyber-purple" />
                      <span className="text-xs text-gray-300">Password Generator</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3 text-cyber-purple" />
                      <span className="text-xs text-gray-300">Hash Generator</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lock className="h-3 w-3 text-cyber-purple" />
                      <span className="text-xs text-gray-300">Encryption Tools</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Phishing Checker*</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Search className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Data Leak Checker*</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wifi className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">IP Address Tools*</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Web Vulnerability*</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 italic">*Tools under development</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Ayan's Card */}
            <Card className="bg-cyber-darkgray border-cyber-blue text-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-cyber text-cyber-pink">Ayan</CardTitle>
                  <Cpu className="h-6 w-6 text-cyber-pink" />
                </div>
                <CardDescription className="text-gray-400">UI/UX Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Created the visual design and user experience of the application, focusing on the core structure and styling.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-cyber-pink" />
                      <span className="text-sm text-gray-300">CSS & Styling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LayoutIcon className="h-4 w-4 text-cyber-pink" />
                      <span className="text-sm text-gray-300">Page Structure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-cyber-pink" />
                      <span className="text-sm text-gray-300">User Experience</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-cyber-darkgray border border-cyber-blue rounded-lg p-6 mb-12">
            <h2 className="text-xl font-cyber text-cyber-blue mb-4">Our Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-cyber-black p-3">
                  <Code className="h-6 w-6 text-cyber-blue" />
                </div>
                <span className="text-sm text-gray-300">React</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-cyber-black p-3">
                  <Database className="h-6 w-6 text-cyber-purple" />
                </div>
                <span className="text-sm text-gray-300">Supabase</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-cyber-black p-3">
                  <Server className="h-6 w-6 text-cyber-pink" />
                </div>
                <span className="text-sm text-gray-300">Web Hosting</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-cyber-black p-3">
                  <Shield className="h-6 w-6 text-cyber-yellow" />
                </div>
                <span className="text-sm text-gray-300">Security Tools</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
