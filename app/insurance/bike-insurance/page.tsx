import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Bike, Users, Clock, CheckCircle, Star, Phone, Mail, Wrench } from "lucide-react"
import InsuranceApplicationForm from "@/components/insurance-application-form"
import InsuranceHeader from "../components/insurance-header"

export const metadata: Metadata = {
  title: "Bike Insurance in Jharkhand | Two Wheeler Insurance | Bulu Enterprises",
  description:
    "Get comprehensive bike insurance in Jharkhand. Two wheeler insurance with cashless claims, roadside assistance, and theft protection. Secure your bike today.",
  keywords: "bike insurance, two wheeler insurance, motorcycle insurance, Jharkhand, Ranchi, vehicle insurance",
}

export default function BikeInsurancePage() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Coverage",
      description: "Complete protection against accidents, theft, and natural disasters",
    },
    {
      icon: Wrench,
      title: "Roadside Assistance",
      description: "24/7 emergency support and on-spot repairs anywhere in India",
    },
    {
      icon: Users,
      title: "Cashless Claims",
      description: "Network of 2000+ authorized garages for hassle-free repairs",
    },
    {
      icon: Clock,
      title: "Quick Settlement",
      description: "Fast claim processing with minimal documentation",
    },
  ]

  const benefits = [
    "Zero Depreciation Cover",
    "Engine Protection",
    "Personal Accident Cover",
    "Pillion Rider Cover",
    "Key Replacement",
    "Emergency Transportation",
    "Consumables Cover",
    "Return to Invoice",
  ]

  const coverageTypes = [
    {
      type: "Third Party",
      description: "Mandatory coverage as per Motor Vehicle Act",
      price: "Starting ₹538/year",
    },
    {
      type: "Comprehensive",
      description: "Complete protection including own damage",
      price: "Starting ₹1,500/year",
    },
    {
      type: "Zero Depreciation",
      description: "No depreciation deduction on claims",
      price: "Starting ₹2,200/year",
    },
  ]

  const bikeTypes = [
    { type: "Scooter", cc: "Up to 150cc", premium: "₹1,200/year" },
    { type: "Commuter Bike", cc: "150cc - 250cc", premium: "₹1,800/year" },
    { type: "Sports Bike", cc: "250cc - 500cc", premium: "₹3,500/year" },
    { type: "Cruiser", cc: "500cc+", premium: "₹5,000/year" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Bike Insurance in Jharkhand</h1>
              <p className="text-xl mb-6">
                Protect your two-wheeler with comprehensive bike insurance. Get instant quotes, cashless claims, and
                24/7 roadside assistance.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-white text-orange-600 px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  4.4/5 Rating
                </Badge>
                <Badge className="bg-white text-orange-600 px-3 py-1">
                  <Bike className="h-4 w-4 mr-1" />
                  2000+ Garages
                </Badge>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <InsuranceApplicationForm
                insuranceType="bike-insurance"
                insuranceCategory="vehicle"
                title="Get Bike Insurance Quote"
                description="Fill your details to get personalized bike insurance quotes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Bike Insurance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the best two-wheeler insurance with comprehensive coverage and excellent service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium by Bike Type */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bike Insurance Premium by Type</h2>
            <p className="text-gray-600">See premium rates for different types of two-wheelers</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {bikeTypes.map((bike, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Bike className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{bike.type}</h3>
                  <p className="text-gray-600 mb-2">{bike.cc}</p>
                  <div className="text-xl font-bold text-orange-600">{bike.premium}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bike Insurance Plans</h2>
            <p className="text-gray-600">Choose the right coverage for your two-wheeler</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coverageTypes.map((coverage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    {coverage.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{coverage.description}</p>
                  <div className="text-2xl font-bold text-orange-600 mb-4">{coverage.price}</div>
                  <Badge className="bg-orange-100 text-orange-800">{index === 1 ? "Most Popular" : "Available"}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Benefits & Add-ons</h2>
              <p className="text-gray-600 mb-6">
                Enhance your bike insurance with these valuable add-ons for complete protection
              </p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bike Insurance is Mandatory</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-orange-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Legal Requirement</h4>
                    <p className="text-gray-600 text-sm">Third party insurance is mandatory by law</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Wrench className="h-6 w-6 text-orange-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Financial Protection</h4>
                    <p className="text-gray-600 text-sm">Covers repair costs and liabilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-orange-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Personal Safety</h4>
                    <p className="text-gray-600 text-sm">Personal accident cover for rider</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What is covered under comprehensive bike insurance?</h3>
                <p className="text-gray-600">
                  Comprehensive bike insurance covers damages to your own vehicle due to accidents, theft, fire, natural
                  disasters, and third-party liabilities including bodily injury and property damage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is bike insurance mandatory in India?</h3>
                <p className="text-gray-600">
                  Yes, third-party bike insurance is mandatory as per the Motor Vehicle Act. Riding without insurance
                  can result in fines and legal consequences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What documents are required for bike insurance?</h3>
                <p className="text-gray-600">
                  You need RC (Registration Certificate), driving license, previous policy copy (for renewal), and
                  identity proof. Additional documents may be required for claims.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help with Bike Insurance?</h2>
            <p className="text-gray-600 mb-8">
              Our two-wheeler insurance experts are here to help you find the perfect plan
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-gray-700">+91-9142647797</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-gray-700">bike@buluenterprises.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
