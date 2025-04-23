
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, ArrowLeft, ThumbsUp, AlertTriangle, Bug } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CyberHeader from '@/components/CyberHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TerminalText from '@/components/TerminalText';

interface FeedbackType {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const Feedback = () => {
  const { toast } = useToast();
  
  const [content, setContent] = useState('');
  const [type, setType] = useState('feedback');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  
  const feedbackTypes: FeedbackType[] = [
    {
      id: 'feedback',
      label: 'General Feedback',
      icon: <ThumbsUp className="h-5 w-5 text-cyber-blue" />,
      description: 'Share your thoughts and suggestions to help us improve'
    },
    {
      id: 'bug',
      label: 'Report a Bug',
      icon: <Bug className="h-5 w-5 text-cyber-red" />,
      description: 'Let us know about any issues or problems you encountered'
    },
    {
      id: 'feature',
      label: 'Feature Request',
      icon: <AlertTriangle className="h-5 w-5 text-cyber-yellow" />,
      description: 'Suggest new features or improvements you would like to see'
    }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('feedback')
        .insert({
          content,
          type,
          user_id: null // No user authentication, so set to null
        });
      
      if (error) throw error;
      
      setContent('');
      setShowThanks(true);
      
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
      
      // Reset thanks message after 5 seconds
      setTimeout(() => {
        setShowThanks(false);
      }, 5000);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-6">
            <Link to="/" className="flex items-center text-gray-400 hover:text-cyber-blue transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <CyberHeader 
            title="Feedback & Suggestions" 
            subtitle="Help us improve CyberGuard by sharing your experience, reporting bugs, or suggesting new features."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {feedbackTypes.map((feedbackType) => (
              <button
                key={feedbackType.id}
                className={`cyber-card hover:border-cyber-blue transition-all flex flex-col items-center text-center p-6 ${
                  type === feedbackType.id ? 'border-cyber-blue bg-cyber-blue bg-opacity-5' : ''
                }`}
                onClick={() => setType(feedbackType.id)}
              >
                <div className="mb-3">{feedbackType.icon}</div>
                <h3 className="font-cyber text-lg mb-2">{feedbackType.label}</h3>
                <p className="text-gray-400 text-sm">{feedbackType.description}</p>
              </button>
            ))}
          </div>
          
          <div className="cyber-card">
            {showThanks ? (
              <div className="text-center py-8">
                <div className="inline-block p-4 bg-cyber-blue bg-opacity-10 rounded-full mb-4">
                  <MessageSquare className="h-10 w-10 text-cyber-blue" />
                </div>
                <TerminalText 
                  text="Thank you for your feedback!" 
                  className="text-2xl font-cyber neon-text-blue mb-4"
                />
                <p className="text-gray-400 mb-6">
                  Your input helps us make CyberGuard better for everyone.
                </p>
                <button
                  onClick={() => setShowThanks(false)}
                  className="cyber-button"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 text-lg font-cyber">
                    {type === 'feedback' && 'Share Your Thoughts'}
                    {type === 'bug' && 'Describe the Bug'}
                    {type === 'feature' && 'Describe Your Feature Request'}
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="cyber-input w-full min-h-[200px]"
                    placeholder={
                      type === 'feedback' 
                        ? 'What do you think about CyberGuard? How can we improve?' 
                        : type === 'bug'
                        ? 'Please describe the issue in detail. What happened? What did you expect to happen?' 
                        : 'What feature would you like to see? How would it help you?'
                    }
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="cyber-button flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit {type === 'feedback' ? 'Feedback' : type === 'bug' ? 'Bug Report' : 'Feature Request'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feedback;
