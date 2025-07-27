"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { jharkhandCities } from "@/lib/jharkhand-cities"
import { createLoanApplication } from "@/lib/database"

interface LoanApplicationFormProps {
  loanType: string
}

export default function LoanApplicationForm({ loanType }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    loanType: loanType, // Auto-filled based on page
    state: "Jharkhand",
    city: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()

  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to proceed.")
      return
    }

    setIsSubmitting(true)

    try {
      await createLoanApplication({
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        loan_type: formData.loanType,
        state: formData.state,
        city: formData.city,
      })

      setIsSubmitted(true)

      // Redirect to homepage after 10 seconds
      setTimeout(() => {
        router.push("/")
      }, 10000)
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-green-800 mb-4">Application Submitted Successfully!</h3>
            <p className="text-green-700 text-xl mb-6">
              Thank you for your interest in {loanType}. Our team will contact you within 24 hours.
            </p>
            <div className="text-lg text-green-600">Redirecting to homepage in 10 seconds...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16 w-full">
      <div className="w-full px-6">
        {/* Form Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
            Unlock Best {loanType} Offers From Bulu Enterprises
          </h2>
        </div>

        {/* Form Container - Full Width */}
        <div className="w-full max-w-none">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Fields in One Row - 5 Fields */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Full Name */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">👤</div>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Full Name *"
                  required
                  className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md bg-white shadow-sm"
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">📱</div>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Phone Number *"
                  required
                  className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md bg-white shadow-sm"
                />
              </div>

              {/* Loan Type - Auto Selected */}
              <div className="relative">
                <Input
                  type="text"
                  value={formData.loanType}
                  readOnly
                  className="h-12 text-base border-gray-300 bg-gray-100 text-gray-600 rounded-md shadow-sm cursor-not-allowed"
                />
              </div>

              {/* State Dropdown */}
              <div className="relative">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full h-12 px-4 text-base text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm appearance-none"
                  required
                >
                  <option value="Jharkhand">Jharkhand *</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* City Dropdown */}
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full h-12 px-4 text-base text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm appearance-none"
                  required
                >
                  <option value="">Choose City *</option>
                  {jharkhandCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 max-w-4xl mx-auto">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I hereby appoint Bulu Enterprises as my authorised representative to receive my credit information from
                CIBIL. I hereby accept{" "}
                <span className="text-blue-600 underline cursor-pointer">terms & conditions</span>.{" "}
                <span className="text-blue-600 underline cursor-pointer">Read More</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || !acceptTerms}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Get Quotes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
