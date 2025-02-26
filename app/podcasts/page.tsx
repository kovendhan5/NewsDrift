import { Header } from "@/components/header"
import { PodcastGrid } from "@/components/podcast-grid"
import { PodcastCategories } from "@/components/podcast-categories"
import { AudioPlayer } from "@/components/audio-player"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
            <p className="text-muted-foreground">Discover and listen to your favorite podcasts all in one place</p>
          </div>

          <PodcastCategories />

          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New Releases</TabsTrigger>
              <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
            </TabsList>
            <TabsContent value="featured">
              <PodcastGrid type="featured" />
            </TabsContent>
            <TabsContent value="trending">
              <PodcastGrid type="trending" />
            </TabsContent>
            <TabsContent value="new">
              <PodcastGrid type="new" />
            </TabsContent>
            <TabsContent value="subscribed">
              <PodcastGrid type="subscribed" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <AudioPlayer />
    </div>
  )
}

