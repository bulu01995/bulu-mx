"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, Car, Zap, Shield, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function CarLoanPage() {
  const features = [
    {
      icon: Zap,
      title: "Quick Approval",
      description: "Get approval in as little as 30 minutes with minimal documentation",
    },
    {
      icon: Shield,
      title: "Competitive Rates",
      description: "Interest rates starting from 8.5% p.a. for new cars",
    },
    {
      icon: Clock,
      title: "Flexible Tenure",
      description: "Choose repayment tenure from 1 to 7 years",
    },
    {
      icon: Car,
      title: "100% Financing",
      description: "Get up to 100% on-road price financing for select models",
    },
  ]

  const benefits = [
    "Loan amount up to ₹1 Crore",
    "Interest rates starting from 8.5% p.a.",
    "Up to 100% financing available",
    "Flexible repayment tenure up to 7 years",
    "Minimal documentation required",
    "Quick loan processing and disbursal",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Car Loan - Drive Your Dream Car
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-sky-100">
                Get instant car loans with competitive interest rates starting from 8.5% p.a. and flexible repayment
                options.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-sky-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sky-300/30">
                  ✓ 30 Min Approval
                </div>
                <div className="bg-blue-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/30">
                  ✓ Up to ₹1 Crore
                </div>
                <div className="bg-indigo-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-300/30">
                  ✓ 100% Financing
                </div>
              </div>
            </div>

            {/* Right Content - Car Image */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Car Loan - Drive Your Dream Car"
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
      <LoanApplicationForm loanType="Car Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-sky-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Car Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-100"
                    >
                      <feature.icon className="h-6 w-6 text-sky-600 mt-1" />
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
            <Card className="border-l-4 border-l-blue-500">
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
          <Card className="border-t-4 border-t-sky-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Age: 21 to 65 years</li>
                <li>• Minimum monthly income: ₹15,000</li>
                <li>• Employment: Salaried or Self-employed</li>
                <li>• Work experience: Minimum 1 year</li>
                <li>• Credit score: 650 and above</li>
                <li>• Valid driving license</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• PAN Card and Aadhaar Card</li>
                <li>• Salary slips (last 3 months)</li>
                <li>• Bank statements (last 6 months)</li>
                <li>• Employment certificate</li>
                <li>• Car quotation/proforma invoice</li>
                <li>• Passport size photographs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
