import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeCarbonSection } from "@/components/home-carbon-section"
import { NewsFeed } from "@/components/news-feed"
import { PodcastSection } from "@/components/podcast-section"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main 
        className="container px-4 md:px-6 py-8 md:py-12" 
        role="main"
      >
        <div className="space-y-8 md:space-y-16">
          <Suspense 
            fallback={
              <div className="flex justify-center">
                <Spinner className="mx-auto" aria-label="Loading content" />
              </div>
            }
          >
            <NewsFeed />
            <PodcastSection />
            <HomeCarbonSection />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

