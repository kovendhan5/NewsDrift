"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Newspaper, Mic, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock carbon-related content
const mockCarbonContent = {
  articles: [
    {
      id: "a1",
      title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
      description: "Small changes in your daily routine that can make a big difference for the environment.",
      category: "Lifestyle",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-02-22",
    },
    {
      id: "a2",
      title: "The Rise of Sustainable Transportation",
      description: "How electric vehicles and public transit are transforming our cities and reducing emissions.",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-02-20",
    },
    {
      id: "a3",
      title: "Understanding Carbon Offsets: Do They Really Work?",
      description: "An in-depth look at carbon offset programs and their effectiveness in fighting climate change.",
      category: "Environment",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-02-18",
    },
  ],
  podcasts: [
    {
      id: "eco-talks",
      title: "Eco Talks",
      author: "Environmental Network",
      image: "/placeholder.svg?height=150&width=150",
      episode: "Sustainable Living in Urban Areas",
      duration: "38 min",
    },
    {
      id: "climate-solutions",
      title: "Climate Solutions",
      author: "Green Future Initiative",
      image: "/placeholder.svg?height=150&width=150",
      episode: "Renewable Energy Revolution",
      duration: "45 min",
    },
    {
      id: "planet-pulse",
      title: "Planet Pulse",
      author: "Earth Advocates",
      image: "/placeholder.svg?height=150&width=150",
      episode: "Ocean Conservation Efforts",
      duration: "32 min",
    },
  ],
}

interface CarbonContentRecommendationsProps {
  footprintData?: any
}

export function CarbonContentRecommendations({ footprintData }: CarbonContentRecommendationsProps) {
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<typeof mockCarbonContent>({ articles: [], podcasts: [] })

  useEffect(() => {
    // In a real app, we would use the footprintData to personalize recommendations
    // For now, we'll just simulate an API call with a delay
    const timer = setTimeout(() => {
      setContent(mockCarbonContent)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          Recommended Content for You
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="articles">
          <TabsList className="mb-4">
            <TabsTrigger value="articles" className="flex items-center gap-1">
              <Newspaper className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="podcasts" className="flex items-center gap-1">
              <Mic className="h-4 w-4" />
              Podcasts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-32 bg-muted animate-pulse" />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {content.articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          alt={article.title}
                          className="h-48 w-full object-cover md:h-full"
                          src={article.image || "/placeholder.svg"}
                        />
                      </div>
                      <div className="md:w-2/3 p-4">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-primary">{article.category}</span>
                          <h3 className="font-semibold text-lg mt-1">{article.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                        <div className="flex justify-between items-center">
                          <time className="text-xs text-muted-foreground">{article.date}</time>
                          <Button size="sm" variant="outline">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/categories/environment" className="flex items-center gap-1">
                      Browse More Environmental Content
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="podcasts" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-24 bg-muted animate-pulse" />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {content.podcasts.map((podcast) => (
                  <Card key={podcast.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          alt={podcast.title}
                          className="h-20 w-20 rounded-lg object-cover"
                          src={podcast.image || "/placeholder.svg"}
                        />
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <h3 className="font-semibold">{podcast.title}</h3>
                            <p className="text-sm text-muted-foreground">{podcast.episode}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">{podcast.duration}</div>
                            <Button size="sm" variant="secondary">
                              <Mic className="mr-2 h-4 w-4" />
                              Listen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/podcasts" className="flex items-center gap-1">
                      Discover More Environmental Podcasts
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

