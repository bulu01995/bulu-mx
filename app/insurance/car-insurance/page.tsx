import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Car, Users, Clock, CheckCircle, Star } from "lucide-react"
import InsuranceApplicationForm from "@/components/insurance-application-form"
import InsuranceHeader from "../components/insurance-header"

export const metadata: Metadata = {
  title: "Car Insurance in Jharkhand | Best Motor Insurance Plans | Bulu Enterprises",
  description:
    "Get comprehensive car insurance coverage in Jharkhand. Compare quotes, instant policy, 24/7 claim support. Protect your vehicle with the best motor insurance plans.",
  keywords:
    "car insurance, motor insurance, vehicle insurance, Jharkhand, Ranchi, auto insurance, comprehensive coverage",
}

export default function CarInsurancePage() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description: "Complete protection against accidents, theft, natural disasters, and third-party liabilities",
    },
    {
      icon: Clock,
      title: "24/7 Claim Support",
      description: "Round-the-clock assistance for claims processing and emergency roadside support",
    },
    {
      icon: Users,
      title: "Cashless Garages",
      description: "Network of 4000+ authorized garages across India for hassle-free repairs",
    },
    {
      icon: CheckCircle,
      title: "Quick Settlement",
      description: "Fast claim processing with minimal documentation and quick settlement",
    },
  ]

  const benefits = [
    "Zero Depreciation Cover",
    "Engine Protection",
    "Return to Invoice",
    "Personal Accident Cover",
    "Roadside Assistance",
    "Key Replacement",
    "Emergency Transportation",
    "Hotel Accommodation",
  ]

  const coverageTypes = [
    {
      type: "Third Party",
      description: "Mandatory coverage for damages to third party",
      price: "Starting ₹2,072/year",
    },
    {
      type: "Comprehensive",
      description: "Complete protection including own damage",
      price: "Starting ₹4,500/year",
    },
    {
      type: "Zero Depreciation",
      description: "No depreciation deduction on claims",
      price: "Starting ₹6,200/year",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <InsuranceHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Insurance in Jharkhand</h1>
              <p className="text-xl mb-6">
                Protect your vehicle with comprehensive car insurance. Get instant quotes, compare plans, and enjoy
                hassle-free claims with 24/7 support.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-white text-blue-600 px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  4.5/5 Rating
                </Badge>
                <Badge className="bg-white text-blue-600 px-3 py-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Trusted by 50,000+
                </Badge>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <InsuranceApplicationForm
                insuranceType="car-insurance"
                insuranceCategory="vehicle"
                title="Get Car Insurance Quote"
                description="Fill your details to get personalized car insurance quotes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Car Insurance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the best car insurance coverage with comprehensive benefits and excellent customer service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Car Insurance Plans</h2>
            <p className="text-gray-600">Choose the right coverage for your vehicle</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coverageTypes.map((coverage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    <Car className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    {coverage.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{coverage.description}</p>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{coverage.price}</div>
                  <Badge className="bg-blue-100 text-blue-800">Popular Choice</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
                <p className="text-gray-600">Enjoy this benefit with our car insurance plan</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
