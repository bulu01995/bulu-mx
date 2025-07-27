"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function InsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [existingCoverage, setExistingCoverage] = useState("")
  const [dependents, setDependents] = useState("")
  const [results, setResults] = useState({
    recommendedCoverage: 0,
    premiumEstimate: 0,
    additionalCoverage: 0,
  })

  const { t } = useLanguage()

  const calculateInsurance = () => {
    const income = Number.parseFloat(annualIncome)
    const existing = Number.parseFloat(existingCoverage) || 0
    const userAge = Number.parseFloat(age)
    const numDependents = Number.parseFloat(dependents) || 0

    if (income && userAge) {
      // Basic calculation: 10-15 times annual income
      let multiplier = 10

      // Adjust multiplier based on age and dependents
      if (userAge < 30) multiplier = 15
      else if (userAge < 40) multiplier = 12
      else if (userAge < 50) multiplier = 10
      else multiplier = 8

      // Add for dependents
      multiplier += numDependents * 2

      const recommendedCoverage = income * multiplier
      const additionalCoverage = Math.max(0, recommendedCoverage - existing)

      // Premium estimation (rough calculation)
      let premiumRate = 0.003 // 0.3% of sum assured
      if (userAge > 40) premiumRate = 0.005
      if (userAge > 50) premiumRate = 0.008

      const premiumEstimate = recommendedCoverage * premiumRate

      setResults({
        recommendedCoverage: Math.round(recommendedCoverage),
        premiumEstimate: Math.round(premiumEstimate),
        additionalCoverage: Math.round(additionalCoverage),
      })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setAnnualIncome("")
    setExistingCoverage("")
    setDependents("")
    setResults({
      recommendedCoverage: 0,
      premiumEstimate: 0,
      additionalCoverage: 0,
    })
  }

  useEffect(() => {
    if (age && annualIncome) {
      calculateInsurance()
    }
  }, [age, annualIncome, existingCoverage, dependents])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-red-600" />
              {t("insuranceCalculator")}
            </h1>
            <p className="text-gray-600 text-lg">Calculate your ideal life insurance coverage and premium estimates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("age")} (Years)</label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("annualIncome")} (₹)</label>
                  <Input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    placeholder="Enter annual income"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("existingCoverage")} (₹)</label>
                  <Input
                    type="number"
                    value={existingCoverage}
                    onChange={(e) => setExistingCoverage(e.target.value)}
                    placeholder="Enter existing coverage (optional)"
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

                <div className="flex gap-4">
                  <Button onClick={calculateInsurance} className="flex-1 bg-red-600 hover:bg-red-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    {t("calculate")}
                  </Button>
                  <Button onClick={resetCalculator} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {t("reset")}
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
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("recommendedCoverage")}</div>
                  <div className="text-3xl font-bold text-red-600">
                    ₹ {results.recommendedCoverage.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("premiumEstimate")}</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.premiumEstimate.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">per year</div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Additional Coverage Needed</div>
                    <div className="text-xl font-bold text-orange-600">
                      ₹ {results.additionalCoverage.toLocaleString()}
                    </div>
                  </div>
                </div>

                {results.recommendedCoverage > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Insurance Summary:</h3>
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
                        <span>Existing Coverage:</span>
                        <span>₹ {Number.parseFloat(existingCoverage || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dependents:</span>
                        <span>{dependents || 0}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Recommended Coverage:</span>
                        <span>₹ {results.recommendedCoverage.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Premium:</span>
                        <span>₹ {results.premiumEstimate.toLocaleString()}/year</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Insurance Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Buy insurance early for lower premiums</li>
                    <li>• Term insurance is most cost-effective</li>
                    <li>• Review coverage every 3-5 years</li>
                    <li>• Consider inflation while calculating coverage</li>
                    <li>• Don't mix insurance with investment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
