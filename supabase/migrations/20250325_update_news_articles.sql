
-- Add url column to the news_articles table for redirection
ALTER TABLE IF EXISTS public.news_articles 
ADD COLUMN IF NOT EXISTS url TEXT;
