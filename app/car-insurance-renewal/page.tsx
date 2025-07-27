"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Clock, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function CarInsuranceRenewalPage() {
  const [policyNumber, setPolicyNumber] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [insurer, setInsurer] = useState("")

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Quick Renewal",
      description: "Renew your car insurance in just 2 minutes online",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "No Claim Bonus",
      description: "Retain your NCB discount up to 50% on renewal",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
      title: "Instant Policy",
      description: "Get your renewed policy document instantly",
    },
  ]

  const steps = [
    "Enter your car registration number or existing policy details",
    "Compare quotes from top insurance companies",
    "Choose the best plan with required add-ons",
    "Make payment and get instant policy document",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Car Insurance Renewal</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Renew your car insurance online in minutes. Compare quotes, retain your NCB, and get instant policy
            issuance.
          </p>
        </div>

        {/* Renewal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-6 w-6 mr-2 text-blue-600" />
                Renew Your Car Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="registrationNumber">Car Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Enter your car registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>

              <div className="text-center text-gray-500">OR</div>

              <div>
                <Label htmlFor="policyNumber">Existing Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="Enter your current policy number"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="insurer">Current Insurance Company</Label>
                <Select value={insurer} onValueChange={setInsurer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current insurer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="icici">ICICI Lombard</SelectItem>
                    <SelectItem value="hdfc">HDFC ERGO</SelectItem>
                    <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
                    <SelectItem value="tata">Tata AIG</SelectItem>
                    <SelectItem value="reliance">Reliance General</SelectItem>
                    <SelectItem value="oriental">Oriental Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Renewal Quotes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Renew Online?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {benefit.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Renewal Process */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>How Car Insurance Renewal Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mx-auto mb-3">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Renewal Guidelines</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Renew your policy before expiry to avoid losing NCB discount</li>
                  <li>• Grace period of 30 days available but NCB may be affected</li>
                  <li>• Compare quotes from multiple insurers for best rates</li>
                  <li>• Update your contact details and vehicle information</li>
                  <li>• Consider adding useful add-ons like Zero Depreciation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
