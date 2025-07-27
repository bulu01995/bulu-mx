"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function HomeLoanPage() {
  const features = [
    {
      icon: Zap,
      title: "Lowest Interest Rates",
      description: "Starting from 8.35% p.a. with competitive terms",
    },
    {
      icon: Shield,
      title: "Up to 90% Funding",
      description: "Get up to 90% of property value as loan amount",
    },
    {
      icon: Clock,
      title: "Long Tenure",
      description: "Repayment tenure up to 30 years for lower EMIs",
    },
    {
      icon: CheckCircle,
      title: "Tax Benefits",
      description: "Enjoy tax benefits under Section 80C and 24(b)",
    },
  ]

  const benefits = [
    "Loan amount up to ₹5 Crores",
    "Interest rates starting from 8.35% p.a.",
    "Tenure up to 30 years",
    "Up to 90% of property value",
    "Tax benefits available",
    "Balance transfer facility",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Home Loan - Your Dream Home Awaits
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-emerald-100">
                Get home loans at lowest interest rates starting from 8.35% p.a. with quick approval
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-emerald-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-300/30">
                  ✓ 8.35% Interest Rate
                </div>
                <div className="bg-teal-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-300/30">
                  ✓ Up to ₹5 Crores
                </div>
                <div className="bg-cyan-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-300/30">
                  ✓ 30 Years Tenure
                </div>
              </div>
            </div>

            {/* Right Content - Home Loan SVG */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/images/home-loan.svg"
                  alt="Home Loan - Your Dream Home"
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
      <LoanApplicationForm loanType="Home Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Home Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100"
                    >
                      <feature.icon className="h-6 w-6 text-emerald-600 mt-1" />
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
            <Card className="border-l-4 border-l-teal-500">
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
          <Card className="border-t-4 border-t-emerald-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Age: 21 to 65 years</li>
                <li>• Minimum monthly income: ₹40,000</li>
                <li>• Employment: Salaried or Self-employed</li>
                <li>• Work experience: Minimum 3 years</li>
                <li>• Credit score: 700 and above</li>
                <li>• Property should be approved</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-teal-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• PAN Card & Aadhaar Card</li>
                <li>• Salary slips (last 3 months)</li>
                <li>• Bank statements (last 6 months)</li>
                <li>• Property documents</li>
                <li>• Sale agreement</li>
                <li>• Income tax returns (last 2 years)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
