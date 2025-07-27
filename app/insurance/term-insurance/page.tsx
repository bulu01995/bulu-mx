import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Clock, CheckCircle, Star, Phone, Mail, DollarSign } from "lucide-react"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Term Insurance in Jharkhand | Life Insurance Plans | Bulu Enterprises",
  description:
    "Get affordable term life insurance in Jharkhand. High coverage, low premium, tax benefits. Secure your family's financial future with term insurance plans.",
  keywords: "term insurance, life insurance, term life insurance, Jharkhand, Ranchi, life cover, family protection",
}

export default function TermInsurancePage() {
  const features = [
    {
      icon: Shield,
      title: "High Coverage",
      description: "Get life cover up to ₹10 crores at affordable premiums",
    },
    {
      icon: DollarSign,
      title: "Low Premium",
      description: "Maximum coverage at minimum cost with flexible payment options",
    },
    {
      icon: Users,
      title: "Family Protection",
      description: "Secure your family's financial future and lifestyle",
    },
    {
      icon: Clock,
      title: "Quick Settlement",
      description: "Fast claim processing with 99.2% claim settlement ratio",
    },
  ]

  const benefits = [
    "Tax Benefits under 80C & 10(10D)",
    "Accidental Death Benefit",
    "Terminal Illness Benefit",
    "Waiver of Premium",
    "Flexible Premium Payment",
    "Online Policy Management",
    "Free Medical Check-up",
    "Rider Options Available",
  ]

  const plans = [
    {
      name: "Basic Term Plan",
      coverage: "₹25 Lakh - ₹2 Crore",
      premium: "Starting ₹500/month",
      features: ["Pure life cover", "Affordable premium", "Tax benefits"],
    },
    {
      name: "Term with Return",
      coverage: "₹50 Lakh - ₹5 Crore",
      premium: "Starting ₹1,200/month",
      features: ["Life cover + returns", "Maturity benefit", "Premium refund"],
    },
    {
      name: "Family Income Plan",
      coverage: "₹1 Crore - ₹10 Crore",
      premium: "Starting ₹2,000/month",
      features: ["Monthly income", "Lump sum benefit", "Inflation protection"],
    },
  ]

  const ageGroups = [
    { age: "25 years", premium: "₹500", coverage: "₹1 Crore" },
    { age: "30 years", premium: "₹650", coverage: "₹1 Crore" },
    { age: "35 years", premium: "₹850", coverage: "₹1 Crore" },
    { age: "40 years", premium: "₹1,200", coverage: "₹1 Crore" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Term Insurance in Jharkhand</h1>
              <p className="text-xl mb-6">
                Protect your family's financial future with affordable term life insurance. High coverage, low premium,
                and comprehensive benefits.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-white text-purple-600 px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  99.2% Claims Settled
                </Badge>
                <Badge className="bg-white text-purple-600 px-3 py-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Up to ₹10 Crore Cover
                </Badge>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <InsuranceApplicationForm
                insuranceType="term-insurance"
                insuranceCategory="life"
                title="Get Term Insurance Quote"
                description="Fill your details to get personalized term insurance quotes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Term Insurance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Term insurance provides maximum life coverage at minimum cost, ensuring your family's financial security
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Term Insurance Premium by Age</h2>
            <p className="text-gray-600">See how affordable term insurance can be at different ages</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {ageGroups.map((group, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{group.age}</div>
                  <div className="text-lg text-gray-700 mb-2">Coverage: {group.coverage}</div>
                  <div className="text-xl font-semibold text-green-600">{group.premium}/month</div>
                  <p className="text-sm text-gray-500 mt-2">*For non-smoker male</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Term Insurance Plans</h2>
            <p className="text-gray-600">Choose the right term insurance plan for your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-lg font-semibold text-gray-700 mb-2">Coverage: {plan.coverage}</div>
                  <div className="text-2xl font-bold text-purple-600 mb-4">{plan.premium}</div>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Term Insurance Benefits</h2>
              <p className="text-gray-600 mb-6">Get comprehensive life coverage with additional benefits and riders</p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Term Insurance is Important?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Financial Security</h4>
                    <p className="text-gray-600 text-sm">Ensures family's financial stability</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Debt Protection</h4>
                    <p className="text-gray-600 text-sm">Covers loans and liabilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Children's Future</h4>
                    <p className="text-gray-600 text-sm">Secures education and marriage expenses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help with Term Insurance?</h2>
            <p className="text-gray-600 mb-8">
              Our life insurance experts will help you choose the right term insurance plan
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">+91-9142647797</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-gray-700">life@buluenterprises.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
