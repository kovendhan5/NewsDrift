"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Clock, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { LoadingCard } from "@/components/loading-card"
import { fetchNews, type Article } from "@/lib/news-api"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" }
] as const

const SORT_OPTIONS = [
  { value: "publishedAt", label: "Latest" },
  { value: "popularity", label: "Most Popular" },
  { value: "relevancy", label: "Most Relevant" }
] as const

type Category = typeof CATEGORIES[number]["value"]
type SortOption = typeof SORT_OPTIONS[number]["value"]

export function NewsFeed() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<Category>("general")
  const [sortBy, setSortBy] = useState<SortOption>("publishedAt")
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchNews({ 
          category,
          sortBy,
          page,
          pageSize,
          language: 'en'
        })
        setArticles(data.articles)
        setTotalPages(Math.ceil(data.totalResults / pageSize))
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [category, sortBy, page])

  const handlePreviousPage = () => {
    setPage((p) => Math.max(1, p - 1))
  }

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1))
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <section aria-label="Latest News Articles">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select 
            value={category}
            onValueChange={(value) => {
              setPage(1)
              setCategory(value as Category)
            }}
          >
            <SelectTrigger className="w-[140px] dark:shadow-none dark:hover:shadow-primary/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={sortBy}
            onValueChange={(value) => {
              setPage(1)
              setSortBy(value as SortOption)
            }}
          >
            <SelectTrigger className="w-[140px] dark:shadow-none dark:hover:shadow-primary/10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
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
        <>
          <div className="space-y-4">
            {articles.map((article, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="grid md:grid-cols-[2fr_1fr] gap-4 p-6 hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.source.name}</span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    {article.urlToImage && (
                      <div className="md:order-last order-first relative aspect-video md:aspect-square overflow-hidden rounded-lg">
                        <PlaceholderImage
                          src={article.urlToImage}
                          alt={article.title}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    )}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="gap-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </section>
  )
}

