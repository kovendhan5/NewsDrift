"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { fetchPodcastDetails, type Podcast } from "@/lib/podcast-api"

interface PodcastDetailsProps {
  id: string
}

export function PodcastDetails({ id }: PodcastDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function loadPodcast() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPodcastDetails(id)
        setPodcast(data)
      } catch (error) {
        console.error('Failed to load podcast details:', error)
        setError('Failed to load podcast details. Please try again later.')
        setPodcast(null)
      } finally {
        setLoading(false)
      }
    }

    loadPodcast()
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

  if (error) {
    return (
      <div className="text-center py-8">
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

  if (!podcast) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Podcast not found</h3>
        <p className="text-muted-foreground mt-2">The podcast you're looking for doesn't exist or has been removed.</p>
        <Button
          variant="outline"
          asChild
          className="mt-4"
        >
          <Link href="/podcasts">
            Browse All Podcasts
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 group">
      <div className="relative">
        <PlaceholderImage
          src={podcast.image}
          alt={podcast.title}
          width={400}
          height={400}
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
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-700 dark:to-emerald-800 dark:hover:from-green-800 dark:hover:to-emerald-900"
          onClick={() => setIsSubscribed(!isSubscribed)}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`transition-colors ${isFavorite ? 'border-red-500 hover:border-red-600' : ''}`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
    </div>
  )
}

