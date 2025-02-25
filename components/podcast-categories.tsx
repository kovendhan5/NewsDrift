"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Headphones,
  Mic,
  Newspaper,
  Briefcase,
  HeartPulse,
  Laugh,
  Music,
  Globe,
  BookOpen,
  Lightbulb,
} from "lucide-react"

const categories = [
  { id: "all", name: "All", icon: Headphones },
  { id: "news", name: "News", icon: Newspaper },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "technology", name: "Technology", icon: Mic },
  { id: "health", name: "Health", icon: HeartPulse },
  { id: "comedy", name: "Comedy", icon: Laugh },
  { id: "music", name: "Music", icon: Music },
  { id: "international", name: "International", icon: Globe },
  { id: "education", name: "Education", icon: BookOpen },
  { id: "science", name: "Science", icon: Lightbulb },
]

export function PodcastCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 p-1">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

