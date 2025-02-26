"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, Clock } from "lucide-react"
import { ShareMenu } from "@/components/share-menu"
import { useAudioPlayerStore } from "@/lib/store"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { fetchPodcasts, type Podcast } from "@/lib/podcast-api"
import { PodcastGridSkeleton } from "@/components/ui/podcast-grid-skeleton"
import { PodcastGridError } from "@/components/ui/podcast-grid-error"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface PodcastGridProps {
  type: "featured" | "trending" | "new" | "subscribed"
}

export function PodcastGrid({ type }: PodcastGridProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const { setCurrentEpisode } = useAudioPlayerStore()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const loadPodcasts = async () => {
    try {
      setLoading(true)
      setError(null)
      const sort = type === 'trending' ? 'trending' 
                : type === 'new' ? 'new'
                : type === 'featured' ? 'popular'
                : undefined;
      
      if (type !== 'subscribed') {
        const data = await fetchPodcasts({ 
          sort,
          category: category === 'all' ? undefined : category || undefined
        })
        setPodcasts(data)
      } else {
        // Get subscribed podcasts from localStorage
        const subscriptions = JSON.parse(localStorage.getItem('subscribedPodcasts') || '[]')
        const subscribedPodcasts = []
        for (const id of subscriptions) {
          try {
            const podcast = await fetchPodcasts({ id })
            subscribedPodcasts.push(...podcast)
          } catch (err) {
            console.error(`Failed to load subscribed podcast ${id}:`, err)
          }
        }
        setPodcasts(subscribedPodcasts)
      }
    } catch (err) {
      console.error('Failed to load podcasts:', err)
      setError('Failed to load podcasts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPodcasts()
    
    // Load favorite podcast IDs from localStorage
    try {
      const storedFavorites = localStorage.getItem('favoritePodcasts')
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (err) {
      console.error('Could not load favorites from localStorage:', err)
    }
  }, [type, category])

  const toggleFavorite = (podcastId: string) => {
    const newFavorites = favorites.includes(podcastId)
      ? favorites.filter(id => id !== podcastId)
      : [...favorites, podcastId]
    
    setFavorites(newFavorites)
    
    // Save to localStorage
    try {
      localStorage.setItem('favoritePodcasts', JSON.stringify(newFavorites))
    } catch (err) {
      console.error('Could not save favorites to localStorage:', err)
    }
  }

  if (loading) {
    return <PodcastGridSkeleton />
  }

  if (error) {
    return <PodcastGridError message={error} onRetry={loadPodcasts} />
  }

  if (podcasts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No podcasts found</h3>
        <p className="text-muted-foreground mt-2">
          {type === 'subscribed' 
            ? "You haven't subscribed to any podcasts yet"
            : "Try a different category or check back later"}
        </p>
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
                <div className="relative aspect-square overflow-hidden">
                  <PlaceholderImage
                    src={podcast.image}
                    alt={podcast.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </Link>
              <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/80">
                {podcast.category}
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              <Link href={`/podcasts/${podcast.id}`}>
                <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {podcast.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-1">{podcast.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{podcast.duration}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {podcast.episodes} episodes
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                  onClick={() => {
                    // Use the first episode if available, or create a placeholder
                    const episode = podcast.episodesList?.[0] || {
                      id: `${podcast.id}-latest`,
                      title: `Latest Episode of ${podcast.title}`,
                      audioUrl: `https://example.com/podcasts/${podcast.id}/latest.mp3`
                    }
                    
                    setCurrentEpisode({
                      isVisible: true,
                      currentEpisode: {
                        id: episode.id,
                        title: episode.title,
                        author: podcast.author,
                        image: podcast.image,
                        url: episode.audioUrl,
                      }
                    })
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-all hover:text-red-500 hover:border-red-500"
                  onClick={() => toggleFavorite(podcast.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.includes(podcast.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <ShareMenu
                  url={`/podcasts/${podcast.id}`}
                  title={podcast.title}
                  triggerClassName="border"
                >
                  <Share2 className="h-4 w-4" />
                </ShareMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

