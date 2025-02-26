import { Header } from "@/components/header"
import { PodcastGrid } from "@/components/podcast-grid"
import { AudioPlayer } from "@/components/audio-player"
import { PodcastCategories } from "@/components/podcast-categories"

export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
            <p className="text-muted-foreground">
              Discover and listen to thousands of podcasts across various topics
            </p>
          </div>
          
          <PodcastCategories />

          <div>
            <h2 className="text-2xl font-bold mb-6">Trending Podcasts</h2>
            <PodcastGrid type="trending" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">New & Notable</h2>
            <PodcastGrid type="new" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Editor's Picks</h2>
            <PodcastGrid type="featured" />
          </div>
        </div>
      </main>
      <AudioPlayer />
    </div>
  )
}

