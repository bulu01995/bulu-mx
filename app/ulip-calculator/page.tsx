"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ULIPCalculatorPage() {
  const [monthlyPremium, setMonthlyPremium] = useState("")
  const [policyTerm, setPolicyTerm] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("")
  const [sumAssured, setSumAssured] = useState("")
  const [results, setResults] = useState({
    totalPremium: 0,
    maturityValue: 0,
    totalReturns: 0,
    lifecover: 0,
  })

  const { t } = useLanguage()

  const calculateULIP = () => {
    const premium = Number.parseFloat(monthlyPremium)
    const term = Number.parseFloat(policyTerm)
    const returnRate = Number.parseFloat(expectedReturn) / 100
    const cover = Number.parseFloat(sumAssured)

    if (premium && term && returnRate) {
      const totalPremium = premium * 12 * term
      const monthlyRate = returnRate / 12
      const totalMonths = term * 12

      // ULIP calculation considering charges (simplified)
      const effectivePremium = premium * 0.95 // Assuming 5% charges
      const maturityValue =
        effectivePremium * 12 * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))

      const totalReturns = maturityValue - totalPremium
      const lifecover = cover || premium * 12 * 10 // Default 10x annual premium

      setResults({
        totalPremium: Math.round(totalPremium),
        maturityValue: Math.round(maturityValue),
        totalReturns: Math.round(totalReturns),
        lifecover: Math.round(lifecover),
      })
    }
  }

  const resetCalculator = () => {
    setMonthlyPremium("")
    setPolicyTerm("")
    setExpectedReturn("")
    setSumAssured("")
    setResults({
      totalPremium: 0,
      maturityValue: 0,
      totalReturns: 0,
      lifecover: 0,
    })
  }

  useEffect(() => {
    if (monthlyPremium && policyTerm && expectedReturn) {
      calculateULIP()
    }
  }, [monthlyPremium, policyTerm, expectedReturn, sumAssured])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="h-10 w-10 text-blue-600" />
              ULIP Calculator
            </h1>
            <p className="text-gray-600 text-lg">Calculate your Unit Linked Insurance Plan returns and life coverage</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">ULIP Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Premium (₹)</label>
                  <Input
                    type="number"
                    value={monthlyPremium}
                    onChange={(e) => setMonthlyPremium(e.target.value)}
                    placeholder="Enter monthly premium"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (% p.a.)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="Enter expected return"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sum Assured (₹) - Optional</label>
                  <Input
                    type="number"
                    value={sumAssured}
                    onChange={(e) => setSumAssured(e.target.value)}
                    placeholder="Enter sum assured"
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateULIP} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate ULIP
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
                <CardTitle className="text-xl font-semibold">ULIP Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Maturity Value</div>
                  <div className="text-3xl font-bold text-blue-600">₹ {results.maturityValue.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Premium</div>
                    <div className="text-xl font-bold text-green-600">₹ {results.totalPremium.toLocaleString()}</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Returns</div>
                    <div className="text-xl font-bold text-purple-600">₹ {results.totalReturns.toLocaleString()}</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Life Cover</div>
                  <div className="text-2xl font-bold text-orange-600">₹ {results.lifecover.toLocaleString()}</div>
                </div>

                {results.maturityValue > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">ULIP Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Premium:</span>
                        <span>₹ {Number.parseFloat(monthlyPremium).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Policy Term:</span>
                        <span>{policyTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Return:</span>
                        <span>{expectedReturn}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Premium Paid:</span>
                        <span>₹ {results.totalPremium.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wealth Gained:</span>
                        <span>₹ {results.totalReturns.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Maturity Value:</span>
                        <span>₹ {results.maturityValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">ULIP Benefits:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Life insurance + Investment in one plan</li>
                    <li>• Tax benefits under Section 80C</li>
                    <li>• Flexibility to switch between funds</li>
                    <li>• Partial withdrawals after 5 years</li>
                    <li>• Market-linked returns potential</li>
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
