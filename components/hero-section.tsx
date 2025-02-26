"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, Headphones, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Your One-Stop News & Podcast Hub
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Stay informed and entertained with curated news and podcasts from trusted sources worldwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/categories">
                Browse Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/podcasts">
                Explore Podcasts <Headphones className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-full">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Global Coverage</h2>
            <p className="text-muted-foreground text-center">
              Access news and podcasts from trusted sources around the world
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-full">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Audio Experience</h2>
            <p className="text-muted-foreground text-center">
              Listen to your favorite podcasts and audio content on any device
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Real-time Updates</h2>
            <p className="text-muted-foreground text-center">
              Stay up-to-date with breaking news and latest podcast episodes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

