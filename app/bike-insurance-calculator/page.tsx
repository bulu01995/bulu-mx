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
import { Bike, Calculator, RotateCcw } from "lucide-react"

export default function BikeInsuranceCalculatorPage() {
  const [bikeValue, setBikeValue] = useState("")
  const [bikeAge, setBikeAge] = useState("")
  const [engineCapacity, setEngineCapacity] = useState("")
  const [city, setCity] = useState("")
  const [previousClaims, setPreviousClaims] = useState("")
  const [ncb, setNcb] = useState("")
  const [addOns, setAddOns] = useState<string[]>([])
  const [result, setResult] = useState<{
    ownDamagePremium: number
    thirdPartyPremium: number
    totalPremium: number
    addOnPremium: number
  } | null>(null)

  const handleAddOnChange = (addOn: string, checked: boolean) => {
    if (checked) {
      setAddOns([...addOns, addOn])
    } else {
      setAddOns(addOns.filter((item) => item !== addOn))
    }
  }

  const calculateBikeInsurance = () => {
    const value = Number.parseFloat(bikeValue) || 0
    const age = Number.parseInt(bikeAge) || 0
    const claims = Number.parseInt(previousClaims) || 0
    const ncbDiscount = Number.parseFloat(ncb) || 0
    const engine = Number.parseInt(engineCapacity) || 150

    // Own Damage Premium calculation
    let odRate = 0.025 // 2.5% of bike value as base rate

    // Age-based depreciation
    if (age > 5) odRate *= 0.6
    else if (age > 3) odRate *= 0.75
    else if (age > 1) odRate *= 0.85

    // Engine capacity adjustment
    if (engine > 350) odRate *= 1.3
    else if (engine > 200) odRate *= 1.15
    else if (engine < 100) odRate *= 0.9

    // City-based adjustment
    if (city === "metro") odRate *= 1.25
    else if (city === "tier1") odRate *= 1.1

    // Claims history adjustment
    if (claims > 1) odRate *= 1.4
    else if (claims > 0) odRate *= 1.15

    let ownDamagePremium = value * odRate

    // Apply NCB discount
    ownDamagePremium *= 1 - ncbDiscount / 100

    // Third Party Premium (fixed based on engine capacity)
    let thirdPartyPremium = 538 // Base TP premium for bikes up to 75cc
    if (engine > 350) thirdPartyPremium = 2323
    else if (engine > 150) thirdPartyPremium = 1360

    // Add-on premiums
    let addOnPremium = 0
    addOns.forEach((addOn) => {
      switch (addOn) {
        case "zero-dep":
          addOnPremium += ownDamagePremium * 0.15
          break
        case "engine-protect":
          addOnPremium += 1500
          break
        case "rsa":
          addOnPremium += 400
          break
        case "accessories":
          addOnPremium += 800
          break
        case "pillion":
          addOnPremium += 300
          break
      }
    })

    const totalPremium = ownDamagePremium + thirdPartyPremium + addOnPremium

    setResult({
      ownDamagePremium: Math.round(ownDamagePremium),
      thirdPartyPremium: Math.round(thirdPartyPremium),
      totalPremium: Math.round(totalPremium),
      addOnPremium: Math.round(addOnPremium),
    })
  }

  const resetCalculator = () => {
    setBikeValue("")
    setBikeAge("")
    setEngineCapacity("")
    setCity("")
    setPreviousClaims("")
    setNcb("")
    setAddOns([])
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bike className="h-12 w-12 text-green-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Bike Insurance Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate your bike insurance premium based on your vehicle details, engine capacity, and coverage
            preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-green-600" />
                Bike Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bikeValue">Bike Value (₹)</Label>
                  <Input
                    id="bikeValue"
                    type="number"
                    placeholder="Enter bike's current value"
                    value={bikeValue}
                    onChange={(e) => setBikeValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bikeAge">Bike Age (Years)</Label>
                  <Input
                    id="bikeAge"
                    type="number"
                    placeholder="Enter bike age"
                    value={bikeAge}
                    onChange={(e) => setBikeAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="engineCapacity">Engine Capacity (CC)</Label>
                  <Input
                    id="engineCapacity"
                    type="number"
                    placeholder="Enter engine capacity"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">Registration City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City</SelectItem>
                      <SelectItem value="tier1">Tier 1 City</SelectItem>
                      <SelectItem value="tier2">Tier 2 City</SelectItem>
                      <SelectItem value="tier3">Tier 3 City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="previousClaims">Previous Claims</Label>
                  <Input
                    id="previousClaims"
                    type="number"
                    placeholder="Number of claims in last 3 years"
                    value={previousClaims}
                    onChange={(e) => setPreviousClaims(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ncb">NCB Discount (%)</Label>
                  <Select value={ncb} onValueChange={setNcb}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select NCB discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% (New Policy)</SelectItem>
                      <SelectItem value="20">20% (1 Year)</SelectItem>
                      <SelectItem value="25">25% (2 Years)</SelectItem>
                      <SelectItem value="35">35% (3 Years)</SelectItem>
                      <SelectItem value="45">45% (4 Years)</SelectItem>
                      <SelectItem value="50">50% (5+ Years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Add-on Covers</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="zero-dep"
                      checked={addOns.includes("zero-dep")}
                      onCheckedChange={(checked) => handleAddOnChange("zero-dep", checked as boolean)}
                    />
                    <Label htmlFor="zero-dep">Zero Depreciation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="engine-protect"
                      checked={addOns.includes("engine-protect")}
                      onCheckedChange={(checked) => handleAddOnChange("engine-protect", checked as boolean)}
                    />
                    <Label htmlFor="engine-protect">Engine Protection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rsa"
                      checked={addOns.includes("rsa")}
                      onCheckedChange={(checked) => handleAddOnChange("rsa", checked as boolean)}
                    />
                    <Label htmlFor="rsa">Roadside Assistance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accessories"
                      checked={addOns.includes("accessories")}
                      onCheckedChange={(checked) => handleAddOnChange("accessories", checked as boolean)}
                    />
                    <Label htmlFor="accessories">Accessories Cover</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pillion"
                      checked={addOns.includes("pillion")}
                      onCheckedChange={(checked) => handleAddOnChange("pillion", checked as boolean)}
                    />
                    <Label htmlFor="pillion">Pillion Rider Cover</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateBikeInsurance} className="flex-1">
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
              <CardTitle>Premium Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Total Premium</h3>
                    <p className="text-3xl font-bold text-green-600">₹{result.totalPremium.toLocaleString()}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Own Damage Premium</h4>
                      <p className="text-xl font-bold text-blue-600">₹{result.ownDamagePremium.toLocaleString()}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Third Party Premium</h4>
                      <p className="text-xl font-bold text-orange-600">₹{result.thirdPartyPremium.toLocaleString()}</p>
                    </div>
                    {result.addOnPremium > 0 && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900">Add-on Premium</h4>
                        <p className="text-xl font-bold text-purple-600">₹{result.addOnPremium.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Premium Factors:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Engine capacity significantly impacts premium</li>
                      <li>• NCB discount can save up to 50% on own damage premium</li>
                      <li>• Metro cities have higher premium rates</li>
                      <li>• Bike age affects depreciation and premium</li>
                      <li>• Add-ons provide comprehensive coverage</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bike className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your bike details to calculate insurance premium</p>
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
