
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

    // Fetch cybersecurity news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity&language=en&sortBy=publishedAt&pageSize=10`,
      {
        headers: {
          'X-Api-Key': NEWSAPI_KEY,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'ok' && data.articles) {
      const articles = data.articles.map((article: any) => ({
        title: article.title,
        summary: article.description || '',
        content: article.content || '',
        source: article.source.name,
        author: article.author,
        category: 'Technology', // Default category
        image_url: article.urlToImage,
        published_at: article.publishedAt,
      }))

      const { error } = await supabase
        .from('news_articles')
        .insert(articles)

      if (error) throw error

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      throw new Error('Failed to fetch news')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
