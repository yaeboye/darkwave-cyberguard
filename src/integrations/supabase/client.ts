
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
