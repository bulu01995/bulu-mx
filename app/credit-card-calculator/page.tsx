"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, CreditCard, RotateCcw, AlertTriangle } from "lucide-react"

export default function CreditCardCalculatorPage() {
  const [outstandingBalance, setOutstandingBalance] = useState("")
  const [interestRate, setInterestRate] = useState("36")
  const [paymentType, setPaymentType] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [result, setResult] = useState<{
    monthsToPayOff: number
    totalInterest: number
    totalAmount: number
    monthlySavings?: number
  } | null>(null)

  const calculatePayoff = () => {
    const balance = Number.parseFloat(outstandingBalance) || 0
    const rate = Number.parseFloat(interestRate) / 100 / 12
    let payment = 0

    if (paymentType === "minimum") {
      payment = Math.max(balance * 0.05, 500) // 5% of balance or ₹500, whichever is higher
    } else if (paymentType === "fixed") {
      payment = Number.parseFloat(paymentAmount) || 0
    }

    if (balance > 0 && rate > 0 && payment > 0) {
      if (payment <= balance * rate) {
        // Payment is less than interest, debt will never be paid off
        setResult({
          monthsToPayOff: Number.POSITIVE_INFINITY,
          totalInterest: Number.POSITIVE_INFINITY,
          totalAmount: Number.POSITIVE_INFINITY,
        })
        return
      }

      const monthsToPayOff = Math.ceil(-Math.log(1 - (balance * rate) / payment) / Math.log(1 + rate))

      const totalAmount = payment * monthsToPayOff
      const totalInterest = totalAmount - balance

      // Calculate savings if paying more than minimum
      let monthlySavings = 0
      if (paymentType === "fixed") {
        const minimumPayment = Math.max(balance * 0.05, 500)
        if (payment > minimumPayment) {
          const minimumMonths = Math.ceil(-Math.log(1 - (balance * rate) / minimumPayment) / Math.log(1 + rate))
          const minimumTotalAmount = minimumPayment * minimumMonths
          const minimumTotalInterest = minimumTotalAmount - balance
          monthlySavings = minimumTotalInterest - totalInterest
        }
      }

      setResult({
        monthsToPayOff: Math.round(monthsToPayOff),
        totalInterest: Math.round(totalInterest),
        totalAmount: Math.round(totalAmount),
        monthlySavings: Math.round(monthlySavings),
      })
    }
  }

  const resetCalculator = () => {
    setOutstandingBalance("")
    setPaymentType("")
    setPaymentAmount("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Credit Card Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Calculate how long it will take to pay off your credit card debt and how much interest you'll pay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Credit Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="outstandingBalance">Outstanding Balance (₹)</Label>
                <Input
                  id="outstandingBalance"
                  type="number"
                  placeholder="Enter your current balance"
                  value={outstandingBalance}
                  onChange={(e) => setOutstandingBalance(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimum">Minimum Payment (5% of balance)</SelectItem>
                    <SelectItem value="fixed">Fixed Monthly Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentType === "fixed" && (
                <div>
                  <Label htmlFor="paymentAmount">Monthly Payment Amount (₹)</Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    placeholder="Enter monthly payment amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={calculatePayoff} className="flex-1">
                  Calculate Payoff
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
              <CardTitle>Payoff Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {result.monthsToPayOff === Number.POSITIVE_INFINITY ? (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                        <h3 className="text-lg font-semibold text-red-900">Warning!</h3>
                      </div>
                      <p className="text-red-700">
                        Your payment amount is too low to cover the interest charges. Your debt will never be paid off
                        with this payment amount.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Time to Pay Off</h3>
                        <p className="text-3xl font-bold text-blue-600">
                          {Math.floor(result.monthsToPayOff / 12)} years {result.monthsToPayOff % 12} months
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-900">Total Interest</h4>
                          <p className="text-xl font-bold text-red-600">₹{result.totalInterest.toLocaleString()}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900">Total Amount Paid</h4>
                          <p className="text-xl font-bold text-purple-600">₹{result.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      {result.monthlySavings && result.monthlySavings > 0 && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-900">Interest Savings</h4>
                          <p className="text-xl font-bold text-green-600">₹{result.monthlySavings.toLocaleString()}</p>
                          <p className="text-sm text-green-700">Compared to minimum payments</p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Tips to Pay Off Faster:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pay more than the minimum amount</li>
                      <li>• Make bi-weekly payments instead of monthly</li>
                      <li>• Use windfalls (bonus, tax refund) for payments</li>
                      <li>• Consider balance transfer to lower interest card</li>
                      <li>• Stop using the card for new purchases</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your credit card details to calculate payoff time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Credit Card Tips */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Credit Card Management Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Pay More Than Minimum</h3>
                <p className="text-blue-700 text-sm">
                  Paying only the minimum can take decades to pay off your balance and cost thousands in interest.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Pay on Time</h3>
                <p className="text-green-700 text-sm">
                  Late payments can result in fees and penalty interest rates, making your debt more expensive.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Monitor Your Spending</h3>
                <p className="text-purple-700 text-sm">
                  Keep track of your credit card spending and try to pay off new purchases immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
