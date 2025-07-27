"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoanAgainstPropertyPage() {
  const features = [
    {
      icon: Zap,
      title: "High Loan Amount",
      description: "Get up to 70% of property value as loan amount",
    },
    {
      icon: Shield,
      title: "Lower Interest Rates",
      description: "Competitive rates starting from 9.2% p.a.",
    },
    {
      icon: Clock,
      title: "Flexible Tenure",
      description: "Repayment tenure up to 20 years",
    },
    {
      icon: CheckCircle,
      title: "Multiple Use",
      description: "Use funds for any personal or business purpose",
    },
  ]

  const benefits = [
    "Loan amount up to ₹10 Crores",
    "Interest rates starting from 9.2% p.a.",
    "Tenure up to 20 years",
    "Up to 70% of property value",
    "Minimal processing fees",
    "Quick approval and disbursal",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Loan Against Property - Unlock Your Property Value
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-blue-100">
                Get loans against your property at competitive rates starting from 9.2% p.a.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-blue-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/30">
                  ✓ 9.2% Interest Rate
                </div>
                <div className="bg-indigo-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-300/30">
                  ✓ Up to ₹10 Crores
                </div>
                <div className="bg-purple-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-300/30">
                  ✓ 70% Property Value
                </div>
              </div>
            </div>

            {/* Right Content - Property Loan SVG */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/images/property-loan.svg"
                  alt="Loan Against Property - Unlock Value"
                  width={250}
                  height={200}
                  className="sm:w-[280px] sm:h-[220px] object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Apply Form - Full Width */}
      <LoanApplicationForm loanType="Loan Against Property" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Why Choose Our Loan Against Property?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                    >
                      <feature.icon className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Loan Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Age: 21 to 70 years</li>
                <li>• Property ownership: Clear title</li>
                <li>• Property type: Residential/Commercial</li>
                <li>• Income: Stable source of income</li>
                <li>• Credit score: 650 and above</li>
                <li>• Property valuation required</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Property documents (Title deed)</li>
                <li>• PAN Card & Aadhaar Card</li>
                <li>• Income proof documents</li>
                <li>• Bank statements (last 6 months)</li>
                <li>• Property valuation report</li>
                <li>• NOC from society/builder</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
