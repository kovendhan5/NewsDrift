import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Clock } from "lucide-react"

const podcasts = [
  {
    id: 1,
    title: "Tech Today",
    episode: "The Rise of AI",
    duration: "45 min",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    title: "Global News Hour",
    episode: "World Headlines",
    duration: "30 min",
    image: "/placeholder.svg?height=150&width=150",
  },
  // Add more podcasts as needed
]

export function PodcastSection() {
  return (
    <section aria-label="Featured Podcasts">
      <h2 className="text-2xl font-bold mb-6">Featured Podcasts</h2>
      <div className="space-y-4">
        {podcasts.map((podcast) => (
          <Card key={podcast.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  alt={podcast.title}
                  className="h-20 w-20 rounded-lg object-cover"
                  src={podcast.image || "/placeholder.svg"}
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground">{podcast.episode}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {podcast.duration}
                    </div>
                    <Button size="sm" variant="secondary">
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

