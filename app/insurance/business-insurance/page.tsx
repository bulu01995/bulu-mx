import type { Metadata } from "next"
import { ArrowRight, Building, Shield, Users, Zap, CheckCircle, Badge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import InsuranceApplicationForm from "@/components/insurance-application-form"

export const metadata: Metadata = {
  title: "Business Insurance - Protect Your Business | Bulu Enterprises",
  description:
    "Comprehensive business insurance solutions. Protect your business assets, employees, and operations with our tailored insurance plans.",
}

export default function BusinessInsurancePage() {
  const coverageTypes = [
    "Property and Asset Protection",
    "Public Liability Coverage",
    "Professional Indemnity Insurance",
    "Employee Compensation Coverage",
    "Business Interruption Insurance",
    "Cyber Liability Protection",
    "Directors & Officers Insurance",
    "Product Liability Coverage",
  ]

  const benefits = [
    {
      icon: Building,
      title: "Asset Protection",
      description: "Comprehensive coverage for your business property and equipment",
    },
    {
      icon: Users,
      title: "Employee Safety",
      description: "Worker compensation and group health insurance for employees",
    },
    {
      icon: Shield,
      title: "Liability Coverage",
      description: "Protection against third-party claims and legal expenses",
    },
    {
      icon: Zap,
      title: "Business Continuity",
      description: "Coverage for business interruption and loss of income",
    },
  ]

  const industries = [
    "Manufacturing & Production",
    "Retail & E-commerce",
    "Healthcare & Medical",
    "IT & Technology",
    "Construction & Real Estate",
    "Hospitality & Tourism",
    "Financial Services",
    "Education & Training",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-4xl md:text-6xl font-bold">Business Insurance</h1>
              <Badge className="ml-4 bg-orange-500 text-white px-3 py-1 text-sm font-bold">NEW</Badge>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Comprehensive protection for your business operations and assets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Business Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Business Coverage</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">What's Covered</h3>
                <ul className="space-y-3">
                  {coverageTypes.map((coverage, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{coverage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6">Key Benefits</h3>
                <div className="grid gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <benefit.icon className="h-8 w-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
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

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium">{industry}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Our Business Insurance?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tailored Coverage</h3>
                <p className="text-gray-600">
                  Customized insurance solutions based on your business needs and industry requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Dedicated business insurance experts to guide you through claims and policy management.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Claims</h3>
                <p className="text-gray-600">Fast and hassle-free claims processing to minimize business disruption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Protect Your Business Today</h2>
            <p className="text-gray-600">
              Get a customized business insurance quote tailored to your industry and business size.
            </p>
          </div>
          <InsuranceApplicationForm
            insuranceType="business-insurance"
            title="Business Insurance Quote"
            description="Get comprehensive business protection"
          />
        </div>
      </section>
    </div>
  )
}
