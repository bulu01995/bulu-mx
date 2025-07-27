"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Monitor,
  Smartphone,
  CreditCard,
  FileText,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Globe,
  Zap,
  Lock,
  HeadphonesIcon,
} from "lucide-react"

export default function OnlineServices() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: 1,
      title: "Digital Banking Services",
      description: "Complete online banking solutions with secure transactions and account management",
      icon: CreditCard,
      category: "banking",
      features: ["Online Account Opening", "Fund Transfers", "Bill Payments", "Statement Downloads"],
      status: "Available",
      price: "Free",
    },
    {
      id: 2,
      title: "Document Verification",
      description: "AI-powered document verification and digital KYC services",
      icon: FileText,
      category: "verification",
      features: ["Instant Verification", "Digital KYC", "Document Storage", "Compliance Check"],
      status: "Available",
      price: "₹99/verification",
    },
    {
      id: 3,
      title: "Insurance Portal",
      description: "Comprehensive insurance management and claim processing online",
      icon: Shield,
      category: "insurance",
      features: ["Policy Management", "Claim Filing", "Premium Calculator", "Renewal Alerts"],
      status: "Available",
      price: "Free",
    },
    {
      id: 4,
      title: "Loan Application System",
      description: "End-to-end loan application and approval process online",
      icon: Users,
      category: "loans",
      features: ["Quick Application", "Status Tracking", "Document Upload", "EMI Calculator"],
      status: "Available",
      price: "Free",
    },
    {
      id: 5,
      title: "Mobile App Services",
      description: "Native mobile applications for iOS and Android platforms",
      icon: Smartphone,
      category: "mobile",
      features: ["Cross-platform", "Push Notifications", "Offline Mode", "Biometric Login"],
      status: "Coming Soon",
      price: "Free Download",
    },
    {
      id: 6,
      title: "24/7 Customer Support",
      description: "Round-the-clock customer support through multiple channels",
      icon: HeadphonesIcon,
      category: "support",
      features: ["Live Chat", "Video Call", "Email Support", "Phone Support"],
      status: "Available",
      price: "Free",
    },
  ]

  const categories = [
    { id: "all", name: "All Services", icon: Globe },
    { id: "banking", name: "Banking", icon: CreditCard },
    { id: "verification", name: "Verification", icon: FileText },
    { id: "insurance", name: "Insurance", icon: Shield },
    { id: "loans", name: "Loans", icon: Users },
    { id: "mobile", name: "Mobile", icon: Smartphone },
    { id: "support", name: "Support", icon: HeadphonesIcon },
  ]

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Services Available", value: "15+", icon: Monitor },
    { label: "Uptime", value: "99.9%", icon: Zap },
    { label: "Security Level", value: "Bank Grade", icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Monitor className="h-4 w-4" />
            Digital Services Platform
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Complete Online Services</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access all your financial and business services online with our secure, user-friendly digital platform.
            Available 24/7 from anywhere in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Monitor className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
            <Button size="lg" variant="outline">
              <Clock className="mr-2 h-5 w-5" />
              24/7 Support
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Digital Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of online services designed to make your life easier
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

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <Badge variant={service.status === "Available" ? "default" : "secondary"} className="mt-1">
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-semibold text-blue-600">{service.price}</span>
                      <Button
                        size="sm"
                        disabled={service.status === "Coming Soon"}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {service.status === "Available" ? "Access Now" : "Notify Me"}
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Digital?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who have made the switch to our digital platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Users className="mr-2 h-5 w-5" />
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <HeadphonesIcon className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
