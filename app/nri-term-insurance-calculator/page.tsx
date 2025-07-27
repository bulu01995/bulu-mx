"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RotateCcw, Globe } from "lucide-react"

export default function NRITermInsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [residenceCountry, setResidenceCountry] = useState("")
  const [dependentsInIndia, setDependentsInIndia] = useState("")
  const [propertyInIndia, setPropertyInIndia] = useState("")
  const [liabilities, setLiabilities] = useState("")
  const [result, setResult] = useState<{
    recommendedCoverage: number
    annualPremiumINR: number
    annualPremiumForeign: number
    exchangeRate: number
  } | null>(null)

  const exchangeRates: { [key: string]: number } = {
    USD: 83,
    EUR: 90,
    GBP: 105,
    AUD: 55,
    CAD: 62,
    SGD: 62,
  }

  const calculateNRITermInsurance = () => {
    const income = Number.parseFloat(annualIncome) || 0
    const deps = Number.parseInt(dependentsInIndia) || 0
    const property = Number.parseFloat(propertyInIndia) || 0
    const debt = Number.parseFloat(liabilities) || 0
    const userAge = Number.parseInt(age) || 0
    const rate = exchangeRates[currency] || 83

    // Convert foreign income to INR
    const incomeINR = income * rate

    // NRI-specific calculation
    let multiplier = 8 // Base multiplier for NRIs (slightly lower than residents)

    // Adjust for dependents in India
    if (deps > 2) multiplier += 3
    else if (deps > 0) multiplier += 1.5

    // Add property value consideration
    const baseCoverage = incomeINR * multiplier
    const totalNeeded = baseCoverage + property + debt

    // NRI premium calculation (higher due to currency risk)
    let premiumRate = 0.003 // Higher base rate for NRIs

    // Age-based premium adjustment
    if (userAge > 45) premiumRate *= 3
    else if (userAge > 35) premiumRate *= 2
    else if (userAge > 25) premiumRate *= 1.5

    const annualPremiumINR = (totalNeeded / 100000) * premiumRate * 1000
    const annualPremiumForeign = annualPremiumINR / rate

    setResult({
      recommendedCoverage: Math.round(totalNeeded),
      annualPremiumINR: Math.round(annualPremiumINR),
      annualPremiumForeign: Math.round(annualPremiumForeign),
      exchangeRate: rate,
    })
  }

  const resetCalculator = () => {
    setAge("")
    setAnnualIncome("")
    setCurrency("USD")
    setResidenceCountry("")
    setDependentsInIndia("")
    setPropertyInIndia("")
    setLiabilities("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">NRI Term Insurance Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate term insurance coverage specifically designed for Non-Resident Indians with dependents in India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                NRI Insurance Details
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
                  <Label htmlFor="dependentsInIndia">Dependents in India</Label>
                  <Input
                    id="dependentsInIndia"
                    type="number"
                    placeholder="Number of dependents in India"
                    value={dependentsInIndia}
                    onChange={(e) => setDependentsInIndia(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="Enter your annual income"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="residenceCountry">Country of Residence</Label>
                <Input
                  id="residenceCountry"
                  type="text"
                  placeholder="Enter your country of residence"
                  value={residenceCountry}
                  onChange={(e) => setResidenceCountry(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="propertyInIndia">Property Value in India (₹)</Label>
                <Input
                  id="propertyInIndia"
                  type="number"
                  placeholder="Enter property value in India"
                  value={propertyInIndia}
                  onChange={(e) => setPropertyInIndia(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="liabilities">Total Liabilities (₹)</Label>
                <Input
                  id="liabilities"
                  type="number"
                  placeholder="Enter total liabilities in INR"
                  value={liabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateNRITermInsurance} className="flex-1">
                  Calculate Coverage
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
              <CardTitle>NRI Insurance Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Recommended Coverage</h3>
                    <p className="text-3xl font-bold text-blue-600">₹{result.recommendedCoverage.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Annual Premium (INR)</h4>
                      <p className="text-xl font-bold text-green-600">₹{result.annualPremiumINR.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Annual Premium ({currency})</h4>
                      <p className="text-xl font-bold text-purple-600">
                        {currency} {result.annualPremiumForeign.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900">Exchange Rate Used</h4>
                    <p className="text-lg font-bold text-yellow-600">
                      1 {currency} = ₹{result.exchangeRate}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">NRI-Specific Considerations:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Coverage calculated considering dependents in India</li>
                      <li>• Premium rates adjusted for currency exchange risk</li>
                      <li>• Property value in India included in coverage</li>
                      <li>• Consult for tax implications in both countries</li>
                      <li>• Consider nomination and beneficiary details carefully</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Enter your NRI details to calculate recommended term insurance coverage
                  </p>
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
