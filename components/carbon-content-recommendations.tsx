"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Newspaper, Mic, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RecommendationProps {
  impact: string
  description: string
  actionRequired: string
  progress?: number
}

// Mock carbon-related content
const mockCarbonContent = {
  articles: [
    {
      id: "a1",
      title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
      description: "Small changes in your daily routine that can make a big difference for the environment.",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop&q=80",
      date: "2024-02-22",
    },
    {
      id: "a2",
      title: "The Rise of Sustainable Transportation",
      description: "How electric vehicles and public transit are transforming our cities and reducing emissions.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&q=80",
      date: "2024-02-20",
    },
    {
      id: "a3",
      title: "Understanding Carbon Offsets: Do They Really Work?",
      description: "An in-depth look at carbon offset programs and their effectiveness in fighting climate change.",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop&q=80",
      date: "2024-02-18",
    },
  ],
  podcasts: [
    {
      id: "eco-talks",
      title: "Eco Talks",
      author: "Environmental Network",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop&q=80",
      episode: "Sustainable Living in Urban Areas",
      duration: "38 min",
    },
    {
      id: "climate-solutions",
      title: "Climate Solutions",
      author: "Green Future Initiative",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=200&fit=crop&q=80",
      episode: "Renewable Energy Revolution",
      duration: "45 min",
    },
    {
      id: "planet-pulse",
      title: "Planet Pulse",
      author: "Earth Advocates",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop&q=80",
      episode: "Ocean Conservation Efforts",
      duration: "32 min",
    },
  ],
}

interface CarbonContentRecommendationsProps {
  footprintData?: any
}

function Recommendation({ impact, description, actionRequired, progress }: RecommendationProps) {
  const getImpactStyles = (impact: string) => {
    const baseStyles = "rounded-full px-2 py-0.5 text-xs font-medium"
    switch (impact.toLowerCase()) {
      case "high":
        return `${baseStyles} bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400`
      case "medium":
        return `${baseStyles} bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400`
      case "low":
        return `${baseStyles} bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400`
      default:
        return `${baseStyles} bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400`
    }
  }

  return (
    <Card className="group hover:shadow-md dark:hover:shadow-primary/5 transition-all">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className={getImpactStyles(impact)}>{impact} Impact</span>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
              {description}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Action Required</p>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
            {actionRequired}
          </p>
        </div>
        {progress !== undefined && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 dark:bg-muted/30" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
        <Button 
          variant="outline" 
          className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all"
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Recommendation
          impact="High"
          description="Switch to renewable energy sources for your home"
          actionRequired="Contact your energy provider about green energy options or consider installing solar panels."
          progress={25}
        />
        <Recommendation
          impact="Medium"
          description="Reduce meat consumption"
          actionRequired="Try having at least 3 meatless days per week."
          progress={50}
        />
        <Recommendation
          impact="Low"
          description="Start composting kitchen waste"
          actionRequired="Set up a composting system in your backyard or join a community composting program."
          progress={75}
        />
      </div>
      <Card className="overflow-hidden group">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-800 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            <h3 className="font-semibold">Join the Community Challenge</h3>
          </div>
          <Button 
            variant="secondary" 
            className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
          >
            Join Now
          </Button>
        </div>
      </Card>
    </section>
  )
}

