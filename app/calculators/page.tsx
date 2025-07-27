"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  Banknote,
  Shield,
  CreditCard,
  Receipt,
  Building,
  Heart,
  Car,
  Bike,
  Plane,
} from "lucide-react"

const calculators = [
  // Investment Calculators
  {
    name: "SIP Calculator",
    description: "Calculate returns on your Systematic Investment Plan",
    href: "/sip-calculator",
    icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
    category: "Investment",
  },
  {
    name: "PPF Calculator",
    description: "Calculate your Public Provident Fund maturity amount",
    href: "/ppf-calculator",
    icon: <PiggyBank className="h-8 w-8 text-indigo-600" />,
    category: "Investment",
  },
  {
    name: "FD Calculator",
    description: "Calculate Fixed Deposit maturity amount and interest",
    href: "/fd-calculator",
    icon: <Banknote className="h-8 w-8 text-orange-600" />,
    category: "Investment",
  },
  {
    name: "Income Tax Calculator",
    description: "Calculate your income tax liability",
    href: "/income-tax-calculator",
    icon: <Receipt className="h-8 w-8 text-green-600" />,
    category: "Investment",
  },
  {
    name: "ULIP Calculator",
    description: "Calculate Unit Linked Insurance Plan returns",
    href: "/ulip-calculator",
    icon: <Building className="h-8 w-8 text-blue-600" />,
    category: "Investment",
  },
  {
    name: "NPS Calculator",
    description: "Calculate National Pension System returns",
    href: "/nps-calculator",
    icon: <PiggyBank className="h-8 w-8 text-orange-600" />,
    category: "Investment",
  },

  // Loan Calculators
  {
    name: "EMI Calculator",
    description: "Calculate your Equated Monthly Installment for loans",
    href: "/emi-calculator",
    icon: <Calculator className="h-8 w-8 text-blue-600" />,
    category: "Loans",
  },
  {
    name: "Loan Calculator",
    description: "Calculate loan amount based on your EMI capacity",
    href: "/loan-calculator",
    icon: <CreditCard className="h-8 w-8 text-green-600" />,
    category: "Loans",
  },

  // Insurance Calculators
  {
    name: "Life Insurance Calculator",
    description: "Calculate your ideal life insurance coverage",
    href: "/life-insurance-calculator",
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    category: "Insurance",
  },
  {
    name: "Insurance Calculator",
    description: "Calculate your ideal insurance coverage and premium",
    href: "/insurance-calculator",
    icon: <Shield className="h-8 w-8 text-red-600" />,
    category: "Insurance",
  },
  {
    name: "Health Insurance Calculator",
    description: "Calculate health insurance premium and coverage",
    href: "/health-insurance-calculator",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    category: "Insurance",
  },
  {
    name: "Car Insurance Calculator",
    description: "Calculate car insurance premium",
    href: "/car-insurance-calculator",
    icon: <Car className="h-8 w-8 text-blue-600" />,
    category: "Insurance",
  },
  {
    name: "Bike Insurance Calculator",
    description: "Calculate bike insurance premium",
    href: "/bike-insurance-calculator",
    icon: <Bike className="h-8 w-8 text-green-600" />,
    category: "Insurance",
  },
  {
    name: "Travel Insurance Calculator",
    description: "Calculate travel insurance premium",
    href: "/travel-insurance-calculator",
    icon: <Plane className="h-8 w-8 text-purple-600" />,
    category: "Insurance",
  },
]

const categories = ["All", "Investment", "Loans", "Insurance"]

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Make informed financial decisions with our comprehensive range of calculators. From loan EMIs to investment
            returns, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator, index) => (
            <Link key={index} href={calculator.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {calculator.icon}
                    <div>
                      <CardTitle className="text-lg">{calculator.name}</CardTitle>
                      <span className="text-sm text-gray-500">{calculator.category}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{calculator.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
