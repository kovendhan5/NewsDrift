"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useNewsStore } from "@/lib/store"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { cn } from "@/lib/utils"
import { Newspaper, Briefcase, Globe, Tv, HeartPulse, Lightbulb, Football } from "lucide-react"

const categories = [
  {
    id: "general",
    name: "General",
    description: "Top stories and breaking news from around the world",
    icon: Newspaper,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "business",
    name: "Business",
    description: "Latest business news, markets, and economic updates",
    icon: Briefcase,
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "world",
    name: "World",
    description: "International news and global developments",
    icon: Globe,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Entertainment, arts, and culture news",
    icon: Tv,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    id: "health",
    name: "Health",
    description: "Health news, medical research, and wellness updates",
    icon: HeartPulse,
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: "science",
    name: "Science",
    description: "Latest scientific discoveries and research news",
    icon: Lightbulb,
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sports news, scores, and highlights",
    icon: Football,
    color: "bg-orange-500/10 text-orange-500",
  },
]

export function CategoryList() {
  const { category: activeCategory } = useNewsStore()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="block"
          >
            <Card className={cn(
              "relative overflow-hidden group transition-all hover:shadow-md dark:hover:shadow-primary/5",
              activeCategory === category.id && "ring-2 ring-primary",
            )}>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-full", 
                    category.color,
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

