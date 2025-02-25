"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlayCircle, Share2, Filter } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"

const newsArticles = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    description:
      "Exploring how artificial intelligence is transforming our daily routines and what to expect in the coming years.",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-02-24",
  },
  {
    id: 2,
    title: "Sustainable Living: Small Changes, Big Impact",
    description: "Learn about simple lifestyle changes that can help reduce your environmental footprint.",
    category: "Environment",
    image: "/placeholder.svg?height=200&width=300",
    date: "2024-02-24",
  },
]

export function NewsFeed() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState(newsArticles)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section aria-label="Latest News Articles">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="latest">
            <SelectTrigger className="w-[140px]" aria-label="Sort articles">
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
              <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5 group">
                <div className="md:flex">
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img
                      alt={article.title}
                      className="h-48 w-full object-cover md:h-full transition-transform duration-200 group-hover:scale-105"
                      src={article.image || "/placeholder.svg"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none dark:from-black/40"></div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary dark:text-primary/90">{article.category}</span>
                        <time className="text-sm text-muted-foreground">{article.date}</time>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        <a href="#" className="hover:underline">
                          {article.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-muted-foreground mb-4">{article.description}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="transition-all hover:scale-105 shadow-sm hover:shadow-md dark:bg-secondary/80 dark:hover:bg-secondary"
                          aria-label={`Listen to ${article.title}`}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Listen
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="transition-all hover:scale-105 hover:bg-secondary/20"
                          aria-label={`Share ${article.title}`}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </section>
  )
}

