"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Shield, Eye, EyeOff, Loader2 } from "lucide-react"

export default function AdminAccessPage() {
  const [key, setKey] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if key is provided in URL params
    const urlKey = searchParams.get("key")
    if (urlKey) {
      setKey(urlKey)
      // Auto-verify if key is in URL
      verifyKey(urlKey)
    }
  }, [searchParams])

  const verifyKey = async (accessKey?: string) => {
    const keyToVerify = accessKey || key
    if (!keyToVerify.trim()) {
      setError("Please enter an access key")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/verify-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: keyToVerify }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Small delay to show success state
        setTimeout(() => {
          router.push("/admin")
          router.refresh()
        }, 500)
      } else {
        setError(data.error || "Invalid access key. Please contact the administrator.")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    verifyKey()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Access</CardTitle>
          <CardDescription>Enter your access key to continue to the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="access-key" className="text-sm font-medium text-gray-700">
                Access Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="access-key"
                  type={showKey ? "text" : "password"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter admin access key"
                  className="pl-10 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading || !key.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">This is a secure area. Unauthorized access is prohibited.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
