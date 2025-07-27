"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Heart,
  Car,
  Bike,
  Users,
  Plane,
  Home,
  TrendingUp,
  Baby,
  UserCheck,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react"
import Link from "next/link"

const insuranceProducts = [
  {
    title: "Term Life Insurance",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    badge: "Lowest Price Guarantee",
    badgeColor: "bg-green-100 text-green-800",
    description: "Pure life cover at affordable rates",
    link: "/insurance/term-insurance",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
  {
    title: "Health Insurance",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    badge: "FREE Home Visit",
    badgeColor: "bg-green-100 text-green-800",
    description: "Comprehensive health coverage",
    link: "/insurance/health-insurance",
    bgColor: "bg-red-50 hover:bg-red-100",
  },
  {
    title: "Investment Plans",
    icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
    badge: "In-Built Life Cover",
    badgeColor: "bg-green-100 text-green-800",
    description: "Grow wealth with insurance",
    link: "/insurance/investment-plans",
    bgColor: "bg-orange-50 hover:bg-orange-100",
  },
  {
    title: "Car Insurance",
    icon: <Car className="h-8 w-8 text-blue-600" />,
    badge: "Upto 91% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Comprehensive car protection",
    link: "/insurance/car-insurance",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    title: "2 Wheeler Insurance",
    icon: <Bike className="h-8 w-8 text-green-600" />,
    badge: "Upto 85% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Bike insurance made easy",
    link: "/insurance/bike-insurance",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
  {
    title: "Family Health Insurance",
    icon: <Users className="h-8 w-8 text-pink-600" />,
    badge: "Upto 25% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Complete family coverage",
    link: "/insurance/family-health-insurance",
    bgColor: "bg-pink-50 hover:bg-pink-100",
  },
  {
    title: "Travel Insurance",
    icon: <Plane className="h-8 w-8 text-cyan-600" />,
    badge: "Upto 25% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Travel worry-free",
    link: "/travel-insurance-calculator",
    bgColor: "bg-cyan-50 hover:bg-cyan-100",
  },
  {
    title: "Term Insurance (Women)",
    icon: <UserCheck className="h-8 w-8 text-purple-600" />,
    badge: "Upto 20% Cheaper",
    badgeColor: "bg-green-100 text-green-800",
    description: "Special rates for women",
    link: "/insurance/term-insurance",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
  {
    title: "Term Plans with Return of Premium",
    icon: <Shield className="h-8 w-8 text-indigo-600" />,
    badge: "Premium Waiver",
    badgeColor: "bg-yellow-100 text-yellow-800",
    description: "Get your premiums back",
    link: "/insurance/term-insurance",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
  },
  {
    title: "Guaranteed Return Plans",
    icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
    badge: "Upto 65% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Assured returns guaranteed",
    link: "/insurance/guaranteed-return-plans",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
  },
  {
    title: "Child Savings Plans",
    icon: <Baby className="h-8 w-8 text-pink-600" />,
    badge: "Premium Waiver",
    badgeColor: "bg-red-100 text-red-800",
    description: "Secure your child's future",
    link: "/insurance/investment-plans",
    bgColor: "bg-pink-50 hover:bg-pink-100",
  },
  {
    title: "Retirement Plans",
    icon: <Users className="h-8 w-8 text-gray-600" />,
    badge: "Upto 65% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Plan your golden years",
    link: "/nps-calculator",
    bgColor: "bg-gray-50 hover:bg-gray-100",
  },
  {
    title: "Employee Group Health Insurance",
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    badge: "Upto 25% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Corporate health coverage",
    link: "/insurance/business-insurance",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    title: "Home Insurance",
    icon: <Home className="h-8 w-8 text-brown-600" />,
    badge: "Upto 25% Discount",
    badgeColor: "bg-green-100 text-green-800",
    description: "Protect your home",
    link: "/insurance/business-insurance",
    bgColor: "bg-amber-50 hover:bg-amber-100",
  },
]

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
    title: "51 insurers offering lowest prices",
    description: "Compare and choose from top insurance companies",
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: "Quick, easy & hassle free",
    description: "Get instant quotes and buy online in minutes",
  },
]

export default function InsurancePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Let's find you
                <br />
                the <span className="text-blue-600">Best Insurance</span>
              </h1>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Promotional Banner */}
            <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm opacity-90 mb-2">
                  *In Unit Linked Insurance Plans, the investment risk in the investment portfolio is borne by the
                  policyholder and the returns are not guaranteed
                </p>

                <div className="mb-4">
                  <p className="text-lg">
                    Invest <span className="text-2xl font-bold text-yellow-300">₹ 10,000/month</span>
                  </p>
                  <p className="text-lg">
                    & Get <span className="text-3xl font-bold text-green-300">₹ 1 Crore</span> returns*
                  </p>
                </div>

                <p className="text-sm mb-4 opacity-90">In-built life cover</p>

                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  View plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-xs mt-4 opacity-75">
                  <p>*Standard T&C Applied</p>
                  <p>*This Premium/Investment/Ad No.048</p>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Insurance</h2>
            <p className="text-gray-600 text-lg">Comprehensive coverage for all your needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {insuranceProducts.map((product, index) => (
              <Link key={index} href={product.link}>
                <Card
                  className={`${product.bgColor} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full`}
                >
                  <CardContent className="p-4 text-center relative">
                    {/* Badge */}
                    <Badge
                      className={`${product.badgeColor} text-xs mb-3 absolute -top-2 left-1/2 transform -translate-x-1/2`}
                    >
                      {product.badge}
                    </Badge>

                    {/* Icon */}
                    <div className="mb-4 mt-4 flex justify-center group-hover:scale-110 transition-transform">
                      {product.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm text-gray-900 mb-2 leading-tight">{product.title}</h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 mb-3">{product.description}</p>

                    {/* CTA Button */}
                    <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg">Your trusted insurance partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
              <p className="text-gray-600">Over 1 crore+ customers trust us for their insurance needs</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Claims</h3>
              <p className="text-gray-600">Hassle-free claim process with 24/7 support</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Quotes</h3>
              <p className="text-gray-600">Get instant quotes and buy policies online in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Protected?</h2>
          <p className="text-xl mb-8 opacity-90">Compare quotes from top insurers and find the perfect plan for you</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}
