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
import { Heart, Calculator, RotateCcw } from "lucide-react"

export default function HealthInsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [familyMembers, setFamilyMembers] = useState("")
  const [city, setCity] = useState("")
  const [sumInsured, setSumInsured] = useState("")
  const [preExistingConditions, setPreExistingConditions] = useState(false)
  const [smoker, setSmoker] = useState(false)
  const [occupation, setOccupation] = useState("")
  const [result, setResult] = useState<{
    annualPremium: number
    monthlyPremium: number
    recommendedCoverage: number
    cityMultiplier: number
  } | null>(null)

  const calculateHealthInsurance = () => {
    const userAge = Number.parseInt(age) || 0
    const members = Number.parseInt(familyMembers) || 1
    const coverage = Number.parseFloat(sumInsured) || 500000

    // Base premium calculation
    let basePremium = 5000 // Base premium for individual

    // Age-based premium
    if (userAge > 60) basePremium *= 3.5
    else if (userAge > 45) basePremium *= 2.5
    else if (userAge > 35) basePremium *= 1.8
    else if (userAge > 25) basePremium *= 1.3

    // Family size multiplier
    if (members > 4) basePremium *= 2.2
    else if (members > 2) basePremium *= 1.8
    else if (members > 1) basePremium *= 1.4

    // Coverage amount multiplier
    const coverageMultiplier = coverage / 500000
    basePremium *= coverageMultiplier

    // City-based multiplier
    let cityMultiplier = 1
    if (city === "metro") cityMultiplier = 1.3
    else if (city === "tier1") cityMultiplier = 1.1
    else if (city === "tier2") cityMultiplier = 1.0
    else if (city === "tier3") cityMultiplier = 0.9

    basePremium *= cityMultiplier

    // Risk factors
    if (preExistingConditions) basePremium *= 1.5
    if (smoker) basePremium *= 1.3

    // Occupation risk
    if (occupation === "high") basePremium *= 1.2
    else if (occupation === "medium") basePremium *= 1.1

    // Recommended coverage based on age and family
    let recommendedCoverage = 500000
    if (userAge > 45) recommendedCoverage = 1000000
    if (members > 2) recommendedCoverage *= 1.5

    const annualPremium = Math.round(basePremium)
    const monthlyPremium = Math.round(annualPremium / 12)

    setResult({
      annualPremium,
      monthlyPremium,
      recommendedCoverage: Math.round(recommendedCoverage),
      cityMultiplier,
    })
  }

  const resetCalculator = () => {
    setAge("")
    setFamilyMembers("")
    setCity("")
    setSumInsured("")
    setPreExistingConditions(false)
    setSmoker(false)
    setOccupation("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Health Insurance Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate your health insurance premium based on your age, family size, location, and health conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-red-600" />
                Health Insurance Details
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
                  <Label htmlFor="familyMembers">Family Members</Label>
                  <Input
                    id="familyMembers"
                    type="number"
                    placeholder="Number of family members"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City Type</Label>
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
                <div>
                  <Label htmlFor="sumInsured">Sum Insured (₹)</Label>
                  <Select value={sumInsured} onValueChange={setSumInsured}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300000">₹3 Lakh</SelectItem>
                      <SelectItem value="500000">₹5 Lakh</SelectItem>
                      <SelectItem value="1000000">₹10 Lakh</SelectItem>
                      <SelectItem value="1500000">₹15 Lakh</SelectItem>
                      <SelectItem value="2000000">₹20 Lakh</SelectItem>
                      <SelectItem value="2500000">₹25 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="occupation">Occupation Risk</Label>
                <Select value={occupation} onValueChange={setOccupation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupation risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk (Office Job)</SelectItem>
                    <SelectItem value="medium">Medium Risk (Field Work)</SelectItem>
                    <SelectItem value="high">High Risk (Hazardous Work)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preExisting"
                    checked={preExistingConditions}
                    onCheckedChange={setPreExistingConditions}
                  />
                  <Label htmlFor="preExisting">Pre-existing medical conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="smoker" checked={smoker} onCheckedChange={setSmoker} />
                  <Label htmlFor="smoker">Smoker/Tobacco user</Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateHealthInsurance} className="flex-1">
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
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Annual Premium</h3>
                    <p className="text-3xl font-bold text-red-600">₹{result.annualPremium.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Monthly Premium</h4>
                      <p className="text-xl font-bold text-blue-600">₹{result.monthlyPremium.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Recommended Coverage</h4>
                      <p className="text-xl font-bold text-green-600">₹{result.recommendedCoverage.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Premium Factors:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Age and family size significantly impact premium</li>
                      <li>• Metro cities have higher premium rates</li>
                      <li>• Pre-existing conditions increase premium by 50%</li>
                      <li>• Smoking/tobacco use adds 30% to premium</li>
                      <li>• Higher coverage amounts provide better protection</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• This is an estimated premium calculation</li>
                      <li>• Actual premium may vary based on insurer and medical tests</li>
                      <li>• Consider waiting period for pre-existing conditions</li>
                      <li>• Compare plans from multiple insurers</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your details to calculate health insurance premium</p>
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
