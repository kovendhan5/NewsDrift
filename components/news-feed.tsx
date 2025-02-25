"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlayCircle, Share2, Filter } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { fetchNews } from "@/lib/news-api"

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

export function NewsFeed() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [sort, setSort] = useState<'latest' | 'popular' | 'trending'>('latest')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchNews({ 
          category: sort === 'latest' ? 'general' : undefined,
          q: sort === 'trending' ? 'trending' : undefined,
          pageSize: 10
        })
        setArticles(data.articles)
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [sort])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <section aria-label="Latest News Articles">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
        <div className="flex items-center gap-2">
          <Select 
            value={sort}
            onValueChange={(value) => setSort(value as typeof sort)}
          >
            <SelectTrigger className="w-[140px] dark:shadow-none dark:hover:shadow-primary/10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="grid md:grid-cols-[2fr_1fr] gap-4 p-6"
                >
                  <div className="space-y-2">
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.source.name}</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="relative aspect-video md:aspect-square">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt=""
                        className="object-cover rounded-lg w-full h-full"
                      />
                    ) : (
                      <PlaceholderImage className="w-full h-full rounded-lg" />
                    )}
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

