"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { resetPassword, verifyResetToken } from "@/lib/password-reset"
import { isValidPassword } from "@/lib/validation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState(5)

  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.")
      setTokenValid(false)
      return
    }

    // Verify token on component mount
    const checkToken = async () => {
      const { valid, error: verifyError } = await verifyResetToken(token)
      if (!valid) {
        setError(verifyError || "Invalid or expired reset token")
        setTokenValid(false)
      } else {
        setTokenValid(true)
      }
    }

    checkToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("Invalid reset token")
      return
    }

    // Validation
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const passwordValidation = isValidPassword(password)
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0])
      return
    }

    setIsLoading(true)

    try {
      const { success, error: resetError } = await resetPassword(token, password)

      if (!success) {
        setError(resetError || "Failed to reset password")
        setIsLoading(false)
        return
      }

      // Show success modal and start countdown
      setShowSuccessModal(true)
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            router.push("/login")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Request New Reset Link
            </Button>
            <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    )
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create a new password</h1>
                <h2 className="text-xl text-gray-700 mb-6">Choose a strong password for your account</h2>
                <div className="w-12 h-1 bg-orange-400 rounded"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Use at least 8 characters with mixed case letters</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Include numbers and special characters</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Avoid using personal information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Password Section */}
        <div className="flex-1 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col justify-center px-8 lg:px-16">
          <div className="max-w-md mx-auto w-full">
            {/* Reset Password Illustration */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Password Form */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">New Password</h1>
              <p className="text-blue-200 text-sm uppercase tracking-wide">CREATE A SECURE PASSWORD</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {/* Password Input */}
              <div className="relative">
                <div className="flex">
                  <div className="flex items-center px-3 bg-white border border-r-0 rounded-l-lg">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 rounded-none border-l-0 border-r-0 bg-white text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center px-3 bg-white border border-l-0 rounded-r-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="flex">
                  <div className="flex items-center px-3 bg-white border border-r-0 rounded-l-lg">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 rounded-none border-l-0 border-r-0 bg-white text-gray-900 placeholder:text-gray-500"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex items-center px-3 bg-white border border-l-0 rounded-r-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
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
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Update Password
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
            <DialogTitle className="text-center text-xl font-bold text-gray-900">Password Updated! 🎉</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your password has been successfully updated. You can now log in with your new password.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Redirecting to login page in <span className="font-bold text-blue-600">{countdown}</span> seconds...
              </p>
            </div>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Go to Login Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
