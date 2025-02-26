"use client"

import { useState, useEffect, ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import { PodcastGrid } from "@/components/podcast-grid"

// Mock category data
const mockCategoryData = {
  world: {
    id: "world",
    name: "World",
    description: "Stay informed with the latest international news and global affairs.",
    articleCount: 1245,
    podcastCount: 87,
  },
  politics: {
    id: "politics",
    name: "Politics",
    description: "Follow political developments, policy changes, and government news.",
    articleCount: 876,
    podcastCount: 54,
  },
  business: {
    id: "business",
    name: "Business",
    description: "Track market trends, corporate news, and economic developments.",
    articleCount: 654,
    podcastCount: 42,
  },
  technology: {
    id: "technology",
    name: "Technology",
    description: "Explore the latest tech innovations, digital trends, and industry news.",
    articleCount: 987,
    podcastCount: 76,
  },
}

interface CategoryContentProps {
  id: string
  children?: ReactNode
}

export function CategoryContent({ id, children }: CategoryContentProps) {
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCategory(mockCategoryData[id as keyof typeof mockCategoryData] || null)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <LoadingCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Category not found</h3>
        <p className="text-muted-foreground mt-2">The category you're looking for doesn't exist or has been removed</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{category.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-sm">{category.articleCount} Articles</div>
            <div className="bg-secondary/10 dark:bg-secondary/20 px-3 py-1 rounded-full text-sm">{category.podcastCount} Podcasts</div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles">
        <TabsList className="mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
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
          {children}
        </TabsContent>

        <TabsContent value="podcasts" className="mt-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Related Podcasts</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="popular">
                <SelectTrigger className="w-[140px]" aria-label="Sort podcasts">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" aria-label="Filter podcasts">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <PodcastGrid type="featured" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

