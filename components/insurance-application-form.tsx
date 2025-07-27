"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2, Phone, MapPin, User, Shield } from "lucide-react"
import { createInsuranceLead } from "@/lib/insurance-database"

interface InsuranceApplicationFormProps {
  insuranceType: string
  insuranceCategory: string
  title: string
  description: string
}

const insuranceOptions = [
  { value: "car-insurance", label: "Car Insurance", category: "vehicle" },
  { value: "bike-insurance", label: "Bike Insurance", category: "vehicle" },
  { value: "health-insurance", label: "Health Insurance", category: "health" },
  { value: "term-insurance", label: "Term Insurance", category: "life" },
  { value: "business-insurance", label: "Business Insurance", category: "business" },
  { value: "investment-plans", label: "Investment Plans", category: "investment" },
  { value: "family-health-insurance", label: "Family Health Insurance", category: "health" },
  { value: "guaranteed-return-plans", label: "Guaranteed Return Plans", category: "investment" },
]

const cities = [
  "Ranchi",
  "Jamshedpur",
  "Dhanbad",
  "Bokaro",
  "Deoghar",
  "Phusro",
  "Hazaribagh",
  "Giridih",
  "Ramgarh",
  "Medininagar",
  "Chirkunda",
  "Pakaur",
  "Chaibasa",
  "Dumka",
  "Sahibganj",
  "Mihijam",
  "Lohardaga",
  "Gumla",
  "Simdega",
  "Khunti",
]

export default function InsuranceApplicationForm({
  insuranceType,
  insuranceCategory,
  title,
  description,
}: InsuranceApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    insuranceType: insuranceType || "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      setLoading(false)
      return
    }

    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required")
      setLoading(false)
      return
    }

    if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number")
      setLoading(false)
      return
    }

    if (!formData.city) {
      setError("Please select your city")
      setLoading(false)
      return
    }

    if (!formData.insuranceType) {
      setError("Please select insurance type")
      setLoading(false)
      return
    }

    try {
      const selectedInsurance = insuranceOptions.find((opt) => opt.value === formData.insuranceType)

      await createInsuranceLead({
        full_name: formData.fullName.trim(),
        phone_number: formData.phoneNumber.trim(),
        city: formData.city,
        insurance_type: formData.insuranceType,
        insurance_category: selectedInsurance?.category || insuranceCategory,
        source: "website",
        status: "pending",
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      setError("Failed to submit form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in {insuranceOptions.find((opt) => opt.value === formData.insuranceType)?.label}
            . Our insurance expert will contact you within 24 hours.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Next Steps:</strong>
              <br />• Our expert will call you on {formData.phoneNumber}
              <br />• Get personalized quotes
              <br />• Compare plans and benefits
              <br />• Complete your application
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                className="pl-10"
                maxLength={10}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceType">
              Insurance Type <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <Select
                value={formData.insuranceType}
                onValueChange={(value) => handleSelectChange("insuranceType", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get Free Quote"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to be contacted by our insurance experts.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
