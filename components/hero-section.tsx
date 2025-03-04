import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

export function HeroSection() {
  return (
    <Card className="w-full overflow-hidden rounded-lg border-0">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 dark:from-primary/80 dark:to-primary/50" />
          <div className="relative grid gap-4 p-6 md:grid-cols-2 md:gap-8 md:p-10">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover Your Next Story
                </h1>
                <p className="text-lg text-white/90 md:text-xl">
                  Personalized news and podcasts tailored to your interests. Start exploring now.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 dark:bg-white/5 dark:hover:bg-white/15"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Listen Now
                </Button>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-square lg:aspect-video xl:aspect-square">
              <img
                alt="Featured content cover"
                className="object-cover transition-transform duration-300 hover:scale-105"
                height={400}
                src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=400&fit=crop&q=80"
                width={400}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 dark:hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

