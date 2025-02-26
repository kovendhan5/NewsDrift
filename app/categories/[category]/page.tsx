"use client"

import { useEffect } from "react"
import { useNewsStore } from "@/lib/store"
import { NewsFeed } from "@/components/news-feed"
import { Header } from "@/components/header"
import { CategoryContent } from "@/components/category-content"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { setCategory } = useNewsStore()

  useEffect(() => {
    setCategory(params.category)
  }, [params.category, setCategory])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/categories" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
        <CategoryContent id={params.category}>
          <NewsFeed />
        </CategoryContent>
      </main>
      <AudioPlayer />
    </div>
  )
}