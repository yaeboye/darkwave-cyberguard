
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
    const NEWSAPI_KEY = "09ba4a2a52bf455d869523c6500ac2dd"
    if (!NEWSAPI_KEY) {
      throw new Error('NEWSAPI_KEY is not set')
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables are not set')
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Fetch cybersecurity news from NewsAPI with improved query and more results
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity OR hacking OR "data breach" OR ransomware OR malware&language=en&sortBy=publishedAt&pageSize=20`,
      {
        headers: {
          'X-Api-Key': NEWSAPI_KEY,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'ok' && data.articles && data.articles.length > 0) {
      // Map categories based on content for better categorization
      const articles = data.articles.map((article: any) => {
        let category = 'Technology'
        const title = article.title?.toLowerCase() || ''
        const description = article.description?.toLowerCase() || ''
        
        if (title.includes('ransomware') || description.includes('ransomware')) {
          category = 'Ransomware'
        } else if (title.includes('phishing') || description.includes('phishing')) {
          category = 'Phishing'
        } else if (title.includes('vulnerability') || description.includes('vulnerability') || 
                  title.includes('exploit') || description.includes('exploit')) {
          category = 'Vulnerability'
        } else if (title.includes('breach') || description.includes('breach') || 
                  title.includes('leak') || description.includes('leak')) {
          category = 'Data Breach'
        } else if (title.includes('government') || description.includes('government') ||
                  title.includes('regulation') || description.includes('regulation')) {
          category = 'Government'
        }
        
        return {
          title: article.title,
          summary: article.description || 'No description available',
          content: article.content || article.description || 'No content available',
          source: article.source.name || 'Unknown Source',
          author: article.author || 'Unknown Author',
          category: category,
          image_url: article.urlToImage || 'https://via.placeholder.com/800x400?text=Cybersecurity+News',
          published_at: article.publishedAt || new Date().toISOString(),
        }
      })

      console.log(`Fetched ${articles.length} articles from NewsAPI`)

      // Clear existing articles first to avoid duplicates
      await supabase.from('news_articles').delete().gte('id', '0')
      
      // Insert the articles in smaller batches to avoid issues
      const batchSize = 5
      for (let i = 0; i < articles.length; i += batchSize) {
        const batch = articles.slice(i, i + batchSize)
        const { error } = await supabase.from('news_articles').insert(batch)
        
        if (error) {
          console.error('Error inserting batch:', error)
          throw error
        }
      }

      return new Response(
        JSON.stringify({ success: true, count: articles.length }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      throw new Error('Failed to fetch news or no articles returned')
    }
  } catch (error) {
    console.error('Error in fetch-cyber-news function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
