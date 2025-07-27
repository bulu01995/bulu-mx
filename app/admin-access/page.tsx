"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, Shield, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminAccessPage() {
  const [accessKey, setAccessKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if key is provided in URL parameters
    const urlKey = searchParams.get("key")
    if (urlKey) {
      setAccessKey(urlKey)
      handleSubmit(null, urlKey)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent | null, keyFromUrl?: string) => {
    if (e) e.preventDefault()

    const keyToUse = keyFromUrl || accessKey

    if (!keyToUse.trim()) {
      setError("Please enter an access key")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/admin/verify-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: keyToUse }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Access granted! Redirecting to admin panel...")
        setTimeout(() => {
          router.push("/admin")
        }, 1500)
      } else {
        setError(data.message || "Invalid access key")
      }
    } catch (error) {
      setError("Failed to verify access key. Please try again.")
      console.error("Access verification error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Access</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your access key to continue to the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="accessKey" className="text-sm font-medium text-gray-700">
                Access Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="accessKey"
                  type="password"
                  placeholder="Enter your access key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Authorized personnel only. All access attempts are logged.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
