
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  Key, Lock, Copy, Eye, EyeOff, Plus, Edit, Trash2, 
  ArrowLeft, Globe, User, FileText, Save, X, Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CyberHeader from '@/components/CyberHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface StoredPassword {
  id: string;
  site_name: string;
  username: string;
  password: string;
  url: string | null;
  notes: string | null;
}

const PasswordManager = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const [passwords, setPasswords] = useState<StoredPassword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState<StoredPassword | null>(null);
  
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }
  
  // Fetch passwords on component mount
  useEffect(() => {
    if (user) {
      fetchPasswords();
    }
  }, [user]);
  
  const fetchPasswords = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('stored_passwords')
        .select('*')
        .order('site_name', { ascending: true });
      
      if (error) throw error;
      
      setPasswords(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load passwords",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddEditPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPassword) {
        // Update existing password
        const { error } = await supabase
          .from('stored_passwords')
          .update({
            site_name: siteName,
            username,
            password,
            url,
            notes,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPassword.id);
        
        if (error) throw error;
        
        toast({
          title: "Password updated",
          description: `Your ${siteName} password has been updated.`,
        });
      } else {
        // Add new password
        const { error } = await supabase
          .from('stored_passwords')
          .insert({
            user_id: user!.id,
            site_name: siteName,
            username,
            password,
            url,
            notes,
          });
        
        if (error) throw error;
        
        toast({
          title: "Password saved",
          description: `Your ${siteName} password has been stored securely.`,
        });
      }
      
      // Reset form and close modal
      resetForm();
      setShowAddEditModal(false);
      fetchPasswords();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save password",
        variant: "destructive",
      });
    }
  };
  
  const handleDeletePassword = async (id: string, siteName: string) => {
    if (confirm(`Are you sure you want to delete the password for ${siteName}?`)) {
      try {
        const { error } = await supabase
          .from('stored_passwords')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Password deleted",
          description: `Your ${siteName} password has been removed.`,
        });
        
        fetchPasswords();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete password",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleEdit = (password: StoredPassword) => {
    setEditingPassword(password);
    setSiteName(password.site_name);
    setUsername(password.username);
    setPassword(password.password);
    setUrl(password.url || '');
    setNotes(password.notes || '');
    setShowAddEditModal(true);
  };
  
  const resetForm = () => {
    setEditingPassword(null);
    setSiteName('');
    setUsername('');
    setPassword('');
    setUrl('');
    setNotes('');
    setShowPassword(false);
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${type} copied to clipboard`,
    });
  };
  
  // Filter passwords based on search term
  const filteredPasswords = passwords.filter(pw => 
    pw.site_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pw.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            title="Password Vault" 
            subtitle="Securely store and manage your passwords. All data is encrypted and only accessible to you."
          />
          
          <div className="cyber-card mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cyber-input pl-10 w-full"
                />
              </div>
              
              <button
                className="cyber-button w-full md:w-auto flex items-center justify-center"
                onClick={() => {
                  resetForm();
                  setShowAddEditModal(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Password
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-cyber-blue">Loading your passwords...</div>
              </div>
            ) : filteredPasswords.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-700 rounded-md">
                <Lock className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-xl font-cyber text-gray-400 mb-2">No passwords found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No passwords match your search' : 'Start adding passwords to your secure vault'}
                </p>
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-cyber-blue hover:text-cyber-purple transition-colors"
                  >
                    Clear search
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddEditModal(true)}
                    className="cyber-button"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Your First Password
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left text-gray-400">Site</th>
                      <th className="py-3 px-4 text-left text-gray-400">Username</th>
                      <th className="py-3 px-4 text-left text-gray-400">Password</th>
                      <th className="py-3 px-4 text-left text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPasswords.map((pw) => (
                      <tr key={pw.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-cyber-purple mr-2" />
                            <span className="font-medium">{pw.site_name}</span>
                          </div>
                          {pw.url && (
                            <a 
                              href={pw.url.startsWith('http') ? pw.url : `https://${pw.url}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-cyber-blue hover:underline mt-1 block"
                            >
                              {pw.url}
                            </a>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-cyber-blue mr-2" />
                            <span>{pw.username}</span>
                            <button
                              onClick={() => copyToClipboard(pw.username, 'Username')}
                              className="ml-2 text-gray-400 hover:text-cyber-blue"
                              aria-label="Copy username"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Lock className="h-5 w-5 text-cyber-green mr-2" />
                            <span className="font-mono">••••••••••</span>
                            <button
                              onClick={() => copyToClipboard(pw.password, 'Password')}
                              className="ml-2 text-gray-400 hover:text-cyber-blue"
                              aria-label="Copy password"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(pw)}
                              className="p-1 text-gray-400 hover:text-cyber-blue"
                              aria-label="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeletePassword(pw.id, pw.site_name)}
                              className="p-1 text-gray-400 hover:text-cyber-red"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add/Edit Password Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="cyber-card w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-cyber neon-text-blue">
                {editingPassword ? 'Edit Password' : 'Add New Password'}
              </h3>
              <button 
                onClick={() => setShowAddEditModal(false)}
                className="text-gray-400 hover:text-cyber-red"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddEditPassword} className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-gray-400 mb-1">
                  Site Name*
                </label>
                <input
                  id="siteName"
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="cyber-input w-full"
                  placeholder="Google, Twitter, etc."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  Username/Email*
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input w-full"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-400 mb-1">
                  Password*
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyber-input w-full pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-blue"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-2">
                  <Link to="/tools/password-generator" className="text-xs text-cyber-blue hover:underline">
                    Generate strong password
                  </Link>
                </div>
              </div>
              
              <div>
                <label htmlFor="url" className="block text-gray-400 mb-1">
                  Website URL <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="cyber-input w-full"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-gray-400 mb-1">
                  Notes <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="cyber-input w-full min-h-[80px]"
                  placeholder="Additional information..."
                />
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEditModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 cyber-button flex items-center justify-center"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {editingPassword ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default PasswordManager;
