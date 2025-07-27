import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Clock, CheckCircle, Star, Phone, Mail, Building2 } from "lucide-react"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Health Insurance in Jharkhand | Medical Insurance Plans | Bulu Enterprises",
  description:
    "Get comprehensive health insurance coverage in Jharkhand. Family health plans, cashless treatment, pre & post hospitalization coverage. Secure your health today.",
  keywords:
    "health insurance, medical insurance, family health insurance, Jharkhand, Ranchi, hospitalization, cashless treatment",
}

export default function HealthInsurancePage() {
  const features = [
    {
      icon: Building2,
      title: "Cashless Treatment",
      description: "Get treatment at 10,000+ network hospitals without paying upfront",
    },
    {
      icon: Shield,
      title: "Pre & Post Hospitalization",
      description: "Coverage for medical expenses before and after hospitalization",
    },
    {
      icon: Users,
      title: "Family Coverage",
      description: "Protect your entire family under a single comprehensive policy",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support and claim assistance",
    },
  ]

  const benefits = [
    "No Medical Check-up (up to 45 years)",
    "Maternity Coverage",
    "Newborn Baby Coverage",
    "Ambulance Charges",
    "Day Care Procedures",
    "Alternative Treatments (AYUSH)",
    "Mental Health Coverage",
    "Health Check-ups",
  ]

  const plans = [
    {
      name: "Individual Plan",
      coverage: "₹3 Lakh - ₹50 Lakh",
      premium: "Starting ₹4,500/year",
      features: ["Individual coverage", "Cashless treatment", "Pre-post hospitalization"],
    },
    {
      name: "Family Floater",
      coverage: "₹5 Lakh - ₹1 Crore",
      premium: "Starting ₹8,500/year",
      features: ["Entire family covered", "Shared sum insured", "Maternity benefits"],
    },
    {
      name: "Senior Citizen",
      coverage: "₹2 Lakh - ₹25 Lakh",
      premium: "Starting ₹12,000/year",
      features: ["Age up to 80 years", "Pre-existing diseases", "No medical tests"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Insurance in Jharkhand</h1>
              <p className="text-xl mb-6">
                Secure your family's health with comprehensive medical insurance. Cashless treatment, family coverage,
                and extensive hospital network.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-white text-green-600 px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  4.6/5 Rating
                </Badge>
                <Badge className="bg-white text-green-600 px-3 py-1">
                  <Building2 className="h-4 w-4 mr-1" />
                  10,000+ Hospitals
                </Badge>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <InsuranceApplicationForm
                insuranceType="health-insurance"
                insuranceCategory="health"
                title="Get Health Insurance Quote"
                description="Fill your details to get personalized health insurance quotes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Health Insurance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive health coverage with extensive benefits and hassle-free claims
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Insurance Plans</h2>
            <p className="text-gray-600">Choose the right health coverage for you and your family</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-lg font-semibold text-gray-700 mb-2">Coverage: {plan.coverage}</div>
                  <div className="text-2xl font-bold text-green-600 mb-4">{plan.premium}</div>
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Health Benefits</h2>
              <p className="text-gray-600 mb-6">
                Our health insurance plans come with extensive coverage and additional benefits
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
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Insurance Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Tax Benefits</h4>
                    <p className="text-gray-600 text-sm">Save up to ₹1 lakh under Section 80D</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Network Hospitals</h4>
                    <p className="text-gray-600 text-sm">10,000+ hospitals across India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Quick Claims</h4>
                    <p className="text-gray-600 text-sm">Fast claim settlement process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help with Health Insurance?</h2>
            <p className="text-gray-600 mb-8">
              Our health insurance experts are here to help you choose the right plan
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">+91-9142647797</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">health@buluenterprises.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
