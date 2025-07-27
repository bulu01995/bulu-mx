"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Calculator, RotateCcw } from "lucide-react"

export default function TravelInsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [travelers, setTravelers] = useState("")
  const [destination, setDestination] = useState("")
  const [tripDuration, setTripDuration] = useState("")
  const [tripCost, setTripCost] = useState("")
  const [coverageAmount, setCoverageAmount] = useState("")
  const [preExisting, setPreExisting] = useState(false)
  const [adventureSports, setAdventureSports] = useState(false)
  const [result, setResult] = useState<{
    basePremium: number
    totalPremium: number
    perPersonPremium: number
    coverageDetails: string[]
  } | null>(null)

  const calculateTravelInsurance = () => {
    const userAge = Number.parseInt(age) || 0
    const numTravelers = Number.parseInt(travelers) || 1
    const duration = Number.parseInt(tripDuration) || 1
    const cost = Number.parseFloat(tripCost) || 0
    const coverage = Number.parseFloat(coverageAmount) || 100000

    // Base premium calculation
    let basePremium = 500 // Base premium per person per day

    // Age-based premium
    if (userAge > 70) basePremium *= 3
    else if (userAge > 60) basePremium *= 2.5
    else if (userAge > 45) basePremium *= 1.8
    else if (userAge > 35) basePremium *= 1.3

    // Destination-based multiplier
    let destinationMultiplier = 1
    switch (destination) {
      case "usa-canada":
        destinationMultiplier = 3
        break
      case "europe":
        destinationMultiplier = 2.5
        break
      case "asia":
        destinationMultiplier = 1.5
        break
      case "domestic":
        destinationMultiplier = 0.5
        break
      default:
        destinationMultiplier = 2
    }

    basePremium *= destinationMultiplier

    // Coverage amount multiplier
    const coverageMultiplier = coverage / 100000
    basePremium *= coverageMultiplier

    // Duration-based calculation
    let totalPremium = basePremium * duration * numTravelers

    // Trip cost consideration (if trip is expensive, higher premium)
    if (cost > 500000) totalPremium *= 1.3
    else if (cost > 200000) totalPremium *= 1.15

    // Risk factors
    if (preExisting) totalPremium *= 1.4
    if (adventureSports) totalPremium *= 1.6

    const perPersonPremium = totalPremium / numTravelers

    const coverageDetails = [
      `Medical expenses up to ₹${coverage.toLocaleString()}`,
      "Emergency medical evacuation",
      "Trip cancellation/interruption",
      "Baggage loss/delay coverage",
      "Personal accident coverage",
      "24/7 emergency assistance",
    ]

    if (adventureSports) {
      coverageDetails.push("Adventure sports coverage")
    }

    setResult({
      basePremium: Math.round(basePremium),
      totalPremium: Math.round(totalPremium),
      perPersonPremium: Math.round(perPersonPremium),
      coverageDetails,
    })
  }

  const resetCalculator = () => {
    setAge("")
    setTravelers("")
    setDestination("")
    setTripDuration("")
    setTripCost("")
    setCoverageAmount("")
    setPreExisting(false)
    setAdventureSports(false)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Travel Insurance Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate your travel insurance premium based on destination, duration, age, and coverage requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-purple-600" />
                Travel Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Your Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    placeholder="Number of travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic (India)</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="usa-canada">USA/Canada</SelectItem>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tripDuration">Trip Duration (Days)</Label>
                  <Input
                    id="tripDuration"
                    type="number"
                    placeholder="Enter trip duration"
                    value={tripDuration}
                    onChange={(e) => setTripDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tripCost">Trip Cost (₹)</Label>
                  <Input
                    id="tripCost"
                    type="number"
                    placeholder="Enter total trip cost"
                    value={tripCost}
                    onChange={(e) => setTripCost(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coverageAmount">Medical Coverage (₹)</Label>
                  <Select value={coverageAmount} onValueChange={setCoverageAmount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100000">₹1 Lakh</SelectItem>
                      <SelectItem value="200000">₹2 Lakh</SelectItem>
                      <SelectItem value="500000">₹5 Lakh</SelectItem>
                      <SelectItem value="1000000">₹10 Lakh</SelectItem>
                      <SelectItem value="2000000">₹20 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="preExisting" checked={preExisting} onCheckedChange={setPreExisting} />
                  <Label htmlFor="preExisting">Pre-existing medical conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="adventureSports" checked={adventureSports} onCheckedChange={setAdventureSports} />
                  <Label htmlFor="adventureSports">Adventure sports coverage</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateTravelInsurance} className="flex-1">
                  Calculate Premium
                </Button>
                <Button onClick={resetCalculator} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Premium</h3>
                    <p className="text-3xl font-bold text-purple-600">₹{result.totalPremium.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Per Person Premium</h4>
                      <p className="text-xl font-bold text-blue-600">₹{result.perPersonPremium.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Base Premium/Day</h4>
                      <p className="text-xl font-bold text-green-600">₹{result.basePremium.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Coverage Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {result.coverageDetails.map((detail, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Premium varies based on destination risk level</li>
                      <li>• Age significantly impacts premium rates</li>
                      <li>• Pre-existing conditions require medical screening</li>
                      <li>• Adventure sports coverage has additional terms</li>
                      <li>• Read policy terms carefully before purchase</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your travel details to calculate insurance premium</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
