"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { requestPasswordReset } from "@/lib/password-reset"
import { isValidEmail } from "@/lib/validation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const { success, error: resetError } = await requestPasswordReset(email)

      if (!success && resetError) {
        setError(resetError)
        setIsLoading(false)
        return
      }

      // Show success modal
      setShowSuccessModal(true)
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Side - Information Section */}
        <div className="flex-1 bg-gray-50 flex flex-col justify-center px-8 lg:px-16 relative overflow-hidden">
          {/* Background Illustration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 right-0 h-64">
              <svg viewBox="0 0 800 200" className="w-full h-full">
                {/* City skyline illustration */}
                <rect x="50" y="120" width="40" height="80" fill="#e5e7eb" />
                <rect x="100" y="100" width="35" height="100" fill="#d1d5db" />
                <rect x="145" y="110" width="30" height="90" fill="#e5e7eb" />
                <rect x="185" y="90" width="45" height="110" fill="#d1d5db" />
                <rect x="240" y="105" width="35" height="95" fill="#e5e7eb" />
                <rect x="285" y="85" width="40" height="115" fill="#d1d5db" />
                <rect x="335" y="95" width="30" height="105" fill="#e5e7eb" />
                <rect x="375" y="110" width="35" height="90" fill="#d1d5db" />
                <rect x="420" y="100" width="40" height="100" fill="#e5e7eb" />
                <rect x="470" y="115" width="30" height="85" fill="#d1d5db" />
                <rect x="510" y="105" width="35" height="95" fill="#e5e7eb" />
                <rect x="555" y="90" width="40" height="110" fill="#d1d5db" />
                <rect x="605" y="120" width="30" height="80" fill="#e5e7eb" />
                <rect x="645" y="100" width="35" height="100" fill="#d1d5db" />
                <rect x="690" y="110" width="40" height="90" fill="#e5e7eb" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            {/* Logo */}
            <div className="mb-12">
              <Image
                src="/images/bulu-logo.png"
                alt="BULU ENTERPRISES"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Forgot your password?</h1>
                <h2 className="text-xl text-gray-700 mb-6">No worries, we'll help you reset it</h2>
                <div className="w-12 h-1 bg-orange-400 rounded"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Enter your email address to receive reset instructions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Check your inbox for the password reset link</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Create a new secure password for your account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Section */}
        <div className="flex-1 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col justify-center px-8 lg:px-16">
          <div className="max-w-md mx-auto w-full">
            {/* Forgot Password Illustration */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Forgot Password Form */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-blue-200 text-sm uppercase tracking-wide">ENTER YOUR EMAIL ADDRESS</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="relative">
                <div className="flex">
                  <div className="flex items-center px-3 bg-white border border-r-0 rounded-l-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-l-none border-l-0 bg-white text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-blue-900 hover:bg-gray-100 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Send Reset Link
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                )}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-blue-200 hover:text-white text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">Reset Link Sent! 📧</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              If an account with that email exists, we've sent you a password reset link. Please check your inbox and
              follow the instructions.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Didn't receive the email?</strong>
                <br />
                Check your spam folder or try again in a few minutes.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowSuccessModal(false)} variant="outline" className="flex-1">
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = "/login")}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
