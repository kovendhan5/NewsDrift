import { Header } from "@/components/header"
import { CarbonFootprintCalculator } from "@/components/calculator"
import { CarbonContentRecommendations } from "@/components/carbon-content-recommendations"
import { CommunityChallenges } from "@/components/community-challenges"
import { AudioPlayer } from "@/components/audio-player"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Users, BookOpen } from "lucide-react"

export default function CarbonFootprintPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Carbon Footprint</h1>
          <p className="text-muted-foreground mb-8">
            Calculate your carbon footprint, join community challenges, and discover content to help you live more
            sustainably.
          </p>

          <Tabs defaultValue="calculator" className="mb-10">
            <TabsList className="mb-6">
              <TabsTrigger value="calculator" className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Community Challenges
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Sustainability Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <CarbonFootprintCalculator />
            </TabsContent>

            <TabsContent value="challenges">
              <CommunityChallenges />
            </TabsContent>

            <TabsContent value="content">
              <CarbonContentRecommendations />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <AudioPlayer />
    </div>
  )
}

