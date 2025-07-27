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
import { Car, Calculator, RotateCcw } from "lucide-react"

export default function CarInsuranceCalculatorPage() {
  const [carValue, setCarValue] = useState("")
  const [carAge, setCarAge] = useState("")
  const [fuelType, setFuelType] = useState("")
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

  const calculateCarInsurance = () => {
    const value = Number.parseFloat(carValue) || 0
    const age = Number.parseInt(carAge) || 0
    const claims = Number.parseInt(previousClaims) || 0
    const ncbDiscount = Number.parseFloat(ncb) || 0

    // Own Damage Premium calculation
    let odRate = 0.03 // 3% of car value as base rate

    // Age-based depreciation
    if (age > 5) odRate *= 0.7
    else if (age > 3) odRate *= 0.8
    else if (age > 1) odRate *= 0.9

    // Fuel type adjustment
    if (fuelType === "diesel") odRate *= 1.1
    else if (fuelType === "cng") odRate *= 0.95

    // City-based adjustment
    if (city === "metro") odRate *= 1.2
    else if (city === "tier1") odRate *= 1.1

    // Claims history adjustment
    if (claims > 2) odRate *= 1.5
    else if (claims > 0) odRate *= 1.2

    let ownDamagePremium = value * odRate

    // Apply NCB discount
    ownDamagePremium *= 1 - ncbDiscount / 100

    // Third Party Premium (fixed based on engine capacity)
    let thirdPartyPremium = 2000 // Base TP premium
    if (fuelType === "diesel") thirdPartyPremium = 7890
    else if (value > 1500000) thirdPartyPremium = 4500
    else if (value > 1000000) thirdPartyPremium = 3500

    // Add-on premiums
    let addOnPremium = 0
    addOns.forEach((addOn) => {
      switch (addOn) {
        case "zero-dep":
          addOnPremium += ownDamagePremium * 0.2
          break
        case "engine-protect":
          addOnPremium += 2500
          break
        case "rsa":
          addOnPremium += 500
          break
        case "consumables":
          addOnPremium += 1500
          break
        case "key-replace":
          addOnPremium += 800
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
    setCarValue("")
    setCarAge("")
    setFuelType("")
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
            <Car className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Car Insurance Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate your car insurance premium based on your vehicle details, location, and coverage preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carValue">Car Value (₹)</Label>
                  <Input
                    id="carValue"
                    type="number"
                    placeholder="Enter car's current value"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="carAge">Car Age (Years)</Label>
                  <Input
                    id="carAge"
                    type="number"
                    placeholder="Enter car age"
                    value={carAge}
                    onChange={(e) => setCarAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={fuelType} onValueChange={setFuelType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
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
                      id="consumables"
                      checked={addOns.includes("consumables")}
                      onCheckedChange={(checked) => handleAddOnChange("consumables", checked as boolean)}
                    />
                    <Label htmlFor="consumables">Consumables Cover</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="key-replace"
                      checked={addOns.includes("key-replace")}
                      onCheckedChange={(checked) => handleAddOnChange("key-replace", checked as boolean)}
                    />
                    <Label htmlFor="key-replace">Key Replacement</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateCarInsurance} className="flex-1">
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
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Premium</h3>
                    <p className="text-3xl font-bold text-blue-600">₹{result.totalPremium.toLocaleString()}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Own Damage Premium</h4>
                      <p className="text-xl font-bold text-green-600">₹{result.ownDamagePremium.toLocaleString()}</p>
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
                      <li>• Car value and age significantly impact premium</li>
                      <li>• NCB discount can save up to 50% on own damage premium</li>
                      <li>• Metro cities have higher premium rates</li>
                      <li>• Previous claims increase premium significantly</li>
                      <li>• Add-ons provide comprehensive coverage</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your vehicle details to calculate car insurance premium</p>
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
