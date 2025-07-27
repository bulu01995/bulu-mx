"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, XCircle, Calculator, Car } from "lucide-react"

export default function ZeroDepreciationCarInsurancePage() {
  const benefits = [
    "100% claim amount without depreciation deduction",
    "Coverage for plastic, rubber, and metal parts",
    "Higher claim settlement amount",
    "Peace of mind for new car owners",
    "Protection against market value depreciation",
  ]

  const limitations = [
    "Higher premium compared to regular insurance",
    "Age limit for vehicles (usually 5 years)",
    "May not cover engine damage",
    "Claim frequency restrictions may apply",
  ]

  const comparison = [
    {
      aspect: "Claim Settlement",
      regular: "After depreciation deduction",
      zeroDep: "Full amount without depreciation",
    },
    {
      aspect: "Premium Cost",
      regular: "Lower premium",
      zeroDep: "15-20% higher premium",
    },
    {
      aspect: "Parts Coverage",
      regular: "Depreciated value",
      zeroDep: "Full replacement cost",
    },
    {
      aspect: "Best For",
      regular: "Old cars (5+ years)",
      zeroDep: "New cars (0-5 years)",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Zero Depreciation Car Insurance</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get 100% claim amount without any depreciation deduction. Perfect protection for your new car with
            comprehensive coverage.
          </p>
        </div>

        {/* What is Zero Depreciation */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What is Zero Depreciation Car Insurance?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Zero Depreciation car insurance, also known as Nil Depreciation or Bumper to Bumper insurance, is an
              add-on cover that ensures you receive the full claim amount without any depreciation deduction on your
              car's parts.
            </p>
            <p className="text-gray-600">
              In regular car insurance, the insurer deducts depreciation on plastic, rubber, nylon, and metal parts
              during claim settlement. With Zero Depreciation cover, you get the complete replacement cost.
            </p>
          </CardContent>
        </Card>

        {/* Benefits and Limitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-6 w-6 mr-2" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <XCircle className="h-6 w-6 mr-2" />
                Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Zero Depreciation vs Regular Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Aspect</th>
                    <th className="text-left p-4 font-semibold">Regular Insurance</th>
                    <th className="text-left p-4 font-semibold">Zero Depreciation</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{item.aspect}</td>
                      <td className="p-4 text-gray-600">{item.regular}</td>
                      <td className="p-4 text-gray-600">{item.zeroDep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Who Should Buy */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Who Should Buy Zero Depreciation Insurance?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Ideal For:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• New car owners (0-2 years)</li>
                  <li>• Expensive/luxury car owners</li>
                  <li>• First-time car buyers</li>
                  <li>• Those who can afford higher premium</li>
                  <li>• Cars with high maintenance costs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-3">Not Recommended For:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cars older than 5 years</li>
                  <li>• Budget-conscious buyers</li>
                  <li>• Cars with low market value</li>
                  <li>• Experienced drivers with good record</li>
                  <li>• Cars nearing end of life</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Zero Depreciation Car Insurance Quote</h2>
            <p className="text-gray-600 mb-6">
              Compare quotes from top insurers and get the best Zero Depreciation car insurance policy for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Premium
              </Button>
              <Button variant="outline">
                <Car className="h-4 w-4 mr-2" />
                Compare Quotes
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
