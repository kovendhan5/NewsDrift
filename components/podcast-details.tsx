"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Share2, Bell, Star } from "lucide-react"
import { ShareMenu } from "@/components/share-menu"

// Mock podcast data
const mockPodcastDetails = {
  "tech-talk-daily": {
    id: "tech-talk-daily",
    title: "Tech Talk Daily",
    author: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&q=80",
    category: "Technology",
    description:
      "A daily podcast covering the latest in technology news, trends, and interviews with industry leaders. Join Sarah Johnson as she explores the cutting edge of tech innovation.",
    subscribers: "245K",
    episodes: 156,
    rating: 4.8,
  },
  "business-insights": {
    id: "business-insights",
    title: "Business Insights",
    author: "Mark Williams",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop&q=80",
    category: "Business",
    description:
      "Weekly deep dives into business strategies, market analysis, and entrepreneurship. Mark Williams brings you expert insights and interviews with successful business leaders.",
    subscribers: "180K",
    episodes: 98,
    rating: 4.6,
  },
}

interface PodcastDetailsProps {
  id: string
}

export function PodcastDetails({ id }: PodcastDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [podcast, setPodcast] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPodcast(mockPodcastDetails[id as keyof typeof mockPodcastDetails] || null)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    )
  }

  if (!podcast) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Podcast not found</h3>
        <p className="text-muted-foreground mt-2">The podcast you're looking for doesn't exist or has been removed</p>
      </div>
    )
  }

  return (
    <Card className="group hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300">
      <CardContent className="p-6 space-y-6">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={podcast.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&q=80"}
            alt={podcast.title}
            className="w-full aspect-square object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
          <Badge 
            className="absolute top-2 right-2 bg-primary/90 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary/90 transition-colors"
          >
            {podcast.category}
          </Badge>
        </div>
        <div>
          <h1 className="text-2xl font-bold group-hover:text-primary transition-colors duration-200">{podcast.title}</h1>
          <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
            {podcast.author}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center group/rating">
            <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mr-1 transition-transform group-hover/rating:scale-110" />
            <span className="group-hover/rating:text-yellow-500 dark:group-hover/rating:text-yellow-400 transition-colors">
              {podcast.rating}
            </span>
          </div>
          <div className="group/subs hover:text-primary transition-colors">
            <span className="group-hover/subs:text-primary transition-colors">{podcast.subscribers}</span> subscribers
          </div>
          <div className="group/eps hover:text-primary transition-colors">
            <span className="group-hover/eps:text-primary transition-colors">{podcast.episodes}</span> episodes
          </div>
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
          {podcast.description}
        </p>
        <div className="flex items-center gap-2">
          <Button 
            className={`flex-1 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all 
              ${isSubscribed 
                ? 'bg-primary/90 hover:bg-primary/80 dark:bg-primary/80 dark:hover:bg-primary/70' 
                : ''}`
            }
            onClick={() => setIsSubscribed(!isSubscribed)}
          >
            {isSubscribed ? (
              <>
                <Bell className="h-4 w-4 mr-2 fill-current animate-in zoom-in duration-200" />
                Subscribed
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2 animate-in zoom-in duration-200" />
                Subscribe
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105 dark:border-muted/50"
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-200 ${
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "hover:text-red-500"
              }`} 
            />
          </Button>
          <ShareMenu url={`/podcasts/${podcast.id}`} title={podcast.title}>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Share podcast"
              className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105 dark:border-muted/50"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </ShareMenu>
        </div>
      </CardContent>
    </Card>
  )
}

