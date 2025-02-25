import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsFeed } from "@/components/news-feed"
import { PodcastSection } from "@/components/podcast-section"
import { HomeCarbonSection } from "@/components/home-carbon-section"
import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main className="container px-4 py-8 space-y-12">
        <Suspense fallback={<Spinner className="mx-auto" />}>
          <NewsFeed />
        </Suspense>
        <Suspense fallback={<Spinner className="mx-auto" />}>
          <PodcastSection />
        </Suspense>
        <Suspense fallback={<Spinner className="mx-auto" />}>
          <HomeCarbonSection />
        </Suspense>
      </main>
    </div>
  )
}

