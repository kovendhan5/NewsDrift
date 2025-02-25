"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, Download, Clock } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import Link from "next/link"
import { ShareMenu } from "@/components/share-menu"
import { useAudioPlayerStore } from "@/lib/store"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { fetchPodcasts, type Podcast } from "@/lib/podcast-api"

interface PodcastGridProps {
  type: "featured" | "trending" | "new" | "subscribed"
}

export function PodcastGrid({ type }: PodcastGridProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const { setCurrentEpisode } = useAudioPlayerStore()

  useEffect(() => {
    async function loadPodcasts() {
      setLoading(true)
      setError(null)
      try {
        // Map grid type to API sort parameter
        const sort = type === 'trending' ? 'trending' 
                  : type === 'new' ? 'new'
                  : type === 'featured' ? 'popular'
                  : undefined;
        
        // For subscribed type, we'll need to implement user-specific logic later
        if (type !== 'subscribed') {
          const data = await fetchPodcasts({ sort })
          setPodcasts(data)
        } else {
          // TODO: Implement subscribed podcasts fetching
          setPodcasts([])
        }
      } catch (error) {
        console.error('Failed to load podcasts:', error)
        setError('Failed to load podcasts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
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

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-500">{error}</h3>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Try Again
        </Button>
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
                <PlaceholderImage
                  src={podcast.image}
                  alt={podcast.title}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <Badge 
                className="absolute top-2 right-2 bg-primary/90 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary/90"
              >
                {podcast.category}
              </Badge>
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
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setCurrentEpisode({
                    isVisible: true,
                    currentEpisode: {
                      id: podcast.id,
                      title: podcast.title,
                      author: podcast.author,
                      image: podcast.image,
                      url: `https://example.com/podcasts/${podcast.id}/latest.mp3`, // This would be a real URL in production
                    }
                  })}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Play Latest
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

