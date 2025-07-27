import type { Metadata } from "next"
import { ArrowRight, TrendingUp, Shield, Gift, Calculator, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Guaranteed Return Plans - Assured Maturity Benefits | Bulu Enterprises",
  description:
    "Guaranteed return investment plans with assured maturity benefits. Secure your future with guaranteed returns and life insurance coverage.",
}

export default function GuaranteedReturnPlansPage() {
  const planFeatures = [
    "Guaranteed maturity benefits",
    "Life insurance coverage included",
    "Tax benefits under Section 80C",
    "Flexible premium payment options",
    "Bonus additions on maturity",
    "Loan facility against policy",
    "Surrender value after 3 years",
    "Accidental death benefit",
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Guaranteed Returns",
      description: "Assured maturity amount with guaranteed additions",
    },
    {
      icon: Shield,
      title: "Life Protection",
      description: "Life insurance coverage throughout the policy term",
    },
    {
      icon: Gift,
      title: "Bonus Benefits",
      description: "Additional bonuses based on company performance",
    },
    {
      icon: Calculator,
      title: "Tax Savings",
      description: "Tax deduction on premiums and tax-free maturity",
    },
  ]

  const planOptions = [
    {
      name: "Assured Income Plan",
      tenure: "10-20 years",
      returns: "6-7% p.a.",
      features: ["Monthly income option", "Guaranteed maturity", "Life cover"],
    },
    {
      name: "Endowment Plan",
      tenure: "15-25 years",
      returns: "5-6% p.a.",
      features: ["Lump sum maturity", "Bonus additions", "Loan facility"],
    },
    {
      name: "Money Back Plan",
      tenure: "20-25 years",
      returns: "4-5% p.a.",
      features: ["Periodic payouts", "Survival benefits", "Maturity benefit"],
    },
  ]

  const maturityExamples = [
    {
      premium: "₹10,000/month",
      tenure: "15 years",
      maturity: "₹25 lakhs",
      returns: "6.2% p.a.",
    },
    {
      premium: "₹15,000/month",
      tenure: "20 years",
      maturity: "₹50 lakhs",
      returns: "6.5% p.a.",
    },
    {
      premium: "₹25,000/month",
      tenure: "25 years",
      maturity: "₹1 crore",
      returns: "6.8% p.a.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Guaranteed Return Plans</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Assured maturity benefits with life insurance protection
            </p>
            <div className="bg-white/20 rounded-lg p-4 mb-8 inline-block">
              <p className="text-lg font-semibold">✨ Guaranteed Returns up to 6.8% per annum</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Guaranteed Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Calculate Returns
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Guaranteed Return Plans?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Plan Features</h3>
                <ul className="space-y-3">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6">Key Benefits</h3>
                <div className="grid gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <benefit.icon className="h-8 w-8 text-purple-600 mr-4 mt-1 flex-shrink-0" />
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

      {/* Plan Options Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Guaranteed Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {planOptions.map((plan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-center text-xl">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{plan.returns}</div>
                      <div className="text-sm text-gray-600">Guaranteed Returns</div>
                      <div className="text-lg font-medium mt-2">{plan.tenure}</div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Award className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Select Plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Maturity Examples Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Maturity Benefit Examples</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {maturityExamples.map((example, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-lg font-semibold mb-2">Premium: {example.premium}</div>
                    <div className="text-sm text-gray-600 mb-4">For {example.tenure}</div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{example.maturity}</div>
                    <div className="text-sm text-gray-600 mb-4">Maturity Amount</div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {example.returns} Returns
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">*Returns are indicative and may vary based on bonus declarations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Guaranteed Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Guaranteed Return Plans?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Assured Returns</h3>
                <p className="text-gray-600">Guaranteed maturity amount with no market risk or uncertainty.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Life Protection</h3>
                <p className="text-gray-600">Comprehensive life insurance coverage throughout the policy term.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tax Benefits</h3>
                <p className="text-gray-600">Tax deduction on premiums and tax-free maturity proceeds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Secure Your Future Today</h2>
            <p className="text-gray-600">
              Get a personalized guaranteed return plan quote and start building your secure financial future.
            </p>
          </div>
          <InsuranceApplicationForm
            insuranceType="guaranteed-return-plans"
            title="Guaranteed Return Plan Quote"
            description="Get assured returns with life protection"
          />
        </div>
      </section>
    </div>
  )
}
