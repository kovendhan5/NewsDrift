"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Download, Clock, Calendar, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock episode data
const mockEpisodes = {
  "tech-talk-daily": [
    {
      id: "e1",
      title: "The Future of AI in Everyday Life",
      description:
        "We discuss how artificial intelligence is transforming our daily routines and what to expect in the coming years.",
      date: "2024-02-20",
      duration: "45:12",
    },
    {
      id: "e2",
      title: "Blockchain Beyond Cryptocurrency",
      description: "Exploring the practical applications of blockchain technology beyond digital currencies.",
      date: "2024-02-13",
      duration: "38:45",
    },
    {
      id: "e3",
      title: "The Rise of Quantum Computing",
      description: "Understanding quantum computing and its potential impact on technology and security.",
      date: "2024-02-06",
      duration: "52:30",
    },
    {
      id: "e4",
      title: "Tech Ethics: Navigating the Gray Areas",
      description: "A discussion on ethical considerations in technology development and implementation.",
      date: "2024-01-30",
      duration: "41:18",
    },
    {
      id: "e5",
      title: "The Evolution of Smart Homes",
      description: "How smart home technology has evolved and where it's headed in the future.",
      date: "2024-01-23",
      duration: "36:55",
    },
  ],
  "business-insights": [
    {
      id: "e1",
      title: "Market Trends for 2024",
      description: "Analyzing the current market trends and predictions for the coming year.",
      date: "2024-02-18",
      duration: "32:45",
    },
    {
      id: "e2",
      title: "Leadership in Remote Work Environments",
      description: "Strategies for effective leadership in distributed and remote teams.",
      date: "2024-02-11",
      duration: "29:20",
    },
    {
      id: "e3",
      title: "Sustainable Business Practices",
      description:
        "How businesses are incorporating sustainability into their operations and the benefits they're seeing.",
      date: "2024-02-04",
      duration: "35:10",
    },
  ],
}

interface PodcastEpisodesProps {
  id: string
}

export function PodcastEpisodes({ id }: PodcastEpisodesProps) {
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState<any[]>([])
  const [filteredEpisodes, setFilteredEpisodes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const podcastEpisodes = mockEpisodes[id as keyof typeof mockEpisodes] || []
      setEpisodes(podcastEpisodes)
      setFilteredEpisodes(podcastEpisodes)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEpisodes(episodes)
    } else {
      const filtered = episodes.filter(
        (episode) =>
          episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          episode.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredEpisodes(filtered)
    }
  }, [searchQuery, episodes])

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
                    <h3 className="font-medium group-hover:text-primary transition-colors">{episode.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap ml-2">
                      <Clock className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                      {episode.duration}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 px-3 group-hover:text-muted-foreground/80 transition-colors">
                    {episode.description}
                  </p>
                  <div className="flex justify-between items-center px-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                      {formatDate(episode.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105 dark:border-muted/50"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="latest" className="space-y-0 mt-0">
            {filteredEpisodes.slice(0, 3).map((episode) => (
              <div 
                key={episode.id} 
                className="py-4 border-b last:border-0 dark:border-muted/20 group hover:bg-muted/5 dark:hover:bg-muted/10 rounded-lg transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1 px-3">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{episode.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap ml-2">
                    <Clock className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                    {episode.duration}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 px-3 group-hover:text-muted-foreground/80 transition-colors">
                  {episode.description}
                </p>
                <div className="flex justify-between items-center px-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                    {formatDate(episode.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105 dark:border-muted/50"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-0 mt-0">
            {filteredEpisodes.slice(1, 4).map((episode) => (
              <div 
                key={episode.id} 
                className="py-4 border-b last:border-0 dark:border-muted/20 group hover:bg-muted/5 dark:hover:bg-muted/10 rounded-lg transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1 px-3">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{episode.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap ml-2">
                    <Clock className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                    {episode.duration}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 px-3 group-hover:text-muted-foreground/80 transition-colors">
                  {episode.description}
                </p>
                <div className="flex justify-between items-center px-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                    {formatDate(episode.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105 dark:border-muted/50"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
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

