"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Newspaper, Mic, Globe, Briefcase, HeartPulse, Gamepad2, Music, Film, BookOpen, Sparkles } from "lucide-react"
import { useState } from "react"

const categories = [
  {
    name: "News",
    icon: Newspaper,
    subcategories: ["World", "Politics", "Business"],
  },
  {
    name: "Podcasts",
    icon: Mic,
    subcategories: ["Interview", "True Crime", "Comedy"],
  },
  {
    name: "World",
    icon: Globe,
    subcategories: ["Europe", "Asia", "Americas"],
  },
  {
    name: "Business",
    icon: Briefcase,
    subcategories: ["Finance", "Technology", "Startups"],
  },
  {
    name: "Health",
    icon: HeartPulse,
    subcategories: ["Wellness", "Fitness", "Nutrition"],
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    subcategories: ["Reviews", "News", "Esports"],
  },
  {
    name: "Music",
    icon: Music,
    subcategories: ["Reviews", "News", "Interviews"],
  },
  {
    name: "Entertainment",
    icon: Film,
    subcategories: ["Movies", "TV Shows", "Celebrities"],
  },
  {
    name: "Education",
    icon: BookOpen,
    subcategories: ["Science", "History", "Technology"],
  },
  {
    name: "Trending",
    icon: Sparkles,
    subcategories: ["Daily Top", "Weekly Best", "Most Shared"],
  },
]

interface CategorySidebarProps {
  className?: string
}

export function CategorySidebar({ className }: CategorySidebarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Categories</h2>
          <ScrollArea className="h-[calc(100vh-10rem)] px-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <Button
                    variant={activeCategory === category.name ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                  {activeCategory === category.name && (
                    <div className="ml-6 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Button key={sub} variant="ghost" className="w-full justify-start text-sm font-normal">
                          {sub}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

