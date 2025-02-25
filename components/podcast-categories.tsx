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
      <ScrollArea className="w-full whitespace-nowrap rounded-lg border dark:border-muted/20">
        <div className="flex w-max space-x-2 p-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                className={`
                  flex items-center gap-2 transition-all duration-200
                  ${isActive 
                    ? "dark:bg-primary/20 dark:hover:bg-primary/30 shadow-sm dark:shadow-primary/10" 
                    : "dark:hover:bg-primary/10 dark:border-muted/30"}
                `}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon className={`
                  h-4 w-4 transition-colors duration-200
                  ${isActive 
                    ? "text-primary-foreground dark:text-primary" 
                    : "text-muted-foreground group-hover:text-primary"}
                `} />
                <span className={`
                  transition-colors duration-200
                  ${isActive ? "font-medium" : ""}
                `}>
                  {category.name}
                </span>
              </Button>
            )
          })}
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="dark:bg-muted/20 dark:hover:bg-muted/30 transition-colors"
        />
      </ScrollArea>
    </div>
  )
}

