
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nkswikevsglbmbbhljpr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rc3dpa2V2c2dsYm1iYmhsanByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDI2MDYsImV4cCI6MjA1NzM3ODYwNn0.RVnl8VngcJs7Y_alPtvknSD8QqYQ2_TZizyAkRNk0AU";

// Create client with explicit auth configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    db: {
      schema: 'public',
    },
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Create a function to handle user profile creation after registration
export const createUserProfile = async (userId: string, email: string) => {
  try {
    console.log('Creating user profile for:', userId, email);
    
    // First check if profile already exists to avoid duplicate entries
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (fetchError && !fetchError.message.includes('No rows found')) {
      console.error('Error checking for existing profile:', fetchError);
      throw fetchError;
    }
    
    // If profile already exists, return successfully
    if (existingProfile) {
      console.log('Profile already exists for user:', userId);
      return true;
    }
    
    // Create profile if it doesn't exist
    const { error } = await supabase
      .from('profiles')
      .insert([{ id: userId, username: email }]);
    
    if (error) {
      console.error('Error creating user profile:', error);
      return false;
    }
    
    console.log('Profile created successfully for user:', userId);
    return true;
  } catch (error) {
    console.error('Unexpected error in createUserProfile:', error);
    return false;
  }
};
