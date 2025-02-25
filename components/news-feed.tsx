"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlayCircle, Share2, Filter } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import { fetchArticles, type Article } from "@/lib/utils"

export function NewsFeed() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [sort, setSort] = useState<'latest' | 'popular' | 'trending'>('latest')

  useEffect(() => {
    async function loadArticles() {
      setLoading(true)
      const data = await fetchArticles({ sort })
      setArticles(data)
      setLoading(false)
    }

    loadArticles()
  }, [sort])

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
          <Button variant="outline" size="icon" aria-label="Filter articles">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <LoadingCard key={i} />)
          : articles.map((article) => (
              <Card 
                key={article.id}
                className="overflow-hidden group hover:shadow-md dark:hover:shadow-primary/5 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative md:w-1/3 aspect-video md:aspect-square overflow-hidden rounded-lg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">{article.category}</span>
                          <time className="text-sm text-muted-foreground">{article.date}</time>
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                        {article.description}
                      </p>
                      <Button 
                        className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  )
}

