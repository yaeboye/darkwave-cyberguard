
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use the provided News API key
    const NEWS_API_KEY = 'a0d97574f94c49b1b9d6fccf82a6b824'
    
    // Setup Supabase client to store the fetched news
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables are not set')
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    console.log("Fetching cybersecurity news from News API...")
    
    // Fetch cybersecurity news from News API
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&pageSize=10&language=en&apiKey=${NEWS_API_KEY}`,
      { headers: { 'X-Api-Key': NEWS_API_KEY } }
    )
    
    if (!newsResponse.ok) {
      const errorData = await newsResponse.json()
      console.error('News API error:', errorData)
      throw new Error(`News API error: ${errorData.message || newsResponse.statusText}`)
    }
    
    const newsData = await newsResponse.json()
    
    if (newsData.status !== 'ok' || !newsData.articles || newsData.articles.length === 0) {
      throw new Error('No articles found or invalid response from News API')
    }
    
    console.log(`Got ${newsData.articles.length} articles from News API`)
    
    // Transform News API data to match our schema
    const newsArticles = newsData.articles.map((article: any) => ({
      title: article.title || 'Untitled Article',
      summary: article.description || 'No description available',
      content: article.content || article.description || 'No content available',
      source: article.source?.name || 'Unknown Source',
      author: article.author || 'Unknown Author',
      category: detectCategory(article.title || '', article.description || ''),
      image_url: article.urlToImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      published_at: article.publishedAt || new Date().toISOString(),
      url: article.url || null
    }))
    
    // Make sure all required fields have values to avoid null constraint violations
    const validArticles = newsArticles.filter(article => 
      article.title && 
      article.summary && 
      article.published_at
    )
    
    if (validArticles.length === 0) {
      throw new Error('No valid articles found after filtering')
    }
    
    console.log(`Found ${validArticles.length} valid articles to insert`)
    
    // Clear existing articles to avoid duplicates
    const { error: deleteError } = await supabase.from('news_articles').delete().gte('id', '0')
    
    if (deleteError) {
      console.error('Error deleting existing articles:', deleteError)
      throw deleteError
    }
    
    // Insert the articles
    const { error } = await supabase.from('news_articles').insert(validArticles)
    
    if (error) {
      console.error('Error inserting articles:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: validArticles.length,
        message: "Successfully fetched and stored real cybersecurity news"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in fetch-real-news function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "Failed to fetch real cybersecurity news" 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

// Detect category based on article content
function detectCategory(title: string, description: string): string {
  const content = (title + ' ' + description).toLowerCase()
  
  if (content.includes('vulnerability') || content.includes('exploit') || content.includes('cve')) {
    return 'Vulnerability'
  } else if (content.includes('ransomware') || content.includes('ransom')) {
    return 'Ransomware'
  } else if (content.includes('phishing') || content.includes('social engineering')) {
    return 'Phishing'
  } else if (content.includes('data breach') || content.includes('leaked') || content.includes('hack')) {
    return 'Data Breach'
  } else if (content.includes('government') || content.includes('regulation') || content.includes('compliance')) {
    return 'Government'
  } else if (content.includes('zero day') || content.includes('patch')) {
    return 'Vulnerability'
  } else {
    return 'Technology'
  }
}
