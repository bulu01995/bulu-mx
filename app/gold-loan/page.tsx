"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function GoldLoanPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Approval",
      description: "Get loan approval within 30 minutes",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your gold is stored in bank lockers with insurance",
    },
    {
      icon: Clock,
      title: "Flexible Repayment",
      description: "Choose from various repayment options",
    },
    {
      icon: CheckCircle,
      title: "No Income Proof",
      description: "Minimal documentation required",
    },
  ]

  const benefits = [
    "Loan amount up to ₹1 Crore",
    "Interest rates starting from 7.35% p.a.",
    "Up to 75% of gold value",
    "Flexible tenure options",
    "No processing fees",
    "Quick gold evaluation",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Gold Loan - Unlock Your Gold's Value
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-yellow-100">
                Get instant gold loans at competitive rates starting from 7.35% p.a. with minimal documentation.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-yellow-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-300/30">
                  ✓ 30 Min Approval
                </div>
                <div className="bg-amber-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-300/30">
                  ✓ Up to ₹1 Crore
                </div>
                <div className="bg-orange-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-300/30">
                  ✓ 75% Gold Value
                </div>
              </div>
            </div>

            {/* Right Content - Gold Image */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Gold Loan - Unlock Your Gold's Value"
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

      {/* Quick Apply Form */}
      <LoanApplicationForm loanType="Gold Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Gold Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-100"
                    >
                      <feature.icon className="h-6 w-6 text-yellow-600 mt-1" />
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
            <Card className="border-l-4 border-l-amber-500">
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
          <Card className="border-t-4 border-t-yellow-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Age: 18 to 75 years</li>
                <li>• Indian citizen or NRI</li>
                <li>• Own gold jewelry or coins</li>
                <li>• Gold purity: 18-24 carats</li>
                <li>• No income proof required</li>
                <li>• Any employment status</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• PAN Card</li>
                <li>• Aadhaar Card</li>
                <li>• Address proof</li>
                <li>• Passport size photographs</li>
                <li>• Gold jewelry/coins</li>
                <li>• Purchase receipts (if available)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
