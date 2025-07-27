"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function PersonalLoanPage() {
  const features = [
    {
      icon: Zap,
      title: "Quick Approval",
      description: "Get approval in as little as 2 hours with minimal documentation",
    },
    {
      icon: Shield,
      title: "Secure Process",
      description: "100% secure and encrypted application process",
    },
    {
      icon: Clock,
      title: "Flexible Tenure",
      description: "Choose repayment tenure from 12 to 84 months",
    },
    {
      icon: CheckCircle,
      title: "No Hidden Charges",
      description: "Transparent pricing with no hidden fees or charges",
    },
  ]

  const benefits = [
    "Loan amount up to ₹40 Lakhs",
    "Interest rates starting from 10.49% p.a.",
    "Minimal documentation required",
    "Quick disbursal within 24 hours",
    "No collateral or guarantor needed",
    "Flexible repayment options",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Personal Loan - Quick & Easy
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-orange-100">
                Get instant personal loans with competitive interest rates starting from 10.49% p.a.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-orange-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-300/30">
                  ✓ 2 Hour Approval
                </div>
                <div className="bg-red-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-red-300/30">
                  ✓ Up to ₹40 Lakhs
                </div>
                <div className="bg-pink-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-300/30">
                  ✓ Minimal Documentation
                </div>
              </div>
            </div>

            {/* Right Content - Personal Loan SVG */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/images/personal-loan.svg"
                  alt="Personal Loan - Quick & Easy"
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
      <LoanApplicationForm loanType="Personal Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Personal Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100"
                    >
                      <feature.icon className="h-6 w-6 text-orange-600 mt-1" />
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
            <Card className="border-l-4 border-l-red-500">
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
          <Card className="border-t-4 border-t-orange-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Age: 21 to 65 years</li>
                <li>• Minimum monthly income: ₹25,000</li>
                <li>• Employment: Salaried or Self-employed</li>
                <li>• Work experience: Minimum 2 years</li>
                <li>• Credit score: 650 and above</li>
                <li>• Resident of India</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-red-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• PAN Card</li>
                <li>• Aadhaar Card</li>
                <li>• Salary slips (last 3 months)</li>
                <li>• Bank statements (last 6 months)</li>
                <li>• Employment certificate</li>
                <li>• Passport size photographs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
