"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Clock, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { formatTime } from "@/lib/utils"
import { useAudioPlayerStore } from "@/lib/store"
import { fetchPodcastEpisodes, type PodcastEpisode } from "@/lib/podcast-api"
import { downloadPodcastEpisode } from "@/lib/utils"

interface PodcastEpisodesProps {
  podcastId: string
  podcastTitle: string
  podcastImage: string
  podcastAuthor: string
}

export function PodcastEpisodes({
  podcastId,
  podcastTitle,
  podcastImage,
  podcastAuthor,
}: PodcastEpisodesProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const { setCurrentEpisode } = useAudioPlayerStore()
  const [downloadingEpisodes, setDownloadingEpisodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPodcastEpisodes(podcastId)
        setEpisodes(data)
      } catch (err) {
        console.error('Failed to load episodes:', err)
        setError('Failed to load episodes')
      } finally {
        setLoading(false)
      }
    }

    loadEpisodes()
  }, [podcastId])

  const handlePlay = (episode: PodcastEpisode) => {
    setCurrentEpisode({
      isVisible: true,
      currentEpisode: {
        id: episode.id,
        title: episode.title,
        author: podcastAuthor,
        image: podcastImage,
        url: episode.audioUrl,
      }
    })
  }

  const handleDownload = async (episode: PodcastEpisode) => {
    try {
      setDownloadingEpisodes(prev => new Set(prev).add(episode.id))
      await downloadPodcastEpisode(episode.audioUrl, episode.title)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloadingEpisodes(prev => {
        const next = new Set(prev)
        next.delete(episode.id)
        return next
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-muted/5">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-5 w-3/4 bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                    <div className="h-9 w-9 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No episodes available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <Card key={episode.id} className="group hover:shadow-md dark:hover:shadow-primary/5 transition-all">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {episode.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {episode.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDistanceToNow(new Date(episode.publishDate), { addSuffix: true })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatTime(episode.duration)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="gap-2 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                    onClick={() => handlePlay(episode)}
                  >
                    <Play className="h-4 w-4" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(episode)}
                    disabled={downloadingEpisodes.has(episode.id)}
                  >
                    <Download className={`h-4 w-4 ${
                      downloadingEpisodes.has(episode.id) ? 'animate-bounce' : ''
                    }`} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

