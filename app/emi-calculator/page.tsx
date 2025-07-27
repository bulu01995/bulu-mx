"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LoanApplicationForm from "@/components/loan-application-form"

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTenure, setLoanTenure] = useState("")
  const [tenureType, setTenureType] = useState("years")
  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0,
  })

  const { t } = useLanguage()

  const calculateEMI = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 12 / 100
    const tenure = tenureType === "years" ? Number.parseFloat(loanTenure) * 12 : Number.parseFloat(loanTenure)

    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)
      const totalAmount = emi * tenure
      const totalInterest = totalAmount - principal

      setResults({
        monthlyEMI: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalAmount: Math.round(totalAmount),
      })
    }
  }

  const resetCalculator = () => {
    setLoanAmount("")
    setInterestRate("")
    setLoanTenure("")
    setResults({
      monthlyEMI: 0,
      totalInterest: 0,
      totalAmount: 0,
    })
  }

  useEffect(() => {
    if (loanAmount && interestRate && loanTenure) {
      calculateEMI()
    }
  }, [loanAmount, interestRate, loanTenure, tenureType])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Calculator className="h-10 w-10 text-blue-600" />
              {t("emiCalculator")}
            </h1>
            <p className="text-gray-600 text-lg">Calculate your Equated Monthly Installment (EMI) for loans</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("loanAmount")} (₹)</label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("loanTenure")}</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      placeholder="Enter tenure"
                      className="text-lg flex-1"
                    />
                    <select
                      value={tenureType}
                      onChange={(e) => setTenureType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="years">{t("years")}</option>
                      <option value="months">{t("months")}</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateEMI} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                <CardTitle className="text-xl font-semibold">Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t("monthlyEMI")}</div>
                  <div className="text-3xl font-bold text-blue-600">₹ {results.monthlyEMI.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("totalInterest")}</div>
                    <div className="text-xl font-bold text-green-600">₹ {results.totalInterest.toLocaleString()}</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{t("totalAmount")}</div>
                    <div className="text-xl font-bold text-purple-600">₹ {results.totalAmount.toLocaleString()}</div>
                  </div>
                </div>

                {results.monthlyEMI > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Breakdown:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Principal Amount:</span>
                        <span>₹ {Number.parseFloat(loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Amount:</span>
                        <span>₹ {results.totalInterest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Payable:</span>
                        <span>₹ {results.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Loan Application Form Section */}
          <div className="mt-12">
            <LoanApplicationForm loanType="Personal Loan" />
          </div>
        </div>
      </main>
    </div>
  )
}
