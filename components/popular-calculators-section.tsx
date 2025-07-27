"use client"

import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Shield,
  Heart,
  Car,
  Bike,
  Plane,
  Receipt,
  Building,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PopularCalculatorsSection() {
  const calculatorCategories = [
    {
      title: "Investment calculators",
      bgColor: "bg-pink-50",
      icon: <PiggyBank className="h-12 w-12 text-pink-600" />,
      calculators: [
        { name: "SIP Calculator", href: "/sip-calculator", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Income Tax Calculator", href: "/income-tax-calculator", icon: <Receipt className="h-4 w-4" /> },
        { name: "ULIP Calculator", href: "/ulip-calculator", icon: <Building className="h-4 w-4" /> },
        { name: "NPS Calculator", href: "/nps-calculator", icon: <PiggyBank className="h-4 w-4" /> },
      ],
    },
    {
      title: "Term Insurance calculators",
      bgColor: "bg-cyan-50",
      icon: <Shield className="h-12 w-12 text-cyan-600" />,
      calculators: [
        { name: "Life Insurance Calculator", href: "/life-insurance-calculator", icon: <Shield className="h-4 w-4" /> },
        { name: "Term Insurance Calculator", href: "/term-insurance-calculator", icon: <Shield className="h-4 w-4" /> },
        {
          name: "Human Life Value Calculator",
          href: "/human-life-value-calculator",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "NRI Term Insurance Calculator",
          href: "/nri-term-insurance-calculator",
          icon: <Shield className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Policy premium calculators",
      bgColor: "bg-purple-50",
      icon: <Receipt className="h-12 w-12 text-purple-600" />,
      calculators: [
        {
          name: "Health Insurance Premium Calculator",
          href: "/health-insurance-calculator",
          icon: <Heart className="h-4 w-4" />,
        },
        { name: "Car Insurance Calculator", href: "/car-insurance-calculator", icon: <Car className="h-4 w-4" /> },
        { name: "Bike Insurance Calculator", href: "/bike-insurance-calculator", icon: <Bike className="h-4 w-4" /> },
        {
          name: "Travel Insurance Calculator",
          href: "/travel-insurance-calculator",
          icon: <Plane className="h-4 w-4" />,
        },
      ],
    },
  ]

  const advantages = [
    {
      icon: "💰",
      title: "One of the best Prices",
      subtitle: "Guaranteed",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    },
    {
      icon: "⚖️",
      title: "Unbiased Advice",
      subtitle: "Keeping customers first",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: "✅",
      title: "100% Reliable",
      subtitle: "Regulated by IRDAI",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: "🤝",
      title: "Claims Support",
      subtitle: "Made stress-free",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
    },
    {
      icon: "😊",
      title: "Happy to Help",
      subtitle: "Every day of the week",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Popular Calculators Section */}
        <div className="mb-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Popular calculators</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-4xl">
              Discover our user-friendly calculators tailored to help you make informed financial decisions. Our diverse
              range of insurance calculators ensures you find the perfect fit for your needs. Explore the options below
              to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {calculatorCategories.map((category, index) => (
              <Card
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  {/* Header with icon */}
                  <div className={`${category.bgColor} p-6 relative`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 leading-tight max-w-[200px]">
                          {category.title}
                        </h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">{category.icon}</div>
                    </div>
                  </div>

                  {/* Calculator links */}
                  <div className="p-6 space-y-1">
                    {category.calculators.map((calculator, calcIndex) => (
                      <Link
                        key={calcIndex}
                        href={calculator.href}
                        className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500">{calculator.icon}</span>
                          <span className="text-gray-700 font-medium text-sm">{calculator.name}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/calculators">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-2 rounded-lg font-medium"
              >
                View All Calculators
              </Button>
            </Link>
          </div>
        </div>

        {/* Bulu Enterprise Advantage Section */}
        <div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Bulu Enterprise Advantage</h2>
            <p className="text-gray-600 text-lg mb-6 max-w-4xl">
              When you buy insurance from us, you get more than just financial safety. You also get: our promise of
              simplifying complex insurance terms and conditions, quick stress-free claims, instant quotes from top
              insurers and being present for you in the toughest of times.
            </p>
            <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Know more
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`${advantage.bgColor} p-4 rounded-xl shadow-sm mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:shadow-md transition-shadow duration-300`}
                >
                  <span className="text-2xl">{advantage.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{advantage.title}</h3>
                <p className="text-gray-500 text-xs">{advantage.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
