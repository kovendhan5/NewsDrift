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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Business",
    description:
      "Weekly discussions on business strategies, market trends, and entrepreneurship. Mark Williams brings years of experience to help you navigate the business world.",
    subscribers: "189K",
    episodes: 89,
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
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="relative">
          <img
            src={podcast.image || "/placeholder.svg"}
            alt={podcast.title}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">{podcast.category}</Badge>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{podcast.title}</h1>
          <p className="text-muted-foreground">{podcast.author}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{podcast.rating}</span>
          </div>
          <div>{podcast.subscribers} subscribers</div>
          <div>{podcast.episodes} episodes</div>
        </div>

        <p className="text-sm">{podcast.description}</p>

        <div className="flex items-center gap-2">
          <Button className="flex-1" onClick={() => setIsSubscribed(!isSubscribed)}>
            {isSubscribed ? (
              <>
                <Bell className="h-4 w-4 mr-2 fill-current" />
                Subscribed
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <ShareMenu url={`/podcasts/${podcast.id}`} title={podcast.title}>
            <Button variant="outline" size="icon" aria-label="Share podcast">
              <Share2 className="h-4 w-4" />
            </Button>
          </ShareMenu>
        </div>
      </CardContent>
    </Card>
  )
}

