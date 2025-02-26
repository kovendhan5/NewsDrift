"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "lucide-react"
import { useAudioPlayerStore } from "@/lib/store"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
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
      } catch (err) {
        console.error('Failed to load podcasts:', err)
        setError('Failed to load trending podcasts')
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
  }, [])

  if (error) {
    return (
      <section aria-label="Featured Podcasts">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Podcasts</h2>
          <Button variant="ghost" asChild>
            <Link href="/podcasts" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
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
          <Link href="/podcasts" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 bg-muted animate-pulse rounded" />
                    <div className="h-9 w-9 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          podcasts.map((podcast) => (
            <Card key={podcast.id} className="overflow-hidden group hover:shadow-md transition-all">
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
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
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
                  <Button
                    variant="secondary"
                    className="w-full gap-2 shadow-sm hover:shadow-md transition-all"
                    onClick={() => {
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
                    <Play className="h-4 w-4" />
                    Play Latest
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}

