import type { Metadata } from "next"
import { ArrowRight, Heart, Users, Shield, Hospital, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Family Health Insurance - Complete Family Coverage | Bulu Enterprises",
  description:
    "Comprehensive family health insurance plans. Cover up to 6 family members with cashless treatment at 10,000+ hospitals nationwide.",
}

export default function FamilyHealthInsurancePage() {
  const coverageFeatures = [
    "Cashless treatment at 10,000+ hospitals",
    "Pre and post hospitalization expenses",
    "Day care procedures coverage",
    "Ambulance charges included",
    "Annual health check-ups",
    "Maternity and newborn coverage",
    "Mental health treatment",
    "Alternative treatment (AYUSH)",
  ]

  const familyBenefits = [
    {
      icon: Users,
      title: "Family Floater",
      description: "Cover up to 6 family members under single policy",
    },
    {
      icon: Hospital,
      title: "Cashless Treatment",
      description: "No advance payment at network hospitals",
    },
    {
      icon: Heart,
      title: "Preventive Care",
      description: "Annual health check-ups and vaccinations",
    },
    {
      icon: Shield,
      title: "No Claim Bonus",
      description: "Increase sum insured by 50% for claim-free years",
    },
  ]

  const sumInsuredOptions = [
    {
      amount: "₹3 Lakhs",
      premium: "₹8,500/year",
      popular: false,
    },
    {
      amount: "₹5 Lakhs",
      premium: "₹12,000/year",
      popular: true,
    },
    {
      amount: "₹10 Lakhs",
      premium: "₹18,500/year",
      popular: false,
    },
    {
      amount: "₹25 Lakhs",
      premium: "₹28,000/year",
      popular: false,
    },
  ]

  const ageGroups = [
    { group: "0-35 years", discount: "25% Off" },
    { group: "36-45 years", discount: "20% Off" },
    { group: "46-60 years", discount: "15% Off" },
    { group: "60+ years", discount: "10% Off" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Family Health Insurance</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Complete healthcare protection for your entire family</p>
            <div className="bg-white/20 rounded-lg p-4 mb-8 inline-block">
              <p className="text-lg font-semibold">🎉 Special Offer: Up to 25% Off on Family Plans</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                Get Family Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
              >
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Family Coverage</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">What's Covered</h3>
                <ul className="space-y-3">
                  {coverageFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6">Family Benefits</h3>
                <div className="grid gap-6">
                  {familyBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <benefit.icon className="h-8 w-8 text-pink-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-lg mb-1">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sum Insured Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Coverage Amount</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sumInsuredOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-shadow relative ${
                    option.popular ? "ring-2 ring-pink-500" : ""
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-pink-600">{option.amount}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-lg font-semibold mb-4">{option.premium}</div>
                    <div className="text-sm text-gray-600 mb-6">For family of 4 members</div>
                    <Button className={`w-full ${option.popular ? "bg-pink-600 hover:bg-pink-700" : ""}`}>
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Age-based Discounts */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Age-based Discounts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageGroups.map((age, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-lg font-semibold mb-2">{age.group}</div>
                    <div className="text-2xl font-bold text-pink-600">{age.discount}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Family Health Insurance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Family Health Insurance?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Single Policy</h3>
                <p className="text-gray-600">
                  Cover entire family under one comprehensive policy with shared sum insured.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
                <p className="text-gray-600">
                  Annual health check-ups and preventive care benefits for all family members.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lifetime Renewability</h3>
                <p className="text-gray-600">Guaranteed renewal for life with no age limit restrictions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protect Your Family Today</h2>
            <p className="text-gray-600">
              Get a personalized family health insurance quote and secure your family's health.
            </p>
          </div>
          <InsuranceApplicationForm
            insuranceType="family-health-insurance"
            title="Family Health Insurance Quote"
            description="Get comprehensive family health coverage"
          />
        </div>
      </section>
    </div>
  )
}
