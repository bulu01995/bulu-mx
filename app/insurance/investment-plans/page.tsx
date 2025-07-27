import type { Metadata } from "next"
import { ArrowRight, TrendingUp, Shield, Calculator, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Investment Plans - Grow Your Wealth | Bulu Enterprises",
  description:
    "Secure your financial future with our investment plans. Market-linked returns, tax benefits, and guaranteed growth options available.",
}

export default function InvestmentPlansPage() {
  const features = [
    "Market-linked returns with potential for high growth",
    "Tax benefits under Section 80C",
    "Flexible premium payment options",
    "Life insurance coverage included",
    "Partial withdrawal facility available",
    "Professional fund management",
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "High Growth Potential",
      description: "Invest in equity and debt funds for optimal returns",
    },
    {
      icon: Shield,
      title: "Life Coverage",
      description: "Get life insurance protection along with investment",
    },
    {
      icon: Calculator,
      title: "Tax Savings",
      description: "Save up to ₹46,800 in taxes annually under 80C",
    },
    {
      icon: Award,
      title: "Flexible Options",
      description: "Choose from various fund options and premium modes",
    },
  ]

  const planTypes = [
    {
      name: "Equity Linked Plans",
      returns: "12-15% p.a.",
      risk: "High",
      tenure: "10-20 years",
    },
    {
      name: "Balanced Plans",
      returns: "8-12% p.a.",
      risk: "Moderate",
      tenure: "5-15 years",
    },
    {
      name: "Debt Plans",
      returns: "6-8% p.a.",
      risk: "Low",
      tenure: "3-10 years",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Investment Plans</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Grow your wealth with market-linked returns and tax benefits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Get Quote Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Investment Plans?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <benefit.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Investment Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {planTypes.map((plan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-green-600 mb-2">{plan.returns}</div>
                      <div className="text-sm text-gray-600">Expected Returns</div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <span
                          className={`font-medium ${
                            plan.risk === "High"
                              ? "text-red-600"
                              : plan.risk === "Moderate"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {plan.risk}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tenure:</span>
                        <span className="font-medium">{plan.tenure}</span>
                      </div>
                    </div>
                    <Button className="w-full">Select Plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Investment Journey</h2>
            <p className="text-gray-600">
              Fill out the form below and our investment experts will help you choose the best plan for your financial
              goals.
            </p>
          </div>
          <InsuranceApplicationForm
            insuranceType="investment-plans"
            title="Investment Plan Application"
            description="Get personalized investment recommendations"
          />
        </div>
      </section>
    </div>
  )
}
