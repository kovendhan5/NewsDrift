"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Radio,
  Music,
  Newspaper,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Film,
  Globe,
  Waypoints,
  Book,
  Lightbulb,
  History,
  HandHeart,
  PenLine
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"

const categories = [
  { id: "all", name: "All", icon: Radio },
  { id: "music", name: "Music", icon: Music },
  { id: "news", name: "News", icon: Newspaper },
  { id: "health", name: "Health", icon: HeartPulse },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "entertainment", name: "Entertainment", icon: Film },
  { id: "international", name: "International", icon: Globe },
  { id: "lifestyle", name: "Lifestyle", icon: Waypoints },
  { id: "literature", name: "Literature", icon: Book },
  { id: "science", name: "Science", icon: Lightbulb },
  { id: "history", name: "History", icon: History },
  { id: "society", name: "Society", icon: HandHeart },
  { id: "arts", name: "Arts", icon: PenLine },
]

export function PodcastCategories() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  )

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    const params = new URLSearchParams(searchParams)
    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }
    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2">
            {categories.map(({ id, name, icon: Icon }) => (
              <Button
                key={id}
                variant={activeCategory === id ? "secondary" : "ghost"}
                className="flex items-center gap-2 transition-all"
                onClick={() => handleCategoryClick(id)}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

