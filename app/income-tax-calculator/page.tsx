"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Receipt } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState("")
  const [deductions, setDeductions] = useState("")
  const [taxRegime, setTaxRegime] = useState("old")
  const [results, setResults] = useState({
    taxableIncome: 0,
    totalTax: 0,
    netIncome: 0,
    effectiveRate: 0,
  })

  const { t } = useLanguage()

  const calculateTax = () => {
    const income = Number.parseFloat(annualIncome)
    const totalDeductions = Number.parseFloat(deductions) || 0
    const taxableIncome = Math.max(0, income - totalDeductions)

    let incomeTax = 0

    if (taxRegime === "old") {
      // Old tax regime slabs
      if (taxableIncome > 250000) {
        if (taxableIncome <= 500000) {
          incomeTax = (taxableIncome - 250000) * 0.05
        } else if (taxableIncome <= 1000000) {
          incomeTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2
        } else {
          incomeTax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3
        }
      }
    } else {
      // New tax regime slabs
      if (taxableIncome > 300000) {
        if (taxableIncome <= 600000) {
          incomeTax = (taxableIncome - 300000) * 0.05
        } else if (taxableIncome <= 900000) {
          incomeTax = 300000 * 0.05 + (taxableIncome - 600000) * 0.1
        } else if (taxableIncome <= 1200000) {
          incomeTax = 300000 * 0.05 + 300000 * 0.1 + (taxableIncome - 900000) * 0.15
        } else if (taxableIncome <= 1500000) {
          incomeTax = 300000 * 0.05 + 300000 * 0.1 + 300000 * 0.15 + (taxableIncome - 1200000) * 0.2
        } else {
          incomeTax = 300000 * 0.05 + 300000 * 0.1 + 300000 * 0.15 + 300000 * 0.2 + (taxableIncome - 1500000) * 0.3
        }
      }
    }

    const cess = incomeTax * 0.04 // 4% Health and Education Cess
    const totalTax = incomeTax + cess
    const netIncome = income - totalTax
    const effectiveRate = (totalTax / income) * 100

    setResults({
      taxableIncome: Math.round(taxableIncome),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
      effectiveRate: Number.parseFloat(effectiveRate.toFixed(2)),
    })
  }

  const resetCalculator = () => {
    setAnnualIncome("")
    setDeductions("")
    setResults({
      taxableIncome: 0,
      totalTax: 0,
      netIncome: 0,
      effectiveRate: 0,
    })
  }

  useEffect(() => {
    if (annualIncome) {
      calculateTax()
    }
  }, [annualIncome, deductions, taxRegime])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Receipt className="h-10 w-10 text-green-600" />
              Income Tax Calculator
            </h1>
            <p className="text-gray-600 text-lg">Calculate your income tax liability for FY 2023-24</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Income Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Deductions (₹)</label>
                  <Input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    placeholder="Enter total deductions"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Regime</label>
                  <select
                    value={taxRegime}
                    onChange={(e) => setTaxRegime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                  >
                    <option value="old">Old Tax Regime</option>
                    <option value="new">New Tax Regime</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateTax} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Tax
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
                <CardTitle className="text-xl font-semibold">Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Tax Liability</div>
                  <div className="text-3xl font-bold text-green-600">₹ {results.totalTax.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Taxable Income</div>
                    <div className="text-xl font-bold text-blue-600">₹ {results.taxableIncome.toLocaleString()}</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Net Income</div>
                    <div className="text-xl font-bold text-purple-600">₹ {results.netIncome.toLocaleString()}</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Effective Tax Rate</div>
                  <div className="text-2xl font-bold text-orange-600">{results.effectiveRate}%</div>
                </div>

                {results.totalTax > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Tax Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Annual Income:</span>
                        <span>₹ {Number.parseFloat(annualIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Deductions:</span>
                        <span>₹ {Number.parseFloat(deductions || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <span>₹ {results.taxableIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Regime:</span>
                        <span className="capitalize">{taxRegime}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Tax:</span>
                        <span>₹ {results.totalTax.toLocaleString()}</span>
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
