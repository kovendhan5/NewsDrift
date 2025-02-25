import { Header } from "@/components/header"
import { CategoryList } from "@/components/category-list"
import { AudioPlayer } from "@/components/audio-player"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Categories</h1>
            <p className="text-muted-foreground">Browse content by topic to find exactly what you're looking for</p>
          </div>
          <CategoryList />
        </div>
      </main>
      <AudioPlayer />
    </div>
  )
}