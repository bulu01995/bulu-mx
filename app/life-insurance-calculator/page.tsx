"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LifeInsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [existingCoverage, setExistingCoverage] = useState("")
  const [dependents, setDependents] = useState("")
  const [liabilities, setLiabilities] = useState("")
  const [results, setResults] = useState({
    recommendedCoverage: 0,
    termPremium: 0,
    wholeLifePremium: 0,
    endowmentPremium: 0,
  })

  const { t } = useLanguage()

  const calculateLifeInsurance = () => {
    const income = Number.parseFloat(annualIncome)
    const existing = Number.parseFloat(existingCoverage) || 0
    const userAge = Number.parseFloat(age)
    const numDependents = Number.parseFloat(dependents) || 0
    const totalLiabilities = Number.parseFloat(liabilities) || 0

    if (income && userAge) {
      // Calculate recommended coverage using Human Life Value method
      let multiplier = 10

      // Adjust multiplier based on age
      if (userAge < 30) multiplier = 15
      else if (userAge < 40) multiplier = 12
      else if (userAge < 50) multiplier = 10
      else multiplier = 8

      // Add for dependents
      multiplier += numDependents * 2

      const recommendedCoverage = income * multiplier + totalLiabilities - existing

      // Premium calculations (approximate rates per ₹1 lakh coverage)
      let termRate = 300 // Base rate for term insurance
      let wholeLifeRate = 2500 // Whole life insurance rate
      let endowmentRate = 4000 // Endowment policy rate

      // Adjust rates based on age
      if (userAge > 30) {
        termRate += 100
        wholeLifeRate += 500
        endowmentRate += 800
      }
      if (userAge > 40) {
        termRate += 200
        wholeLifeRate += 1000
        endowmentRate += 1500
      }
      if (userAge > 50) {
        termRate += 500
        wholeLifeRate += 2000
        endowmentRate += 3000
      }

      const coverageInLakhs = recommendedCoverage / 100000

      setResults({
        recommendedCoverage: Math.round(Math.max(0, recommendedCoverage)),
        termPremium: Math.round(coverageInLakhs * termRate),
        wholeLifePremium: Math.round(coverageInLakhs * wholeLifeRate),
        endowmentPremium: Math.round(coverageInLakhs * endowmentRate),
      })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setAnnualIncome("")
    setExistingCoverage("")
    setDependents("")
    setLiabilities("")
    setResults({
      recommendedCoverage: 0,
      termPremium: 0,
      wholeLifePremium: 0,
      endowmentPremium: 0,
    })
  }

  useEffect(() => {
    if (age && annualIncome) {
      calculateLifeInsurance()
    }
  }, [age, annualIncome, existingCoverage, dependents, liabilities])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-blue-600" />
              Life Insurance Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate your ideal life insurance coverage and compare premium options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (Years)</label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                  <Input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    placeholder="Enter annual income"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Existing Coverage (₹)</label>
                  <Input
                    type="number"
                    value={existingCoverage}
                    onChange={(e) => setExistingCoverage(e.target.value)}
                    placeholder="Enter existing coverage"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
                  <Input
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                    placeholder="Enter number of dependents"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Liabilities (₹)</label>
                  <Input
                    type="number"
                    value={liabilities}
                    onChange={(e) => setLiabilities(e.target.value)}
                    placeholder="Enter total liabilities"
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateLifeInsurance} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate
                  </Button>
                  <Button onClick={resetCalculator} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Insurance Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Recommended Coverage</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ₹ {results.recommendedCoverage.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Premium Comparison (Annual)</h3>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-green-800">Term Insurance</div>
                        <div className="text-sm text-green-600">Pure life cover, lowest premium</div>
                      </div>
                      <div className="text-xl font-bold text-green-600">₹ {results.termPremium.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-orange-800">Whole Life Insurance</div>
                        <div className="text-sm text-orange-600">Lifelong coverage with cash value</div>
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        ₹ {results.wholeLifePremium.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-purple-800">Endowment Policy</div>
                        <div className="text-sm text-purple-600">Insurance + Investment combination</div>
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        ₹ {results.endowmentPremium.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {results.recommendedCoverage > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Calculation Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span>{age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Income:</span>
                        <span>₹ {Number.parseFloat(annualIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dependents:</span>
                        <span>{dependents || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Existing Coverage:</span>
                        <span>₹ {Number.parseFloat(existingCoverage || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Liabilities:</span>
                        <span>₹ {Number.parseFloat(liabilities || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Additional Coverage Needed:</span>
                        <span>₹ {results.recommendedCoverage.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommendation:</h4>
                  <p className="text-sm text-blue-700">
                    Term insurance offers the highest coverage at the lowest premium. Consider it for pure protection
                    needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
