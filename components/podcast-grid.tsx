"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, Download, Clock } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import Link from "next/link"
import { ShareMenu } from "@/components/share-menu"

// Mock podcast data
const mockPodcasts = {
  featured: [
    {
      id: "tech-talk-daily",
      title: "Tech Talk Daily",
      author: "Sarah Johnson",
      image: "/placeholder.svg?height=300&width=300",
      category: "Technology",
      episodes: 156,
      duration: "45 min",
    },
    {
      id: "business-insights",
      title: "Business Insights",
      author: "Mark Williams",
      image: "/placeholder.svg?height=300&width=300",
      category: "Business",
      episodes: 89,
      duration: "30 min",
    },
    {
      id: "health-matters",
      title: "Health Matters",
      author: "Dr. Emily Chen",
      image: "/placeholder.svg?height=300&width=300",
      category: "Health",
      episodes: 112,
      duration: "40 min",
    },
    {
      id: "true-crime-stories",
      title: "True Crime Stories",
      author: "Detective John Smith",
      image: "/placeholder.svg?height=300&width=300",
      category: "True Crime",
      episodes: 78,
      duration: "60 min",
    },
    {
      id: "science-explained",
      title: "Science Explained",
      author: "Professor Alex Turner",
      image: "/placeholder.svg?height=300&width=300",
      category: "Science",
      episodes: 134,
      duration: "35 min",
    },
    {
      id: "comedy-hour",
      title: "Comedy Hour",
      author: "Lisa Brown",
      image: "/placeholder.svg?height=300&width=300",
      category: "Comedy",
      episodes: 201,
      duration: "50 min",
    },
  ],
  trending: [
    {
      id: "daily-news-roundup",
      title: "Daily News Roundup",
      author: "News Network",
      image: "/placeholder.svg?height=300&width=300",
      category: "News",
      episodes: 365,
      duration: "25 min",
    },
    {
      id: "financial-freedom",
      title: "Financial Freedom",
      author: "Robert Green",
      image: "/placeholder.svg?height=300&width=300",
      category: "Finance",
      episodes: 67,
      duration: "45 min",
    },
    {
      id: "mindfulness-meditation",
      title: "Mindfulness Meditation",
      author: "Zen Master Kim",
      image: "/placeholder.svg?height=300&width=300",
      category: "Wellness",
      episodes: 92,
      duration: "20 min",
    },
    {
      id: "history-uncovered",
      title: "History Uncovered",
      author: "Professor James Wilson",
      image: "/placeholder.svg?height=300&width=300",
      category: "History",
      episodes: 104,
      duration: "55 min",
    },
  ],
  new: [
    {
      id: "future-tech",
      title: "Future Tech",
      author: "Tech Innovators",
      image: "/placeholder.svg?height=300&width=300",
      category: "Technology",
      episodes: 12,
      duration: "40 min",
    },
    {
      id: "cooking-adventures",
      title: "Cooking Adventures",
      author: "Chef Maria Garcia",
      image: "/placeholder.svg?height=300&width=300",
      category: "Food",
      episodes: 8,
      duration: "35 min",
    },
    {
      id: "travel-tales",
      title: "Travel Tales",
      author: "Nomad Explorers",
      image: "/placeholder.svg?height=300&width=300",
      category: "Travel",
      episodes: 15,
      duration: "50 min",
    },
  ],
  subscribed: [
    {
      id: "tech-talk-daily",
      title: "Tech Talk Daily",
      author: "Sarah Johnson",
      image: "/placeholder.svg?height=300&width=300",
      category: "Technology",
      episodes: 156,
      duration: "45 min",
    },
    {
      id: "mindfulness-meditation",
      title: "Mindfulness Meditation",
      author: "Zen Master Kim",
      image: "/placeholder.svg?height=300&width=300",
      category: "Wellness",
      episodes: 92,
      duration: "20 min",
    },
  ],
}

interface PodcastGridProps {
  type: "featured" | "trending" | "new" | "subscribed"
}

export function PodcastGrid({ type }: PodcastGridProps) {
  const [loading, setLoading] = useState(true)
  const [podcasts, setPodcasts] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPodcasts(mockPodcasts[type] || [])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [type])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    )
  }

  if (podcasts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No podcasts found</h3>
        <p className="text-muted-foreground mt-2">Try a different category or check back later</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {podcasts.map((podcast) => (
        <Card key={podcast.id} className="overflow-hidden group hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/5 transition-all">
          <CardContent className="p-0">
            <div className="relative">
              <Link href={`/podcasts/${podcast.id}`}>
                <img
                  src={podcast.image || "/placeholder.svg"}
                  alt={podcast.title}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary/90">{podcast.category}</Badge>
            </div>
            <div className="p-4">
              <Link href={`/podcasts/${podcast.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg line-clamp-1">{podcast.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">{podcast.author}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{podcast.episodes} episodes</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {podcast.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => toggleFavorite(podcast.id)}
                  aria-label={favorites.includes(podcast.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(podcast.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <ShareMenu url={`/podcasts/${podcast.id}`} title={podcast.title}>
                  <Button size="icon" variant="outline" className="h-8 w-8" aria-label="Share podcast">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </ShareMenu>
                <Button size="icon" variant="outline" className="h-8 w-8" aria-label="Download podcast">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

