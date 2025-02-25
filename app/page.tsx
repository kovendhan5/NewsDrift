import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsFeed } from "@/components/news-feed"
import { PodcastSection } from "@/components/podcast-section"
import { AudioPlayer } from "@/components/audio-player"
import { CategorySidebar } from "@/components/category-sidebar"
import { CategoryCard } from "@/components/category-card"
import { HomeCarbonSection } from "@/components/home-carbon-section"
import { Newspaper, Mic, Globe, Briefcase } from "lucide-react"

const featuredCategories = [
  { icon: Newspaper, name: "News", count: 1234 },
  { icon: Mic, name: "Podcasts", count: 567 },
  { icon: Globe, name: "World", count: 890 },
  { icon: Briefcase, name: "Business", count: 432 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <CategorySidebar className="hidden lg:block w-64 shrink-0" />
        <main className="flex-1">
          <div className="container px-4 py-6">
            <HeroSection />
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredCategories.map((category) => (
                  <CategoryCard key={category.name} {...category} />
                ))}
              </div>
            </section>
            <div className="grid lg:grid-cols-3 gap-6 mt-12">
              <div className="lg:col-span-2">
                <NewsFeed />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <PodcastSection />
                <HomeCarbonSection />
              </div>
            </div>
          </div>
        </main>
      </div>
      <AudioPlayer />
    </div>
  )
}

