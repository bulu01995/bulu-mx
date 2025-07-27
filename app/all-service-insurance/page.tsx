"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Car,
  Home,
  Heart,
  Plane,
  Briefcase,
  Users,
  Star,
  CheckCircle,
  Phone,
  Calculator,
  FileText,
  Award,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function AllServiceInsurance() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const insuranceProducts = [
    {
      id: 1,
      title: "Term Life Insurance",
      description: "Pure life protection with high coverage at affordable premiums",
      icon: Shield,
      category: "life",
      premium: "₹500/month",
      coverage: "₹1 Crore",
      features: ["Tax Benefits", "Flexible Terms", "Online Claims", "Family Protection"],
      rating: 4.8,
      popular: true,
    },
    {
      id: 2,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family",
      icon: Heart,
      category: "health",
      premium: "₹800/month",
      coverage: "₹10 Lakhs",
      features: ["Cashless Treatment", "Pre-existing Diseases", "Maternity Cover", "Wellness Benefits"],
      rating: 4.7,
      popular: true,
    },
    {
      id: 3,
      title: "Car Insurance",
      description: "Complete protection for your vehicle with comprehensive coverage",
      icon: Car,
      category: "motor",
      premium: "₹12,000/year",
      coverage: "IDV Based",
      features: ["Zero Depreciation", "Roadside Assistance", "Engine Protection", "Quick Claims"],
      rating: 4.6,
      popular: false,
    },
    {
      id: 4,
      title: "Home Insurance",
      description: "Protect your home and belongings from unforeseen events",
      icon: Home,
      category: "property",
      premium: "₹3,000/year",
      coverage: "₹50 Lakhs",
      features: ["Structure Cover", "Contents Protection", "Liability Cover", "Temporary Accommodation"],
      rating: 4.5,
      popular: false,
    },
    {
      id: 5,
      title: "Travel Insurance",
      description: "Stay protected during domestic and international travel",
      icon: Plane,
      category: "travel",
      premium: "₹300/trip",
      coverage: "₹5 Lakhs",
      features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss", "Flight Delay"],
      rating: 4.4,
      popular: false,
    },
    {
      id: 6,
      title: "Business Insurance",
      description: "Comprehensive protection for your business operations",
      icon: Briefcase,
      category: "business",
      premium: "₹5,000/month",
      coverage: "₹2 Crores",
      features: ["Property Protection", "Liability Cover", "Business Interruption", "Cyber Security"],
      rating: 4.6,
      popular: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Insurance", icon: Shield },
    { id: "life", name: "Life Insurance", icon: Shield },
    { id: "health", name: "Health Insurance", icon: Heart },
    { id: "motor", name: "Motor Insurance", icon: Car },
    { id: "property", name: "Property Insurance", icon: Home },
    { id: "travel", name: "Travel Insurance", icon: Plane },
    { id: "business", name: "Business Insurance", icon: Briefcase },
  ]

  const benefits = [
    {
      title: "Expert Guidance",
      description: "Get personalized advice from certified insurance experts",
      icon: Users,
    },
    {
      title: "Best Prices",
      description: "Compare and get the most competitive premium rates",
      icon: TrendingUp,
    },
    {
      title: "Quick Claims",
      description: "Hassle-free claim settlement with dedicated support",
      icon: Clock,
    },
    {
      title: "Trusted Partners",
      description: "Partnered with top-rated insurance companies in India",
      icon: Award,
    },
  ]

  const filteredProducts = insuranceProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Complete Insurance Solutions
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">All Service Insurance</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive insurance coverage for every aspect of your life. Compare, choose, and buy the best insurance
            policies online with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Premium
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-5 w-5" />
              Talk to Expert
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search insurance products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Insurance Services?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Products Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Insurance Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of insurance products designed to protect what matters most
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow relative">
                {product.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600">Popular</Badge>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <product.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Premium</p>
                        <p className="font-semibold text-green-600">{product.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Coverage</p>
                        <p className="font-semibold text-gray-900">{product.coverage}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Calculator className="mr-2 h-4 w-4" />
                        Get Quote
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <FileText className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help Choosing the Right Insurance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our insurance experts are here to help you find the perfect coverage for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-5 w-5" />
              Call Expert: 9142647797
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <FileText className="mr-2 h-5 w-5" />
              Request Callback
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
