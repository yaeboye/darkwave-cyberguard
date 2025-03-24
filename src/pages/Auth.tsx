
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield, Lock, Mail, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TerminalText from '@/components/TerminalText';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormValues = z.infer<typeof formSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  useEffect(() => {
    // Reset form when switching between login and signup
    form.reset({
      email: '',
      password: ''
    });
  }, [isSignUp, form]);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Form submitted:", isSignUp ? "SignUp" : "SignIn", values);
      
      if (isSignUp) {
        await signUp(values.email, values.password);
        toast({
          title: "Account creation initiated",
          description: "Please check your email to confirm your account.",
        });
      } else {
        await signIn(values.email, values.password);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="scanline"></div>
      <Navbar />
      
      <main className="flex-grow py-12 bg-cyber-black">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 mx-auto text-cyber-blue animate-glow-pulse mb-4" />
            <TerminalText 
              text={isSignUp ? "Create Your Account" : "Secure Authentication"} 
              className="text-3xl font-cyber neon-text-blue"
            />
            <p className="text-gray-400 mt-2">
              {isSignUp 
                ? "Join CyberGuard to access protected tools and features" 
                : "Access your secure password vault and other protected tools"}
            </p>
          </div>
          
          <div className="cyber-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-400 mb-2">Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="pl-10 w-full bg-cyber-darkgray border-cyber-blue text-white"
                            placeholder="your@email.com"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500 mt-1 text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-400 mb-2">Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="pl-10 w-full bg-cyber-darkgray border-cyber-blue text-white"
                            placeholder="••••••••"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-500 mt-1 text-sm" />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-cyber-blue hover:bg-cyber-purple text-black font-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      {isSignUp ? "Create Account" : "Sign In"}
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyber-blue hover:text-cyber-purple transition-colors"
                type="button"
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
