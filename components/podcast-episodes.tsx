"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ShareMenu } from "@/components/share-menu"
import { Play, Search, Download, Share2, Clock, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useAudioPlayerStore } from "@/lib/store"
import { fetchPodcastEpisodes, type Episode } from "@/lib/podcast-api"

interface PodcastEpisodesProps {
  id: string
}

export function PodcastEpisodes({ id }: PodcastEpisodesProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { setCurrentEpisode } = useAudioPlayerStore()

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPodcastEpisodes(id, {
          search: searchQuery,
        })
        setEpisodes(data)
        setFilteredEpisodes(data)
      } catch (error) {
        console.error('Failed to load episodes:', error)
        setError('Failed to load episodes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadEpisodes()
  }, [id, searchQuery])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Episodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <Skeleton className="h-10 w-full" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-4 border-b last:border-0">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Episodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Episodes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="dark:bg-muted/50">
              <TabsTrigger value="all">All Episodes</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search episodes..."
                className="pl-8 w-full sm:w-[250px] dark:shadow-none dark:hover:shadow-primary/10 transition-shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-0 mt-0">
            {filteredEpisodes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No episodes found</p>
              </div>
            ) : (
              filteredEpisodes.map((episode) => (
                <div 
                  key={episode.id} 
                  className="py-4 border-b last:border-0 dark:border-muted/20 group hover:bg-muted/5 dark:hover:bg-muted/10 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-1 px-3">
                    <div>
                      <h3 className="font-medium leading-snug group-hover:text-primary transition-colors">
                        {episode.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors mt-1">
                        {episode.description}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0 ml-4">
                      {formatDate(episode.date)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 px-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {episode.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setCurrentEpisode({
                          isVisible: true,
                          currentEpisode: {
                            id: episode.id,
                            title: episode.title,
                            url: episode.audioUrl,
                          }
                        })}
                        className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <ShareMenu url={`/podcasts/${id}/episodes/${episode.id}`} title={episode.title}>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </ShareMenu>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="latest" className="space-y-0 mt-0">
            {filteredEpisodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((episode) => (
              <div 
                key={episode.id} 
                className="py-4 border-b last:border-0 dark:border-muted/20 group hover:bg-muted/5 dark:hover:bg-muted/10 rounded-lg transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1 px-3">
                  <div>
                    <h3 className="font-medium leading-snug group-hover:text-primary transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors mt-1">
                      {episode.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0 ml-4">
                    {formatDate(episode.date)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 px-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setCurrentEpisode({
                        isVisible: true,
                        currentEpisode: {
                          id: episode.id,
                          title: episode.title,
                          url: episode.audioUrl,
                        }
                      })}
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <ShareMenu url={`/podcasts/${id}/episodes/${episode.id}`} title={episode.title}>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </ShareMenu>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-0 mt-0">
            {filteredEpisodes.map((episode) => (
              <div 
                key={episode.id} 
                className="py-4 border-b last:border-0 dark:border-muted/20 group hover:bg-muted/5 dark:hover:bg-muted/10 rounded-lg transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1 px-3">
                  <div>
                    <h3 className="font-medium leading-snug group-hover:text-primary transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors mt-1">
                      {episode.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0 ml-4">
                    {formatDate(episode.date)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 px-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setCurrentEpisode({
                        isVisible: true,
                        currentEpisode: {
                          id: episode.id,
                          title: episode.title,
                          url: episode.audioUrl,
                        }
                      })}
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <ShareMenu url={`/podcasts/${id}/episodes/${episode.id}`} title={episode.title}>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </ShareMenu>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

