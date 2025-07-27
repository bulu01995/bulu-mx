"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Users, Calculator, RotateCcw } from "lucide-react"

export default function HumanLifeValueCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("")
  const [retirementAge, setRetirementAge] = useState("")
  const [annualIncome, setAnnualIncome] = useState("")
  const [annualExpenses, setAnnualExpenses] = useState("")
  const [inflationRate, setInflationRate] = useState("6")
  const [discountRate, setDiscountRate] = useState("8")
  const [result, setResult] = useState<{
    humanLifeValue: number
    totalEarnings: number
    totalExpenses: number
    netContribution: number
  } | null>(null)

  const calculateHumanLifeValue = () => {
    const age = Number.parseInt(currentAge) || 0
    const retirement = Number.parseInt(retirementAge) || 60
    const income = Number.parseFloat(annualIncome) || 0
    const expenses = Number.parseFloat(annualExpenses) || 0
    const inflation = Number.parseFloat(inflationRate) / 100
    const discount = Number.parseFloat(discountRate) / 100

    const workingYears = retirement - age
    if (workingYears <= 0) return

    let totalEarnings = 0
    let totalExpenses = 0

    // Calculate present value of future earnings and expenses
    for (let year = 1; year <= workingYears; year++) {
      const futureIncome = income * Math.pow(1 + inflation, year)
      const futureExpenses = expenses * Math.pow(1 + inflation, year)

      const presentValueIncome = futureIncome / Math.pow(1 + discount, year)
      const presentValueExpenses = futureExpenses / Math.pow(1 + discount, year)

      totalEarnings += presentValueIncome
      totalExpenses += presentValueExpenses
    }

    const netContribution = totalEarnings - totalExpenses
    const humanLifeValue = Math.max(netContribution, 0)

    setResult({
      humanLifeValue: Math.round(humanLifeValue),
      totalEarnings: Math.round(totalEarnings),
      totalExpenses: Math.round(totalExpenses),
      netContribution: Math.round(netContribution),
    })
  }

  const resetCalculator = () => {
    setCurrentAge("")
    setRetirementAge("")
    setAnnualIncome("")
    setAnnualExpenses("")
    setInflationRate("6")
    setDiscountRate("8")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Human Life Value Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate the economic value of your life based on your future earning potential and contribution to your
            family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Life Value Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentAge">Current Age</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    placeholder="Enter your current age"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    placeholder="Enter retirement age"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="Enter your annual income"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="annualExpenses">Annual Personal Expenses (₹)</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  placeholder="Enter your annual personal expenses"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    step="0.1"
                    placeholder="Enter inflation rate"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="discountRate">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.1"
                    placeholder="Enter discount rate"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateHumanLifeValue} className="flex-1">
                  Calculate Life Value
                </Button>
                <Button onClick={resetCalculator} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Human Life Value</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Human Life Value</h3>
                    <p className="text-3xl font-bold text-blue-600">₹{result.humanLifeValue.toLocaleString()}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Total Future Earnings (Present Value)</h4>
                      <p className="text-xl font-bold text-green-600">₹{result.totalEarnings.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900">Total Personal Expenses (Present Value)</h4>
                      <p className="text-xl font-bold text-red-600">₹{result.totalExpenses.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Net Contribution to Family</h4>
                      <p className="text-xl font-bold text-purple-600">₹{result.netContribution.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">What This Means:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• This is the economic value of your life to your family</li>
                      <li>• Consider this amount for life insurance coverage</li>
                      <li>• Accounts for inflation and time value of money</li>
                      <li>• Review annually as income and expenses change</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your details to calculate your human life value</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
