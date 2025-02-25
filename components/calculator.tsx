"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Fix imports to use named exports
import { CarbonFootprintResults } from "@/components/results"
import { CarbonFootprintRecommendations } from "@/components/recommendations"

const formSchema = z.object({
  transportation: z.object({
    milesDriven: z.coerce.number().min(0, "Miles must be a positive number"),
    vehicleType: z.string(),
    publicTransportFrequency: z.coerce.number().min(0, "Frequency must be a positive number"),
  }),
  diet: z.object({
    vegetarianMeals: z.coerce.number().min(0, "Meals must be a positive number").max(21, "Maximum 21 meals per week"),
    localFoodConsumption: z.string(),
  }),
  energy: z.object({
    electricityUsage: z.coerce.number().min(0, "Usage must be a positive number"),
    renewablePercentage: z.array(z.number()),
  }),
  shopping: z.object({
    onlineShopping: z.string(),
    sustainableProducts: z.string(),
  }),
})

type FormValues = z.infer<typeof formSchema>

export function CarbonFootprintCalculator() {
  const [results, setResults] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("input")

  const defaultValues: FormValues = {
    transportation: {
      milesDriven: 0,
      vehicleType: "car",
      publicTransportFrequency: 0,
    },
    diet: {
      vegetarianMeals: 0,
      localFoodConsumption: "rarely",
    },
    energy: {
      electricityUsage: 0,
      renewablePercentage: [0],
    },
    shopping: {
      onlineShopping: "sometimes",
      sustainableProducts: "no",
    },
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(data: FormValues) {
    // Calculate carbon footprint based on form data
    const transportationFootprint = calculateTransportationFootprint(data.transportation)
    const dietFootprint = calculateDietFootprint(data.diet)
    const energyFootprint = calculateEnergyFootprint(data.energy)
    const shoppingFootprint = calculateShoppingFootprint(data.shopping)

    const totalFootprint = transportationFootprint + dietFootprint + energyFootprint + shoppingFootprint

    setResults({
      total: totalFootprint,
      breakdown: {
        transportation: transportationFootprint,
        diet: dietFootprint,
        energy: energyFootprint,
        shopping: shoppingFootprint,
      },
    })

    setActiveTab("results")
  }

  function calculateTransportationFootprint(transportation: FormValues["transportation"]) {
    // Simplified calculation for demonstration
    const vehicleEmissionFactors = {
      car: 0.42, // kg CO2 per mile
      motorcycle: 0.19, // kg CO2 per mile
      publicTransport: 0.14, // kg CO2 per mile
      electric: 0.1, // kg CO2 per mile
      hybrid: 0.2, // kg CO2 per mile
    }

    const vehicleFactor =
      vehicleEmissionFactors[transportation.vehicleType as keyof typeof vehicleEmissionFactors] || 0.42
    const milesDrivenEmission = transportation.milesDriven * vehicleFactor * 52 // Annual
    const publicTransportEmission = transportation.publicTransportFrequency * 0.14 * 52 // Annual

    return milesDrivenEmission + publicTransportEmission
  }

  function calculateDietFootprint(diet: FormValues["diet"]) {
    // Simplified calculation for demonstration
    const meatMeals = 21 - diet.vegetarianMeals // Assuming 3 meals a day, 7 days a week
    const meatEmission = meatMeals * 3.3 * 52 // kg CO2 per meal, annual
    const vegetarianEmission = diet.vegetarianMeals * 1.4 * 52 // kg CO2 per meal, annual

    const localFoodFactors = {
      never: 1.0,
      rarely: 0.9,
      often: 0.7,
      always: 0.5,
    }

    const localFoodFactor = localFoodFactors[diet.localFoodConsumption as keyof typeof localFoodFactors] || 1.0

    return (meatEmission + vegetarianEmission) * localFoodFactor
  }

  function calculateEnergyFootprint(energy: FormValues["energy"]) {
    // Simplified calculation for demonstration
    const electricityEmission = energy.electricityUsage * 0.92 * 12 // kg CO2 per kWh, annual
    const renewablePercentage = energy.renewablePercentage[0] / 100

    return electricityEmission * (1 - renewablePercentage)
  }

  function calculateShoppingFootprint(shopping: FormValues["shopping"]) {
    // Simplified calculation for demonstration
    const onlineShoppingFactors = {
      never: 0,
      rarely: 100,
      sometimes: 300,
      often: 600,
    }

    const sustainableProductFactors = {
      yes: 0.7,
      no: 1.0,
    }

    const onlineShoppingEmission =
      onlineShoppingFactors[shopping.onlineShopping as keyof typeof onlineShoppingFactors] || 300
    const sustainableFactor =
      sustainableProductFactors[shopping.sustainableProducts as keyof typeof sustainableProductFactors] || 1.0

    return onlineShoppingEmission * sustainableFactor
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>
            Results
          </TabsTrigger>
          <TabsTrigger value="recommendations" disabled={!results}>
            Recommendations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Carbon Footprint Calculator
              </CardTitle>
              <CardDescription className="text-white/80">
                Fill in the details below to calculate your carbon footprint
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    {/* Transportation Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Transportation</h3>
                      <FormField
                        control={form.control}
                        name="transportation.milesDriven"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Miles Driven Per Week</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="max-w-[180px] dark:shadow-none dark:hover:shadow-primary/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="transportation.vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px] dark:shadow-none dark:hover:shadow-primary/10">
                                  <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="car">Car</SelectItem>
                                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                <SelectItem value="electric">Electric Vehicle</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="publicTransport">Public Transport</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="transportation.publicTransportFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Public Transport Trips Per Week</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="max-w-[180px] dark:shadow-none dark:hover:shadow-primary/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Diet Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Diet</h3>
                      <FormField
                        control={form.control}
                        name="diet.vegetarianMeals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vegetarian Meals Per Week</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="max-w-[180px] dark:shadow-none dark:hover:shadow-primary/10" />
                            </FormControl>
                            <FormDescription>Out of 21 meals per week</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="diet.localFoodConsumption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local Food Consumption</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px] dark:shadow-none dark:hover:shadow-primary/10">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="rarely">Rarely</SelectItem>
                                <SelectItem value="often">Often</SelectItem>
                                <SelectItem value="always">Always</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Energy Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Energy Usage</h3>
                      <FormField
                        control={form.control}
                        name="energy.electricityUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Electricity Usage (kWh)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="max-w-[180px] dark:shadow-none dark:hover:shadow-primary/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="energy.renewablePercentage"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Renewable Energy Percentage</FormLabel>
                            <FormControl>
                              <div className="w-full max-w-[180px] pt-2">
                                <Slider
                                  value={value}
                                  onValueChange={onChange}
                                  max={100}
                                  step={1}
                                  className="dark:[&_[role=slider]]:border-primary dark:[&_[role=slider]]:shadow-md"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>{value}% from renewable sources</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Shopping Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Shopping Habits</h3>
                      <FormField
                        control={form.control}
                        name="shopping.onlineShopping"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Online Shopping Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px] dark:shadow-none dark:hover:shadow-primary/10">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="rarely">Rarely</SelectItem>
                                <SelectItem value="sometimes">Sometimes</SelectItem>
                                <SelectItem value="often">Often</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shopping.sustainableProducts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do you prefer sustainable products?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-[180px] dark:shadow-none dark:hover:shadow-primary/10">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-700 dark:to-emerald-800 dark:hover:from-green-800 dark:hover:to-emerald-900 transition-all"
                  >
                    Calculate Carbon Footprint
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="results">{results && <CarbonFootprintResults results={results} />}</TabsContent>
        <TabsContent value="recommendations">
          {results && <CarbonFootprintRecommendations results={results} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

