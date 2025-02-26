import { Header } from "@/components/header"
import { PodcastDetails } from "@/components/podcast-details"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PodcastPageProps {
  params: {
    id: string;
  };
}

export default function PodcastPage({ params }: PodcastPageProps) {
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
        <PodcastDetails id={params.id} />
      </main>
      <AudioPlayer />
    </div>
  )
}

