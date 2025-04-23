import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, PlusCircle, Trash2, Edit, Save, X, Copy, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CyberHeader from '@/components/CyberHeader';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Password {
  id: string;
  site_name: string;
  username: string;
  password: string;
  notes?: string;
  url?: string;
  created_at: string;
  updated_at: string;
}

interface NewPassword {
  site_name: string;
  username: string;
  password: string;
  notes?: string;
  url?: string;
}

const PasswordManager = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const [demoPasswords, setDemoPasswords] = useState<Password[]>([
    {
      id: '1',
      site_name: 'Example Email',
      username: 'user@example.com',
      password: 'ExamplePassword123!',
      notes: 'Personal email account',
      url: 'https://mail.example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      site_name: 'Social Media',
      username: 'username123',
      password: 'SocialPassword456!',
      url: 'https://social.example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      site_name: 'Banking',
      username: 'bankuser',
      password: 'SecureBankPass789!',
      notes: 'Main checking account',
      url: 'https://bank.example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);
  
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  
  const [newPassword, setNewPassword] = useState<NewPassword>({
    site_name: '',
    username: '',
    password: '',
    notes: '',
    url: ''
  });
  
  if (!authLoading && !user) {
    return <Navigate to="/auth" />;
  }
  
  useEffect(() => {
    if (user) {
      fetchPasswords();
    }
  }, [user]);
  
  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stored_passwords')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching passwords:", error);
        setPasswords([]);
      } else {
        setPasswords(data || []);
      }
    } catch (error) {
      console.error("Exception fetching passwords:", error);
      setPasswords([]);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditChange = (id: string, field: keyof Password, value: string) => {
    setPasswords(prev => 
      prev.map(password => 
        password.id === id ? { ...password, [field]: value } : password
      )
    );
  };
  
  const addPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword.site_name || !newPassword.username || !newPassword.password) {
      toast({
        title: "Error",
        description: "Site name, username and password are required",
        variant: "destructive",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save passwords",
        variant: "destructive",
      });
      return;
    }

    console.log("Adding password for user:", user.id);
    
    try {
      const { data, error } = await supabase
        .from('stored_passwords')
        .insert({
          site_name: newPassword.site_name,
          username: newPassword.username,
          password: newPassword.password,
          notes: newPassword.notes || null,
          url: newPassword.url || null,
          user_id: user.id
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setPasswords(prev => [data[0], ...prev]);
        
        setNewPassword({
          site_name: '',
          username: '',
          password: '',
          notes: '',
          url: ''
        });
        
        setShowAddForm(false);
        
        toast({
          title: "Success",
          description: "Password saved successfully",
        });
      }
    } catch (error: any) {
      console.error("Error adding password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save password",
        variant: "destructive",
      });
    }
  };
  
  const startEditing = (id: string) => {
    setEditingId(id);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
  };
  
  const saveEdit = async (id: string) => {
    try {
      const passwordToUpdate = passwords.find(p => p.id === id);
      if (!passwordToUpdate) return;
      
      const { error } = await supabase
        .from('stored_passwords')
        .update({
          site_name: passwordToUpdate.site_name,
          username: passwordToUpdate.username,
          password: passwordToUpdate.password,
          notes: passwordToUpdate.notes || null,
          url: passwordToUpdate.url || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setPasswords(prev => 
        prev.map(password => 
          password.id === id ? { ...password, updated_at: new Date().toISOString() } : password
        )
      );
      
      setEditingId(null);
      
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
      
      setPasswords(prev => 
        prev.map(password => 
          password.id === id ? { ...password, updated_at: new Date().toISOString() } : password
        )
      );
      setEditingId(null);
    }
  };
  
  const deletePassword = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stored_passwords')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setPasswords(prev => prev.filter(password => password.id !== id));
      
      toast({
        title: "Success",
        description: "Password deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete password",
        variant: "destructive",
      });
      
      setPasswords(prev => prev.filter(password => password.id !== id));
    }
  };
  
  const copyToClipboard = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied",
      description: `${itemName} copied to clipboard`,
    });
  };
  
  const filteredPasswords = passwords.filter(password => 
    password.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      {authLoading ? (
        <div className="flex-grow flex items-center justify-center bg-cyber-black">
          <div className="text-cyber-blue animate-pulse">Loading...</div>
        </div>
      ) : (
        <main className="flex-grow py-12 bg-cyber-black">
          <div className="container mx-auto px-4 md:px-6">
            <CyberHeader 
              title="Password Manager" 
              subtitle="Securely store and manage your passwords in one place."
            />
            
            <div className="bg-cyber-darkgray border border-cyber-blue p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center flex-grow">
                  <Search className="h-5 w-5 text-cyber-blue mr-2" />
                  <input
                    type="text"
                    placeholder="Search passwords..."
                    className="cyber-input flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button 
                  className="cyber-button flex items-center"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Password
                    </>
                  )}
                </button>
              </div>
              
              {showAddForm && (
                <form onSubmit={addPassword} className="mt-6 p-4 bg-cyber-black border border-gray-700 rounded-lg">
                  <h3 className="font-cyber text-lg mb-4 text-white">Add New Password</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Site Name*</label>
                      <input
                        type="text"
                        name="site_name"
                        value={newPassword.site_name}
                        onChange={handleInputChange}
                        className="cyber-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">URL</label>
                      <input
                        type="text"
                        name="url"
                        value={newPassword.url}
                        onChange={handleInputChange}
                        className="cyber-input w-full"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Username / Email*</label>
                      <input
                        type="text"
                        name="username"
                        value={newPassword.username}
                        onChange={handleInputChange}
                        className="cyber-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Password*</label>
                      <div className="relative">
                        <input
                          type={showPassword['new'] ? "text" : "password"}
                          name="password"
                          value={newPassword.password}
                          onChange={handleInputChange}
                          className="cyber-input w-full pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-blue"
                        >
                          {showPassword['new'] ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={newPassword.notes}
                      onChange={handleInputChange}
                      className="cyber-input w-full min-h-[100px]"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="cyber-button flex items-center"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Password
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-cyber-blue animate-pulse">Loading passwords...</div>
              </div>
            ) : (
              <>
                {filteredPasswords.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredPasswords.map((password) => (
                      <div key={password.id} className="cyber-card hover:border-cyber-blue transition-all">
                        {editingId === password.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-400 mb-2">Site Name</label>
                                <input
                                  type="text"
                                  value={password.site_name}
                                  onChange={(e) => handleEditChange(password.id, 'site_name', e.target.value)}
                                  className="cyber-input w-full"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-gray-400 mb-2">URL</label>
                                <input
                                  type="text"
                                  value={password.url || ''}
                                  onChange={(e) => handleEditChange(password.id, 'url', e.target.value)}
                                  className="cyber-input w-full"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-400 mb-2">Username / Email</label>
                                <input
                                  type="text"
                                  value={password.username}
                                  onChange={(e) => handleEditChange(password.id, 'username', e.target.value)}
                                  className="cyber-input w-full"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-gray-400 mb-2">Password</label>
                                <div className="relative">
                                  <input
                                    type={showPassword[password.id] ? "text" : "password"}
                                    value={password.password}
                                    onChange={(e) => handleEditChange(password.id, 'password', e.target.value)}
                                    className="cyber-input w-full pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility(password.id)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-blue"
                                  >
                                    {showPassword[password.id] ? (
                                      <EyeOff className="h-5 w-5" />
                                    ) : (
                                      <Eye className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-gray-400 mb-2">Notes</label>
                              <textarea
                                value={password.notes || ''}
                                onChange={(e) => handleEditChange(password.id, 'notes', e.target.value)}
                                className="cyber-input w-full min-h-[100px]"
                              ></textarea>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={cancelEditing}
                                className="cyber-button-outline flex items-center"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </button>
                              <button
                                onClick={() => saveEdit(password.id)}
                                className="cyber-button flex items-center"
                              >
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-cyber text-lg text-white">{password.site_name}</h3>
                                {password.url && (
                                  <a 
                                    href={password.url.startsWith('http') ? password.url : `https://${password.url}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cyber-blue hover:text-cyber-purple text-sm"
                                  >
                                    {password.url}
                                  </a>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                Updated: {new Date(password.updated_at).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-gray-400 text-sm">Username / Email</label>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button 
                                          onClick={() => copyToClipboard(password.username, 'Username')}
                                          className="text-gray-400 hover:text-cyber-blue"
                                        >
                                          <Copy className="h-4 w-4" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copy to clipboard</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <div className="bg-cyber-darkgray border border-gray-700 p-2 rounded overflow-x-auto">
                                  {password.username}
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-gray-400 text-sm">Password</label>
                                  <div className="flex items-center space-x-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <button 
                                            onClick={() => copyToClipboard(password.password, 'Password')}
                                            className="text-gray-400 hover:text-cyber-blue"
                                          >
                                            <Copy className="h-4 w-4" />
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy to clipboard</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    
                                    <button
                                      onClick={() => togglePasswordVisibility(password.id)}
                                      className="text-gray-400 hover:text-cyber-blue"
                                    >
                                      {showPassword[password.id] ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <div className="bg-cyber-darkgray border border-gray-700 p-2 rounded font-mono">
                                  {showPassword[password.id] ? password.password : '••••••••••••'}
                                </div>
                              </div>
                            </div>
                            
                            {password.notes && (
                              <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-1">Notes</label>
                                <div className="bg-cyber-darkgray border border-gray-700 p-2 rounded">
                                  {password.notes}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => deletePassword(password.id)}
                                className="cyber-button-outline flex items-center text-cyber-red hover:text-cyber-red"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </button>
                              <button
                                onClick={() => startEditing(password.id)}
                                className="cyber-button flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cyber-card text-center py-10">
                    <Lock className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                    <h3 className="font-cyber text-xl mb-2">No Passwords Found</h3>
                    <p className="text-gray-400 mb-6">
                      {searchTerm ? 'No passwords match your search criteria.' : 'You have not added any passwords yet.'}
                    </p>
                    {searchTerm ? (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="cyber-button"
                      >
                        Clear Search
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="cyber-button flex items-center mx-auto"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Your First Password
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default PasswordManager;
