"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, PiggyBank } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function NPSCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [currentAge, setCurrentAge] = useState("")
  const [retirementAge, setRetirementAge] = useState("60")
  const [expectedReturn, setExpectedReturn] = useState("10")
  const [results, setResults] = useState({
    totalContribution: 0,
    maturityCorpus: 0,
    annuityAmount: 0,
    lumpsum: 0,
    monthlyPension: 0,
  })

  const { t } = useLanguage()

  const calculateNPS = () => {
    const monthly = Number.parseFloat(monthlyContribution)
    const age = Number.parseFloat(currentAge)
    const retirement = Number.parseFloat(retirementAge)
    const returnRate = Number.parseFloat(expectedReturn) / 100

    if (monthly && age && retirement && returnRate) {
      const investmentPeriod = retirement - age
      const totalMonths = investmentPeriod * 12
      const monthlyRate = returnRate / 12

      // Calculate maturity corpus
      const maturityCorpus =
        monthly * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))

      const totalContribution = monthly * totalMonths

      // At retirement, 40% can be withdrawn as lumpsum, 60% must be used for annuity
      const lumpsum = maturityCorpus * 0.4
      const annuityAmount = maturityCorpus * 0.6

      // Assuming 6% annuity rate for monthly pension calculation
      const monthlyPension = (annuityAmount * 0.06) / 12

      setResults({
        totalContribution: Math.round(totalContribution),
        maturityCorpus: Math.round(maturityCorpus),
        annuityAmount: Math.round(annuityAmount),
        lumpsum: Math.round(lumpsum),
        monthlyPension: Math.round(monthlyPension),
      })
    }
  }

  const resetCalculator = () => {
    setMonthlyContribution("")
    setCurrentAge("")
    setRetirementAge("60")
    setExpectedReturn("10")
    setResults({
      totalContribution: 0,
      maturityCorpus: 0,
      annuityAmount: 0,
      lumpsum: 0,
      monthlyPension: 0,
    })
  }

  useEffect(() => {
    if (monthlyContribution && currentAge && retirementAge && expectedReturn) {
      calculateNPS()
    }
  }, [monthlyContribution, currentAge, retirementAge, expectedReturn])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <PiggyBank className="h-10 w-10 text-indigo-600" />
              NPS Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate your National Pension System corpus and retirement benefits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">NPS Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution (₹)</label>
                  <Input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="Enter monthly contribution"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500 mt-1">Minimum: ₹500 per month</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    placeholder="Enter current age"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    placeholder="Enter retirement age"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500 mt-1">Minimum: 60 years</div>
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
                  <div className="text-xs text-gray-500 mt-1">Historical average: 10-12% p.a.</div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateNPS} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate NPS
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
                <CardTitle className="text-xl font-semibold">NPS Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Maturity Corpus</div>
                  <div className="text-3xl font-bold text-indigo-600">₹ {results.maturityCorpus.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Lumpsum (40%)</div>
                    <div className="text-xl font-bold text-green-600">₹ {results.lumpsum.toLocaleString()}</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Annuity (60%)</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.annuityAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Monthly Pension</div>
                  <div className="text-2xl font-bold text-orange-600">₹ {results.monthlyPension.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Based on 6% annuity rate</div>
                </div>

                {results.maturityCorpus > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">NPS Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Contribution:</span>
                        <span>₹ {Number.parseFloat(monthlyContribution).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Period:</span>
                        <span>{Number.parseFloat(retirementAge) - Number.parseFloat(currentAge)} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Return:</span>
                        <span>{expectedReturn}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Contribution:</span>
                        <span>₹ {results.totalContribution.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wealth Gained:</span>
                        <span>₹ {(results.maturityCorpus - results.totalContribution).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Maturity Corpus:</span>
                        <span>₹ {results.maturityCorpus.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">NPS Benefits:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Tax deduction under Section 80C & 80CCD</li>
                    <li>• Additional ₹50,000 deduction under 80CCD(1B)</li>
                    <li>• Low cost investment option</li>
                    <li>• Government co-contribution for eligible subscribers</li>
                    <li>• Portable across jobs and locations</li>
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
