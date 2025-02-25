import { Header } from "@/components/header"
import { CategoryContent } from "@/components/category-content"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Add generateStaticParams to handle static export
export function generateStaticParams() {
  // For demo/build purposes, we'll return some sample category IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
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
        <CategoryContent id={params.id} />
      </main>
      <AudioPlayer />
    </div>
  )
}

