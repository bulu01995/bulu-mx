"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, PiggyBank } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function PPFCalculatorPage() {
  const [yearlyInvestment, setYearlyInvestment] = useState("")
  const [timePeriod, setTimePeriod] = useState("15") // PPF default is 15 years
  const [interestRate, setInterestRate] = useState("7.1") // Current PPF rate
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalInterest: 0,
    maturityAmount: 0,
  })

  const { t } = useLanguage()

  const calculatePPF = () => {
    const annualAmount = Number.parseFloat(yearlyInvestment)
    const years = Number.parseFloat(timePeriod)
    const rate = Number.parseFloat(interestRate) / 100

    if (annualAmount && years && rate) {
      let maturityAmount = 0

      // PPF calculation with compound interest
      for (let i = 1; i <= years; i++) {
        maturityAmount = (maturityAmount + annualAmount) * (1 + rate)
      }

      const totalInvestment = annualAmount * years
      const totalInterest = maturityAmount - totalInvestment

      setResults({
        totalInvestment: Math.round(totalInvestment),
        totalInterest: Math.round(totalInterest),
        maturityAmount: Math.round(maturityAmount),
      })
    }
  }

  const resetCalculator = () => {
    setYearlyInvestment("")
    setTimePeriod("15")
    setInterestRate("7.1")
    setResults({
      totalInvestment: 0,
      totalInterest: 0,
      maturityAmount: 0,
    })
  }

  useEffect(() => {
    if (yearlyInvestment && timePeriod && interestRate) {
      calculatePPF()
    }
  }, [yearlyInvestment, timePeriod, interestRate])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <PiggyBank className="h-10 w-10 text-indigo-600" />
              {t("ppfCalculator")}
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate your Public Provident Fund (PPF) maturity amount and returns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">PPF Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("yearlyInvestment")} (₹)</label>
                  <Input
                    type="number"
                    value={yearlyInvestment}
                    onChange={(e) => setYearlyInvestment(e.target.value)}
                    placeholder="Enter yearly investment"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500 mt-1">Minimum: ₹500, Maximum: ₹1,50,000 per year</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("timePeriod")} ({t("years")})
                  </label>
                  <Input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    placeholder="Enter time period"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500 mt-1">Minimum lock-in period: 15 years</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("interestRate")} {t("perAnnum")}
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="Enter interest rate"
                    className="text-lg"
                  />
                  <div className="text-xs text-gray-500 mt-1">Current PPF rate: 7.1% p.a.</div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculatePPF} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                <CardTitle className="text-xl font-semibold">PPF Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("ppfMaturityAmount")}</div>
                  <div className="text-3xl font-bold text-indigo-600">₹ {results.maturityAmount.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("totalInvestment")}</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.totalInvestment.toLocaleString()}</div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("totalInterest")}</div>
                    <div className="text-xl font-bold text-green-600">₹ {results.totalInterest.toLocaleString()}</div>
                  </div>
                </div>

                {results.maturityAmount > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">PPF Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Yearly Investment:</span>
                        <span>₹ {Number.parseFloat(yearlyInvestment).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Period:</span>
                        <span>{timePeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span>{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span>₹ {results.totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Earned:</span>
                        <span>₹ {results.totalInterest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Maturity Amount:</span>
                        <span>₹ {results.maturityAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">PPF Benefits:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Tax deduction under Section 80C</li>
                    <li>• Tax-free interest and maturity amount</li>
                    <li>• 15-year lock-in period</li>
                    <li>• Partial withdrawal after 7th year</li>
                    <li>• Loan facility after 3rd year</li>
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
