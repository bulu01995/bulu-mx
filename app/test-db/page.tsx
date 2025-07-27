"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function TestDatabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [dbInfo, setDbInfo] = useState<any>(null)

  const testConnection = async () => {
    setConnectionStatus("testing")
    setErrorMessage("")
    setDbInfo(null)

    try {
      // Test 1: Basic connection
      const { data, error } = await supabase.from("loan_applications").select("count", { count: "exact" })

      if (error) {
        throw new Error(`Database Error: ${error.message}`)
      }

      // Test 2: Get some basic info
      const { data: tables, error: tablesError } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")

      setDbInfo({
        loanApplicationsCount: data?.[0]?.count || 0,
        tablesAvailable: !tablesError,
      })

      setConnectionStatus("success")
    } catch (error: any) {
      setConnectionStatus("error")
      setErrorMessage(error.message || "Unknown error occurred")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Database Connection Test</CardTitle>
          <p className="text-gray-600 text-center">Test your Supabase database connection</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="text-center">
            {connectionStatus === "idle" && (
              <div className="text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <p>Click the button below to test your database connection</p>
              </div>
            )}

            {connectionStatus === "testing" && (
              <div className="text-blue-600">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                <p>Testing database connection...</p>
              </div>
            )}

            {connectionStatus === "success" && (
              <div className="text-green-600">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">✅ Database Connected Successfully!</h3>
                <p>Your Supabase database is working properly</p>
              </div>
            )}

            {connectionStatus === "error" && (
              <div className="text-red-600">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">❌ Database Connection Failed</h3>
                <p className="text-sm bg-red-50 p-3 rounded-md border border-red-200">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* Database Info */}
          {dbInfo && connectionStatus === "success" && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Database Information:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Loan Applications Count: {dbInfo.loanApplicationsCount}</li>
                <li>• Tables Available: {dbInfo.tablesAvailable ? "Yes" : "No"}</li>
                <li>• Connection Status: Active</li>
              </ul>
            </div>
          )}

          {/* Environment Variables Check */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">Environment Variables:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</li>
              <li>• SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</li>
            </ul>
          </div>

          {/* Test Button */}
          <Button
            onClick={testConnection}
            disabled={connectionStatus === "testing"}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {connectionStatus === "testing" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              "Test Database Connection"
            )}
          </Button>

          {/* Troubleshooting */}
          {connectionStatus === "error" && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Troubleshooting Steps:</h4>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Check your .env.local file has correct Supabase credentials</li>
                <li>Verify your Supabase project is active</li>
                <li>Run the SQL script to create required tables</li>
                <li>Check if your Supabase URL and keys are correct</li>
                <li>Restart your development server</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
