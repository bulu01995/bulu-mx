"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, User, FileText, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { signIn } from "@/lib/auth"
import { createSession } from "@/lib/session"
import { isValidEmail } from "@/lib/validation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      // Sign in user
      const { user, error: signInError } = await signIn({ email, password })

      if (signInError || !user) {
        setError(signInError || "Login failed")
        setIsLoading(false)
        return
      }

      // Create session
      const { error: sessionError } = await createSession(user.id)
      if (sessionError) {
        setError("Failed to create session")
        setIsLoading(false)
        return
      }

      // Success - redirect to dashboard
      router.push("/")
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Implement Google Sign-in logic here
    setError("Google Sign-in will be implemented soon")
  }

  return (
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
            <Image src="/images/bulu-logo.png" alt="BULU ENTERPRISES" width={200} height={60} className="h-12 w-auto" />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Take control of the service</h1>
              <h2 className="text-xl text-gray-700 mb-6">Experience during your loan journey</h2>
              <div className="w-12 h-1 bg-orange-400 rounded"></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Provide more information about your loan requirements</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">Rate your Experience with us and give feedback</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">View assigned agent's profile & request for change if required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Login Illustration */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Log in</h1>
            <p className="text-blue-200 text-sm uppercase tracking-wide">TO ACCESS YOUR ACCOUNT</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-l-none border-l-0 bg-white text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex">
                <div className="flex items-center px-3 bg-white border border-r-0 rounded-l-lg">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-900 hover:bg-gray-100 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-blue-700" />
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-blue-900 px-4 text-blue-200 text-sm">or</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-white border-white text-gray-900 hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </div>
            </Button>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <p className="text-blue-200 text-sm">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-white hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <p className="text-blue-200 text-sm">
                <Link href="/forgot-password" className="hover:underline">
                  Forgot your password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
