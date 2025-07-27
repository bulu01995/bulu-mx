"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const response = await fetch("/api/admin/verify-key")
      const data = await response.json()

      if (data.success && data.hasAccess) {
        setHasAccess(true)
      } else {
        router.push("/admin-access")
        return
      }
    } catch (error) {
      console.error("Access check error:", error)
      router.push("/admin-access")
      return
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin-access")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback: clear cookie manually and redirect
      document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      router.push("/admin-access")
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return null // Will redirect to admin-access
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AdminSidebar onLogout={handleLogout} loggingOut={loggingOut} />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>

        <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <LogOut className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <AdminSidebar onLogout={handleLogout} loggingOut={loggingOut} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
