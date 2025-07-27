"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TermInsuranceCalculatorPage() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [smokingStatus, setSmokingStatus] = useState("non-smoker")
  const [sumAssured, setSumAssured] = useState("")
  const [policyTerm, setPolicyTerm] = useState("")
  const [results, setResults] = useState({
    annualPremium: 0,
    totalPremium: 0,
    coverageRatio: 0,
  })

  const { t } = useLanguage()

  const calculateTermInsurance = () => {
    const userAge = Number.parseFloat(age)
    const coverage = Number.parseFloat(sumAssured)
    const term = Number.parseFloat(policyTerm)

    if (userAge && coverage && term) {
      // Base rate per ₹1 lakh coverage
      let baseRate = 250

      // Age factor
      if (userAge <= 25) baseRate = 200
      else if (userAge <= 30) baseRate = 250
      else if (userAge <= 35) baseRate = 350
      else if (userAge <= 40) baseRate = 500
      else if (userAge <= 45) baseRate = 750
      else if (userAge <= 50) baseRate = 1200
      else if (userAge <= 55) baseRate = 2000
      else baseRate = 3500

      // Gender factor
      if (gender === "female") {
        baseRate = baseRate * 0.85 // 15% discount for females
      }

      // Smoking factor
      if (smokingStatus === "smoker") {
        baseRate = baseRate * 1.5 // 50% higher for smokers
      }

      const coverageInLakhs = coverage / 100000
      const annualPremium = Math.round(coverageInLakhs * baseRate)
      const totalPremium = annualPremium * term
      const coverageRatio = Math.round((coverage / annualPremium) * 100) / 100

      setResults({
        annualPremium,
        totalPremium,
        coverageRatio,
      })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setGender("male")
    setSmokingStatus("non-smoker")
    setSumAssured("")
    setPolicyTerm("")
    setResults({
      annualPremium: 0,
      totalPremium: 0,
      coverageRatio: 0,
    })
  }

  useEffect(() => {
    if (age && sumAssured && policyTerm) {
      calculateTermInsurance()
    }
  }, [age, gender, smokingStatus, sumAssured, policyTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-green-600" />
              Term Insurance Calculator
            </h1>
            <p className="text-gray-600 text-lg">Calculate your term insurance premium and coverage benefits</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Policy Details</CardTitle>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
                  <select
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                  >
                    <option value="non-smoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured (₹)</label>
                  <Input
                    type="number"
                    value={sumAssured}
                    onChange={(e) => setSumAssured(e.target.value)}
                    placeholder="Enter sum assured"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Term (Years)</label>
                  <Input
                    type="number"
                    value={policyTerm}
                    onChange={(e) => setPolicyTerm(e.target.value)}
                    placeholder="Enter policy term"
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateTermInsurance} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Premium
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
                <CardTitle className="text-xl font-semibold">Premium Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Annual Premium</div>
                  <div className="text-3xl font-bold text-green-600">₹ {results.annualPremium.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Premium</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.totalPremium.toLocaleString()}</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Coverage Ratio</div>
                    <div className="text-xl font-bold text-purple-600">{results.coverageRatio}x</div>
                  </div>
                </div>

                {results.annualPremium > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Policy Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span>{age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gender:</span>
                        <span className="capitalize">{gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Smoking Status:</span>
                        <span className="capitalize">{smokingStatus.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sum Assured:</span>
                        <span>₹ {Number.parseFloat(sumAssured).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Policy Term:</span>
                        <span>{policyTerm} years</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Annual Premium:</span>
                        <span>₹ {results.annualPremium.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Term Insurance Benefits:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Highest coverage at lowest premium</li>
                    <li>• Tax benefits under Section 80C</li>
                    <li>• Tax-free death benefit</li>
                    <li>• Pure protection without investment</li>
                    <li>• Flexible premium payment options</li>
                  </ul>
                </div>

                {gender === "female" && (
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-semibold text-pink-800 mb-2">Women's Advantage:</h4>
                    <p className="text-sm text-pink-700">
                      Women typically get 10-15% lower premiums due to higher life expectancy and lower risk factors.
                    </p>
                  </div>
                )}

                {smokingStatus === "smoker" && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Smoking Impact:</h4>
                    <p className="text-sm text-red-700">
                      Smokers pay 40-50% higher premiums. Consider quitting to reduce your insurance costs and improve
                      health.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
