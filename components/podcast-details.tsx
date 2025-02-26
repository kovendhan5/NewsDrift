"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Globe, Rss, PlayCircle, Download } from "lucide-react"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { ShareMenu } from "@/components/share-menu"
import { useAudioPlayerStore } from "@/lib/store"
import { fetchPodcastById, type Podcast } from "@/lib/podcast-api"
import { downloadPodcastEpisode } from "@/lib/utils"
import { PodcastEpisodes } from "@/components/podcast-episodes"

interface PodcastDetailsProps {
  id: string
}

export function PodcastDetails({ id }: PodcastDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { setCurrentEpisode } = useAudioPlayerStore()

  useEffect(() => {
    async function loadPodcast() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPodcastById(id)
        setPodcast(data)

        // Load user preferences from localStorage
        const favorites = JSON.parse(localStorage.getItem('favoritePodcasts') || '[]')
        const subscriptions = JSON.parse(localStorage.getItem('subscribedPodcasts') || '[]')
        setIsFavorite(favorites.includes(id))
        setIsSubscribed(subscriptions.includes(id))
      } catch (err) {
        console.error('Failed to load podcast:', err)
        setError('Failed to load podcast details')
      } finally {
        setLoading(false)
      }
    }

    loadPodcast()
  }, [id])

  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoritePodcasts') || '[]')
      const newFavorites = isFavorite
        ? favorites.filter((fav: string) => fav !== id)
        : [...favorites, id]
      
      localStorage.setItem('favoritePodcasts', JSON.stringify(newFavorites))
      setIsFavorite(!isFavorite)
    } catch (err) {
      console.error('Failed to update favorites:', err)
    }
  }

  const toggleSubscription = () => {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('subscribedPodcasts') || '[]')
      const newSubscriptions = isSubscribed
        ? subscriptions.filter((sub: string) => sub !== id)
        : [...subscriptions, id]
      
      localStorage.setItem('subscribedPodcasts', JSON.stringify(newSubscriptions))
      setIsSubscribed(!isSubscribed)
    } catch (err) {
      console.error('Failed to update subscriptions:', err)
    }
  }

  const playLatestEpisode = () => {
    if (podcast?.episodesList?.[0]) {
      const episode = podcast.episodesList[0]
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
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 aspect-square bg-muted animate-pulse rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-9 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-9 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-500 mb-2">{error}</h3>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!podcast) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Podcast not found</h3>
        <p className="text-muted-foreground mt-2">
          The podcast you're looking for doesn't exist or has been removed
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 rounded-lg overflow-hidden">
              <PlaceholderImage
                src={podcast.image}
                alt={podcast.title}
                width={256}
                height={256}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{podcast.title}</h1>
                <p className="text-lg text-muted-foreground">{podcast.author}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{podcast.category}</Badge>
                <Badge variant="outline">{podcast.episodes} Episodes</Badge>
                <Badge variant="outline">{podcast.duration}</Badge>
              </div>
              <p className="text-muted-foreground">{podcast.description}</p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="default"
                  className="gap-2"
                  onClick={playLatestEpisode}
                >
                  <PlayCircle className="h-4 w-4" />
                  Play Latest
                </Button>
                <Button
                  variant={isSubscribed ? "secondary" : "outline"}
                  className="gap-2"
                  onClick={toggleSubscription}
                >
                  <Rss className="h-4 w-4" />
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`transition-all hover:text-red-500 hover:border-red-500 ${
                    isFavorite ? "text-red-500 border-red-500" : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart className={isFavorite ? "fill-red-500" : ""} />
                </Button>
                <ShareMenu
                  url={`/podcasts/${podcast.id}`}
                  title={podcast.title}
                  triggerClassName="border"
                >
                  <Share2 className="h-4 w-4" />
                </ShareMenu>
                {podcast.website && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a 
                      href={podcast.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Visit podcast website"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <CardHeader className="px-0">
          <CardTitle>Episodes</CardTitle>
        </CardHeader>
        <PodcastEpisodes 
          podcastId={id}
          podcastTitle={podcast.title}
          podcastImage={podcast.image}
          podcastAuthor={podcast.author}
        />
      </div>
    </div>
  )
}

