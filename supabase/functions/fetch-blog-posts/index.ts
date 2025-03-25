
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

    // Fetch blogs about cybersecurity best practices
    console.log("Fetching cybersecurity blog posts...")
    
    const blogResponse = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity+best+practices&sortBy=relevancy&pageSize=6&language=en&apiKey=${NEWS_API_KEY}`,
      { headers: { 'X-Api-Key': NEWS_API_KEY } }
    )
    
    if (!blogResponse.ok) {
      const errorData = await blogResponse.json()
      console.error('Blog API error:', errorData)
      throw new Error(`Blog API error: ${errorData.message || blogResponse.statusText}`)
    }
    
    const blogData = await blogResponse.json()
    
    if (blogData.status !== 'ok' || !blogData.articles || blogData.articles.length === 0) {
      throw new Error('No blog posts found or invalid response from News API')
    }
    
    console.log(`Got ${blogData.articles.length} blog posts`)
    
    // Transform to our blog post format
    const blogPosts = blogData.articles.map((article: any) => ({
      id: crypto.randomUUID(),
      title: article.title,
      summary: article.description,
      content: article.content,
      author: article.author || 'Cybersecurity Expert',
      category: detectCategory(article.title, article.description),
      image_url: article.urlToImage,
      published_at: article.publishedAt,
      url: article.url
    }))

    return new Response(
      JSON.stringify({ 
        success: true, 
        posts: blogPosts,
        count: blogPosts.length 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in fetch-blog-posts function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
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
  
  if (content.includes('password') || content.includes('authentication')) {
    return 'Password Security'
  } else if (content.includes('phishing') || content.includes('social engineering')) {
    return 'Phishing'
  } else if (content.includes('network') || content.includes('wifi') || content.includes('router')) {
    return 'Network Security'
  } else if (content.includes('privacy') || content.includes('data protection')) {
    return 'Privacy'
  } else if (content.includes('malware') || content.includes('virus') || content.includes('ransomware')) {
    return 'Malware Protection'
  } else if (content.includes('two factor') || content.includes('2fa') || content.includes('mfa')) {
    return 'Authentication'
  } else {
    return 'Cybersecurity'
  }
}
