
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
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY')
    if (!NEWS_API_KEY) {
      throw new Error('NEWS_API_KEY environment variable not set')
    }

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
      title: article.title,
      summary: article.description,
      content: article.content,
      source: article.source.name,
      author: article.author,
      category: detectCategory(article.title, article.description),
      image_url: article.urlToImage,
      published_at: article.publishedAt,
      url: article.url
    }))
    
    // Clear existing articles to avoid duplicates
    await supabase.from('news_articles').delete().gte('id', '0')
    
    // Insert the articles
    const { error } = await supabase.from('news_articles').insert(newsArticles)
    
    if (error) {
      console.error('Error inserting articles:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: newsArticles.length,
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
