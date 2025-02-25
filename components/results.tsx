"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Utensils, Zap, ShoppingBag } from "lucide-react"

interface CarbonFootprintResultsProps {
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

export function CarbonFootprintResults({ results }: CarbonFootprintResultsProps) {
  // Format numbers to 2 decimal places and add commas
  const formatNumber = (num: number) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Calculate percentages for each category
  const transportationPercent = (results.breakdown.transportation / results.total) * 100
  const dietPercent = (results.breakdown.diet / results.total) * 100
  const energyPercent = (results.breakdown.energy / results.total) * 100
  const shoppingPercent = (results.breakdown.shopping / results.total) * 100

  // Determine carbon footprint level
  const getCarbonLevel = (total: number) => {
    if (total < 6000) return { level: "Low", color: "text-green-500" }
    if (total < 16000) return { level: "Moderate", color: "text-yellow-500" }
    return { level: "High", color: "text-red-500" }
  }

  const carbonLevel = getCarbonLevel(results.total)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-800 text-white rounded-t-lg">
          <CardTitle>Your Carbon Footprint Results</CardTitle>
          <CardDescription className="text-white/80">Based on the information you provided</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Annual Carbon Footprint: <span className={carbonLevel.color}>{formatNumber(results.total)} kg CO₂e</span>
            </h3>
            <p className="text-muted-foreground">
              Your carbon footprint is <span className={`font-medium ${carbonLevel.color}`}>{carbonLevel.level}</span>{" "}
              compared to the average person
            </p>
          </div>

          <Tabs defaultValue="chart">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <div className="h-80 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                          <span>Transportation</span>
                        </div>
                        <span>{formatNumber(results.breakdown.transportation)} kg CO₂e</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                          style={{ width: `${transportationPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-500 dark:text-green-400" />
                          <span>Diet</span>
                        </div>
                        <span>{formatNumber(results.breakdown.diet)} kg CO₂e</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: `${dietPercent}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                          <span>Energy</span>
                        </div>
                        <span>{formatNumber(results.breakdown.energy)} kg CO₂e</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-yellow-500 dark:bg-yellow-400 rounded-full" style={{ width: `${energyPercent}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                          <span>Shopping</span>
                        </div>
                        <span>{formatNumber(results.breakdown.shopping)} kg CO₂e</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                          style={{ width: `${shoppingPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-950/50 p-2">
                        <Car className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Transportation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(results.breakdown.transportation)} kg CO₂e</p>
                    <p className="text-sm text-muted-foreground">
                      {transportationPercent.toFixed(1)}% of your total footprint
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 dark:bg-green-950/50 p-2">
                        <Utensils className="h-4 w-4 text-green-500 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">Diet</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(results.breakdown.diet)} kg CO₂e</p>
                    <p className="text-sm text-muted-foreground">{dietPercent.toFixed(1)}% of your total footprint</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-yellow-100 dark:bg-yellow-950/50 p-2">
                        <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <CardTitle className="text-lg">Energy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(results.breakdown.energy)} kg CO₂e</p>
                    <p className="text-sm text-muted-foreground">{energyPercent.toFixed(1)}% of your total footprint</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-purple-100 dark:bg-purple-950/50 p-2">
                        <ShoppingBag className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-lg">Shopping</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(results.breakdown.shopping)} kg CO₂e</p>
                    <p className="text-sm text-muted-foreground">
                      {shoppingPercent.toFixed(1)}% of your total footprint
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

