"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    maturityValue: 0,
  })

  const { t } = useLanguage()

  const calculateSIP = () => {
    const monthlyAmount = Number.parseFloat(monthlyInvestment)
    const annualRate = Number.parseFloat(expectedReturn) / 100
    const monthlyRate = annualRate / 12
    const totalMonths = Number.parseFloat(timePeriod) * 12

    if (monthlyAmount && annualRate && totalMonths) {
      const maturityValue =
        monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))
      const totalInvestment = monthlyAmount * totalMonths
      const estimatedReturns = maturityValue - totalInvestment

      setResults({
        totalInvestment: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        maturityValue: Math.round(maturityValue),
      })
    }
  }

  const resetCalculator = () => {
    setMonthlyInvestment("")
    setExpectedReturn("")
    setTimePeriod("")
    setResults({
      totalInvestment: 0,
      estimatedReturns: 0,
      maturityValue: 0,
    })
  }

  useEffect(() => {
    if (monthlyInvestment && expectedReturn && timePeriod) {
      calculateSIP()
    }
  }, [monthlyInvestment, expectedReturn, timePeriod])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="h-10 w-10 text-purple-600" />
              {t("sipCalculator")}
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate your Systematic Investment Plan (SIP) returns and plan your investments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("monthlyInvestment")} (₹)</label>
                  <Input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    placeholder="Enter monthly investment"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("expectedReturn")} {t("perAnnum")}
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="Enter expected return rate"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("timePeriod")} ({t("years")})
                  </label>
                  <Input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    placeholder="Enter investment period"
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateSIP} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                <CardTitle className="text-xl font-semibold">Investment Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("maturityValue")}</div>
                  <div className="text-3xl font-bold text-purple-600">₹ {results.maturityValue.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("totalInvestment")}</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.totalInvestment.toLocaleString()}</div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("estimatedReturns")}</div>
                    <div className="text-xl font-bold text-green-600">
                      ₹ {results.estimatedReturns.toLocaleString()}
                    </div>
                  </div>
                </div>

                {results.maturityValue > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Investment Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Investment:</span>
                        <span>₹ {Number.parseFloat(monthlyInvestment).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Period:</span>
                        <span>{timePeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Return:</span>
                        <span>{expectedReturn}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span>₹ {results.totalInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wealth Gained:</span>
                        <span>₹ {results.estimatedReturns.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Maturity Value:</span>
                        <span>₹ {results.maturityValue.toLocaleString()}</span>
                      </div>
                    </div>
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
