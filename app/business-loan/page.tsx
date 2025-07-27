"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function BusinessLoanPage() {
  const features = [
    {
      icon: Zap,
      title: "Quick Funding",
      description: "Get funds disbursed within 72 hours of approval",
    },
    {
      icon: Shield,
      title: "Flexible Terms",
      description: "Customized loan terms based on your business needs",
    },
    {
      icon: Clock,
      title: "Extended Tenure",
      description: "Repayment tenure up to 7 years for better cash flow",
    },
    {
      icon: CheckCircle,
      title: "Minimal Collateral",
      description: "Unsecured loans available for eligible businesses",
    },
  ]

  const benefits = [
    "Loan amount up to ₹75 Lakhs",
    "Interest rates starting from 14% p.a.",
    "Tenure up to 7 years",
    "Minimal documentation",
    "Quick approval process",
    "Flexible repayment options",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Business Loan - Fuel Your Growth
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-violet-100">
                Get business loans starting from 14% p.a. to expand your business operations
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-violet-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-300/30">
                  ✓ 72 Hour Disbursal
                </div>
                <div className="bg-purple-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-300/30">
                  ✓ Up to ₹75 Lakhs
                </div>
                <div className="bg-fuchsia-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-fuchsia-300/30">
                  ✓ Minimal Documentation
                </div>
              </div>
            </div>

            {/* Right Content - Business Loan SVG */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/images/business-loan.svg"
                  alt="Business Loan - Fuel Your Growth"
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
      <LoanApplicationForm loanType="Business Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-violet-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Business Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100"
                    >
                      <feature.icon className="h-6 w-6 text-violet-600 mt-1" />
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
            <Card className="border-l-4 border-l-purple-500">
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
          <Card className="border-t-4 border-t-violet-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Business vintage: Minimum 2 years</li>
                <li>• Annual turnover: Minimum ₹40 Lakhs</li>
                <li>• Business type: Proprietorship, Partnership, Pvt Ltd</li>
                <li>• Age: 21 to 65 years</li>
                <li>• Credit score: 650 and above</li>
                <li>• Profit for last 2 years</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Business registration documents</li>
                <li>• PAN Card & Aadhaar Card</li>
                <li>• Bank statements (last 12 months)</li>
                <li>• ITR for last 2 years</li>
                <li>• Financial statements</li>
                <li>• GST returns (if applicable)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
