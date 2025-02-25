"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { LoadingCard } from "@/components/loading-card"
import Link from "next/link"
import {
  Mic,
  Globe,
  Briefcase,
  HeartPulse,
  Gamepad2,
  Music,
  Film,
  BookOpen,
  Utensils,
  Camera,
  Shirt,
  Plane,
  Dumbbell,
  Palette,
  Landmark,
  Leaf,
} from "lucide-react"

// Mock category data
const mockCategories = {
  news: [
    { id: "world", name: "World", icon: Globe, count: 1245 },
    { id: "politics", name: "Politics", icon: Landmark, count: 876 },
    { id: "business", name: "Business", icon: Briefcase, count: 654 },
    { id: "technology", name: "Technology", icon: Mic, count: 987 },
    { id: "science", name: "Science", icon: BookOpen, count: 432 },
    { id: "health", name: "Health", icon: HeartPulse, count: 765 },
  ],
  entertainment: [
    { id: "movies", name: "Movies", icon: Film, count: 876 },
    { id: "music", name: "Music", icon: Music, count: 765 },
    { id: "gaming", name: "Gaming", icon: Gamepad2, count: 543 },
    { id: "celebrities", name: "Celebrities", icon: Camera, count: 321 },
    { id: "arts", name: "Arts", icon: Palette, count: 234 },
  ],
  lifestyle: [
    { id: "food", name: "Food", icon: Utensils, count: 654 },
    { id: "travel", name: "Travel", icon: Plane, count: 432 },
    { id: "fashion", name: "Fashion", icon: Shirt, count: 321 },
    { id: "fitness", name: "Fitness", icon: Dumbbell, count: 234 },
    { id: "environment", name: "Environment", icon: Leaf, count: 123 },
  ],
}

export function CategoryList() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState<any>({})

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCategories(mockCategories)
      setFilteredCategories(mockCategories)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories)
    } else {
      const filtered: any = {}

      Object.keys(categories).forEach((section) => {
        const filteredSection = categories[section].filter((category: any) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        if (filteredSection.length > 0) {
          filtered[section] = filteredSection
        }
      })

      setFilteredCategories(filtered)
    }
  }, [searchQuery, categories])

  if (loading) {
    return (
      <div>
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search categories..." className="pl-8 w-full max-w-sm" disabled />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          className="pl-8 w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="news">
        <TabsList className="mb-6">
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
        </TabsList>

        {Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No categories found</h3>
            <p className="text-muted-foreground mt-2">Try a different search term</p>
          </div>
        ) : (
          <>
            <TabsContent value="news" className="mt-0">
              {filteredCategories.news && filteredCategories.news.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCategories.news.map((category: any) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No news categories found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="entertainment" className="mt-0">
              {filteredCategories.entertainment && filteredCategories.entertainment.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCategories.entertainment.map((category: any) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No entertainment categories found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lifestyle" className="mt-0">
              {filteredCategories.lifestyle && filteredCategories.lifestyle.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCategories.lifestyle.map((category: any) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No lifestyle categories found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

function CategoryCard({ category }: { category: any }) {
  const Icon = category.icon

  return (
    <Link href={`/categories/${category.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.count} articles</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

