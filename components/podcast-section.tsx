"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Clock, RefreshCw } from "lucide-react"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { useAudioPlayerStore } from "@/lib/store"
import { fetchPodcasts, type Podcast } from "@/lib/podcast-api"
import Link from "next/link"

export function PodcastSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const { setCurrentEpisode } = useAudioPlayerStore()

  useEffect(() => {
    async function loadPodcasts() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPodcasts({ sort: 'trending', pageSize: 3 })
        setPodcasts(data)
      } catch (error) {
        console.error('Failed to load podcasts:', error)
        setError('Failed to load podcasts')
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
  }, [])

  if (error) {
    return (
      <section aria-label="Featured Podcasts">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Podcasts</h2>
        <div className="text-center py-8 bg-muted/5 rounded-lg">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Featured Podcasts">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Podcasts</h2>
        <Button variant="ghost" asChild>
          <Link href="/podcasts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          // Loading state
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="bg-muted/5 animate-pulse">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 bg-muted rounded"></div>
                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-8 w-20 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          podcasts.map((podcast) => (
            <Card 
              key={podcast.id} 
              className="group hover:shadow-md dark:hover:shadow-primary/5 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Link href={`/podcasts/${podcast.id}`}>
                      <PlaceholderImage
                        src={podcast.image}
                        alt={podcast.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <Link href={`/podcasts/${podcast.id}`}>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{podcast.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">{podcast.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {podcast.duration}
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
                        onClick={() => setCurrentEpisode({
                          isVisible: true,
                          currentEpisode: {
                            id: podcast.id,
                            title: podcast.title,
                            author: podcast.author,
                            image: podcast.image,
                            url: `https://example.com/podcasts/${podcast.id}/latest.mp3`,
                          }
                        })}
                      >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Play
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}

