"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingCard } from "@/components/loading-card"
import { NewsSearch } from "@/components/news-search"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { handleApiError } from "@/lib/api-utils"
import { debug, debugError } from "@/lib/debug"
import { fetchNews, type NewsArticle } from "@/lib/news-api"
import { formatDistanceToNow } from "date-fns"
import { Filter, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export function NewsFeed() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>("general")
  const [sortBy, setSortBy] = useState<string>("publishedAt")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    async function loadArticles() {
      debug(`Loading articles: category=${category}, page=${page}, sortBy=${sortBy}`);
      const startTime = performance.now();
      
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchNews({ 
          category: searchQuery ? undefined : category,
          q: searchQuery || undefined,
          sortBy,
          page,
          pageSize
        })
        
        debug(`API response received in ${Math.round(performance.now() - startTime)}ms`);
        
        if (data.status === "error") {
          throw new Error(data.message || "Failed to fetch news")
        }
        
        if (!data.articles || data.articles.length === 0) {
          debug('No articles returned from API');
          setArticles([])
          setError('No articles found. Try a different category or search term.')
        } else {
          debug(`Received ${data.articles.length} articles, total: ${data.totalResults}`);
          setArticles(data.articles)
          setTotalPages(Math.max(1, Math.ceil(data.totalResults / pageSize)))
        }
      } catch (err) {
        debugError('Failed to fetch articles:', err);
        const { message } = handleApiError(err)
        setError(message)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [category, sortBy, page, searchQuery])

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }

  return (
    <ErrorBoundary>
      <section aria-label="Latest News Articles">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
          <div className="flex items-center gap-2">
            <Select 
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="w-[140px] dark:shadow-none dark:hover:shadow-primary/10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[140px] dark:shadow-none dark:hover:shadow-primary/10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">Latest</SelectItem>
                <SelectItem value="popularity">Popular</SelectItem>
                <SelectItem value="relevancy">Relevant</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" aria-label="Filter articles">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <NewsSearch 
          onSearch={(query) => {
            setSearchQuery(query)
            setPage(1)
          }} 
        />
        
        {searchQuery && (
          <div className="mb-4 flex items-center">
            <p className="text-sm text-muted-foreground">
              Showing results for: <span className="font-medium text-foreground">{searchQuery}</span>
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchQuery("")}
              className="ml-2 h-auto py-1 px-2"
            >
              Clear
            </Button>
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            <p>{error}</p>
            <Button 
              onClick={() => {
                setCategory("general")
                setSortBy("publishedAt")
                setPage(1)
              }}
              variant="outline"
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        )}
        
        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <LoadingCard key={i} />)
          ) : articles.length === 0 && !error ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No articles found. Try a different category or sort option.</p>
              <Button 
                onClick={() => {
                  setCategory("general")
                  setSortBy("publishedAt")
                  setPage(1)
                }} 
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          ) : (
            articles.map((article, index) => (
              <Card 
                key={`${article.url}-${index}`}
                className="overflow-hidden group hover:shadow-md dark:hover:shadow-primary/5 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative md:w-1/3 aspect-video md:aspect-square overflow-hidden rounded-lg">
                      <PlaceholderImage
                        src={article.urlToImage || ''}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        width={400}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">{article.source.name}</span>
                          <time className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</time>
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
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {!loading && articles.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </ErrorBoundary>
  )
}

