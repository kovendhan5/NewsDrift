import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Clock } from "lucide-react"

const mockTrendingPodcasts = [
  {
    id: "tech-talks-daily",
    title: "Tech Talks Daily",
    author: "Tech Network",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop&q=80",
    episode: "Future of AI",
    duration: "45 min",
  },
  {
    id: "eco-talks",
    title: "Eco Talks",
    author: "Environmental Network",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop&q=80",
    episode: "Sustainable Living",
    duration: "35 min",
  },
];

export function PodcastSection() {
  return (
    <section aria-label="Featured Podcasts">
      <h2 className="text-2xl font-bold mb-6">Featured Podcasts</h2>
      <div className="space-y-4">
        {mockTrendingPodcasts.map((podcast) => (
          <Card 
            key={podcast.id} 
            className="group hover:shadow-md dark:hover:shadow-primary/5 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    alt={podcast.title}
                    className="h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105"
                    src={podcast.image}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground">{podcast.episode}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {podcast.duration}
                    </div>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-primary/10 transition-all hover:scale-105"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

