"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export function HomeCarbonSection() {
  const [loading, setLoading] = useState(true)
  const [userFootprint, setUserFootprint] = useState<any>(null)

  useEffect(() => {
    // Simulate API call to get user's carbon footprint data
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from the user's profile
      setUserFootprint({
        total: 8500,
        average: 12000,
        reduction: 15,
        lastCalculated: "2024-02-20",
        activeChallenges: 2,
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse bg-muted h-6 w-3/4 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-muted h-4 w-1/2 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse bg-muted h-32 w-full rounded"></div>
        </CardContent>
      </Card>
    )
  }

  // If user hasn't calculated their footprint yet
  if (!userFootprint) {
    return (
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            <h3 className="font-semibold">Carbon Footprint</h3>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="mb-4">Calculate your carbon footprint to see how your lifestyle impacts the environment.</p>
          <Button asChild>
            <Link href="/carbon-footprint" className="flex items-center gap-1">
              Get Started
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          <h3 className="font-semibold">Your Carbon Footprint</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Your Footprint</span>
              <span className="font-medium">{userFootprint.total.toLocaleString()} kg CO₂e/year</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Person</span>
              <span className="font-medium">{userFootprint.average.toLocaleString()} kg CO₂e/year</span>
            </div>
            <Progress value={(userFootprint.total / userFootprint.average) * 100} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Your carbon footprint is {userFootprint.reduction}% lower than the average person.
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-sm">
                <span className="font-medium">{userFootprint.activeChallenges}</span> active challenges
              </p>
              <p className="text-xs text-muted-foreground">
                Last calculated {new Date(userFootprint.lastCalculated).toLocaleDateString()}
              </p>
            </div>
            <Button asChild size="sm">
              <Link href="/carbon-footprint">View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

