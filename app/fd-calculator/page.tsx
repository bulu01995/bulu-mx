"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Banknote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function FDCalculatorPage() {
  const [principalAmount, setPrincipalAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [compoundingFrequency, setCompoundingFrequency] = useState("quarterly")
  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInterest: 0,
  })

  const { t } = useLanguage()

  const calculateFD = () => {
    const principal = Number.parseFloat(principalAmount)
    const rate = Number.parseFloat(interestRate) / 100
    const time = Number.parseFloat(timePeriod)

    let n = 1 // Default to annually
    if (compoundingFrequency === "quarterly") n = 4
    else if (compoundingFrequency === "monthly") n = 12
    else if (compoundingFrequency === "daily") n = 365

    if (principal && rate && time) {
      const maturityAmount = principal * Math.pow(1 + rate / n, n * time)
      const totalInterest = maturityAmount - principal

      setResults({
        maturityAmount: Math.round(maturityAmount),
        totalInterest: Math.round(totalInterest),
      })
    }
  }

  const resetCalculator = () => {
    setPrincipalAmount("")
    setInterestRate("")
    setTimePeriod("")
    setResults({
      maturityAmount: 0,
      totalInterest: 0,
    })
  }

  useEffect(() => {
    if (principalAmount && interestRate && timePeriod) {
      calculateFD()
    }
  }, [principalAmount, interestRate, timePeriod, compoundingFrequency])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Banknote className="h-10 w-10 text-orange-600" />
              {t("fdCalculator")}
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate your Fixed Deposit (FD) maturity amount and interest earnings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">FD Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("principalAmount")} (₹)</label>
                  <Input
                    type="number"
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                    placeholder="Enter principal amount"
                    className="text-lg"
                  />
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  >
                    <option value="annually">Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateFD} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                <CardTitle className="text-xl font-semibold">FD Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("maturityAmount")}</div>
                  <div className="text-3xl font-bold text-orange-600">₹ {results.maturityAmount.toLocaleString()}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("totalInterest")}</div>
                  <div className="text-2xl font-bold text-green-600">₹ {results.totalInterest.toLocaleString()}</div>
                </div>

                {results.maturityAmount > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">FD Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Principal Amount:</span>
                        <span>₹ {Number.parseFloat(principalAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span>{interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Period:</span>
                        <span>{timePeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compounding:</span>
                        <span className="capitalize">{compoundingFrequency}</span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
