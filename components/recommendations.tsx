"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Utensils, Zap, ShoppingBag, ArrowRight } from "lucide-react"

interface CarbonFootprintRecommendationsProps {
  results: {
    total: number
    breakdown: {
      transportation: number
      diet: number
      energy: number
      shopping: number
    }
  }
}

export function CarbonFootprintRecommendations({ results }: CarbonFootprintRecommendationsProps) {
  // Find the category with the highest footprint
  const highestCategory = Object.entries(results.breakdown).reduce(
    (max, [category, value]) => (value > max.value ? { category, value } : max),
    { category: "", value: 0 },
  )

  // Get recommendations based on the category
  const getRecommendations = (category: string) => {
    switch (category) {
      case "transportation":
        return [
          {
            title: "Use public transportation",
            description: "Taking buses, trains, or carpooling can significantly reduce your carbon footprint.",
            impact: "High",
            icon: Car,
          },
          {
            title: "Consider an electric vehicle",
            description: "Electric vehicles produce fewer emissions than traditional gasoline-powered cars.",
            impact: "High",
            icon: Car,
          },
          {
            title: "Combine errands",
            description: "Plan your trips to reduce the total miles driven.",
            impact: "Medium",
            icon: Car,
          },
          {
            title: "Walk or bike for short trips",
            description: "For distances under 2 miles, consider walking or biking instead of driving.",
            impact: "Medium",
            icon: Car,
          },
        ]
      case "diet":
        return [
          {
            title: "Reduce meat consumption",
            description: "Try having one or more meatless days per week.",
            impact: "High",
            icon: Utensils,
          },
          {
            title: "Buy local and seasonal food",
            description: "Local food requires less transportation and seasonal food requires less energy to grow.",
            impact: "Medium",
            icon: Utensils,
          },
          {
            title: "Reduce food waste",
            description: "Plan meals, store food properly, and use leftovers to reduce waste.",
            impact: "Medium",
            icon: Utensils,
          },
          {
            title: "Grow your own food",
            description: "Even a small garden can provide fresh produce with zero transportation emissions.",
            impact: "Low",
            icon: Utensils,
          },
        ]
      case "energy":
        return [
          {
            title: "Switch to renewable energy",
            description: "Consider solar panels or choose a utility provider that offers renewable energy options.",
            impact: "High",
            icon: Zap,
          },
          {
            title: "Improve home insulation",
            description: "Better insulation reduces the energy needed for heating and cooling.",
            impact: "High",
            icon: Zap,
          },
          {
            title: "Use energy-efficient appliances",
            description: "Look for ENERGY STAR certified products when replacing appliances.",
            impact: "Medium",
            icon: Zap,
          },
          {
            title: "Unplug electronics when not in use",
            description:
              "Many devices consume power even when turned off but still plugged in, known as 'phantom' or 'vampire' energy use.",
            impact: "Low",
            icon: Zap,
          },
        ]
      case "shopping":
        return [
          {
            title: "Buy fewer, higher quality items",
            description: "Focus on durable products that last longer rather than disposable items.",
            impact: "High",
            icon: ShoppingBag,
          },
          {
            title: "Choose sustainable products",
            description: "Look for eco-friendly certifications and sustainable materials.",
            impact: "Medium",
            icon: ShoppingBag,
          },
          {
            title: "Reduce packaging waste",
            description: "Buy in bulk when possible and avoid products with excessive packaging.",
            impact: "Medium",
            icon: ShoppingBag,
          },
          {
            title: "Repair instead of replace",
            description: "Fix broken items when possible instead of buying new ones.",
            impact: "Medium",
            icon: ShoppingBag,
          },
        ]
      default:
        return []
    }
  }

  // Get general recommendations
  const generalRecommendations = [
    {
      title: "Track your progress",
      description: "Regularly calculate your carbon footprint to see improvements over time.",
      impact: "Medium",
      icon: Car,
    },
    {
      title: "Offset your carbon emissions",
      description: "Consider investing in carbon offset projects to neutralize your unavoidable emissions.",
      impact: "High",
      icon: Zap,
    },
    {
      title: "Educate others",
      description: "Share your knowledge and encourage friends and family to reduce their carbon footprint.",
      impact: "Medium",
      icon: ShoppingBag,
    },
  ]

  // Get recommendations for the highest category
  const categoryRecommendations = getRecommendations(highestCategory.category)

  // Impact color mapping
  const impactColors = {
    High: "text-red-500",
    Medium: "text-yellow-500",
    Low: "text-green-500",
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-800 text-white rounded-t-lg">
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription className="text-white/80">
            Based on your carbon footprint results, here are some recommendations to help you reduce your environmental
            impact
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {highestCategory.category === "transportation" && <Car className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
                {highestCategory.category === "diet" && <Utensils className="h-5 w-5 text-green-500 dark:text-green-400" />}
                {highestCategory.category === "energy" && <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />}
                {highestCategory.category === "shopping" && <ShoppingBag className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
                Focus Area: {highestCategory.category.charAt(0).toUpperCase() + highestCategory.category.slice(1)}
              </h3>
              <p className="text-muted-foreground mb-4">
                This area contributes the most to your carbon footprint. Here are some specific recommendations:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {categoryRecommendations.map((recommendation, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5 group"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                            <recommendation.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">{recommendation.title}</CardTitle>
                        </div>
                        <span
                          className={`text-xs font-medium ${impactColors[recommendation.impact as keyof typeof impactColors]} dark:opacity-90`}
                        >
                          {recommendation.impact} Impact
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                        {recommendation.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">General Recommendations</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {generalRecommendations.map((recommendation, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5 group"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                            <recommendation.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {recommendation.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                        {recommendation.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 
                dark:from-green-700 dark:to-emerald-800 dark:hover:from-green-800 dark:hover:to-emerald-900 
                transition-all shadow-lg hover:shadow-xl dark:shadow-none dark:hover:shadow-primary/10"
              >
                Learn More About Reducing Your Carbon Footprint
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

