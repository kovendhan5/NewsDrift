import { Header } from "@/components/header"
import { PodcastDetails } from "@/components/podcast-details"
import { PodcastEpisodes } from "@/components/podcast-episodes"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Add generateStaticParams to handle static export
export function generateStaticParams() {
  // This should return an array of objects with the possible id values
  // For demo/build purposes, we'll return some sample IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function PodcastDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/podcasts" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Podcasts
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <PodcastDetails id={params.id} />
          </div>
          <div className="md:col-span-2">
            <PodcastEpisodes id={params.id} />
          </div>
        </div>
      </main>
      <AudioPlayer />
    </div>
  )
}

