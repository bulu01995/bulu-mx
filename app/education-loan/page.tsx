"use client"
import LoanApplicationForm from "@/components/loan-application-form"
import { CheckCircle, GraduationCap, BookOpen, Users, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function EducationLoanPage() {
  const features = [
    {
      icon: GraduationCap,
      title: "Higher Education Support",
      description: "Funding for undergraduate, postgraduate, and professional courses",
    },
    {
      icon: Globe,
      title: "Study Abroad Options",
      description: "Special rates and higher amounts for international education",
    },
    {
      icon: BookOpen,
      title: "Course Flexibility",
      description: "Coverage for tuition fees, accommodation, and other expenses",
    },
    {
      icon: Users,
      title: "Co-applicant Benefits",
      description: "Parents or guardians can be co-applicants for better terms",
    },
  ]

  const benefits = [
    "Loan amount up to ₹1.5 Crore for abroad studies",
    "Interest rates starting from 8.5% p.a.",
    "Moratorium period during course duration",
    "Tax benefits under Section 80E",
    "No prepayment penalty",
    "Flexible repayment options",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Much Smaller Height */}
      <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white py-3 sm:py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight">
                Education Loan - Fund Your Dreams
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-amber-100">
                Get education loans for domestic and international studies with competitive interest rates and flexible
                repayment options.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="bg-amber-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-300/30">
                  ✓ Up to ₹1.5 Crore
                </div>
                <div className="bg-orange-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-300/30">
                  ✓ Moratorium Period
                </div>
                <div className="bg-red-400/80 backdrop-blur-sm px-4 py-2 rounded-full border border-red-300/30">
                  ✓ Tax Benefits
                </div>
              </div>
            </div>

            {/* Right Content - Education Image */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="relative flex justify-center lg:justify-end">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Education Loan - Fund Your Dreams"
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
      <LoanApplicationForm loanType="Education Loan" />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Features and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Why Choose Our Education Loan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100"
                    >
                      <feature.icon className="h-6 w-6 text-amber-600 mt-1" />
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
            <Card className="border-l-4 border-l-orange-500">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility - Domestic Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Indian citizen</li>
                <li>• Admission to recognized institution</li>
                <li>• Co-applicant (parent/guardian/spouse)</li>
                <li>• Good academic record</li>
                <li>• Age: 18-35 years</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-orange-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Eligibility - Study Abroad</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Indian citizen</li>
                <li>• Admission to recognized foreign institution</li>
                <li>• Valid passport and visa</li>
                <li>• IELTS/TOEFL/GRE/GMAT scores</li>
                <li>• Co-applicant with stable income</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Documents Required */}
        <Card className="mb-16 border-t-4 border-t-red-500">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Required Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Admission letter from institution</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Fee structure and cost estimates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Academic records and certificates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Income proof of co-applicant</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Bank statements (6 months)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Identity and address proof</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Passport (for abroad studies)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Collateral documents (if applicable)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Limits */}
        <Card className="border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Education Loan Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Study Destination</th>
                    <th className="text-left p-4 font-semibold">Maximum Loan Amount</th>
                    <th className="text-left p-4 font-semibold">Collateral Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Domestic Studies</td>
                    <td className="p-4">Up to ₹10 Lakh</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Domestic Studies</td>
                    <td className="p-4">₹10 Lakh - ₹20 Lakh</td>
                    <td className="p-4">Yes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Study Abroad</td>
                    <td className="p-4">Up to ₹20 Lakh</td>
                    <td className="p-4">No</td>
                  </tr>
                  <tr>
                    <td className="p-4">Study Abroad</td>
                    <td className="p-4">₹20 Lakh - ₹1.5 Crore</td>
                    <td className="p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
