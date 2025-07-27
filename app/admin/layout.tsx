"use client"
import { useState, useEffect } from "react"
import type React from "react"
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Menu,
  X,
  BarChart3,
  Bell,
  Search,
  Activity,
  HardHat,
  UserPlus,
  Edit,
  TrendingUp,
  Plus,
  History,
  Key,
  ChevronDown,
  ChevronRight,
  LogOut,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense } from "react"

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    badge: "new",
  },
  {
    name: "Loans",
    href: "/admin/loans",
    icon: FileText,
    badge: "5",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Insurance",
    href: "/admin/insurance",
    icon: Shield,
    badge: null,
  },
  {
    name: "Labour",
    icon: HardHat,
    badge: "3",
    isExpandable: true,
    subItems: [
      {
        name: "All Labourers",
        href: "/admin/labour/all",
        icon: HardHat,
        description: "View all registered labourers",
      },
      {
        name: "Labour Applications",
        href: "/admin/labour/applications",
        icon: UserPlus,
        badge: "3",
        description: "Pending registration requests",
      },
      {
        name: "Edit Labour Info",
        href: "/admin/labour/edit",
        icon: Edit,
        description: "Update labour profiles",
      },
      {
        name: "Labour Performance",
        href: "/admin/labour/performance",
        icon: TrendingUp,
        description: "View work stats & ratings",
      },
      {
        name: "Add Labour",
        href: "/admin/labour/add",
        icon: Plus,
        description: "Manually add new labour",
      },
      {
        name: "Labour History",
        href: "/admin/labour/history",
        icon: History,
        description: "Timeline view of work history",
      },
      {
        name: "Labour Access",
        href: "/admin/labour/access",
        icon: Key,
        description: "Manage login & permissions",
      },
    ],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      console.log("Checking admin access...")

      const response = await fetch("/api/admin/verify-key", {
        method: "GET",
        credentials: "include",
      })

      console.log("Access check response status:", response.status)
      const data = await response.json()
      console.log("Access check data:", data)

      if (data.success && data.hasAccess) {
        console.log("Access granted, showing admin panel")
        setHasAccess(true)
      } else {
        console.log("No access, redirecting to admin-access")
        setHasAccess(false)
        window.location.href = "/admin-access"
        return
      }
    } catch (error) {
      console.error("Access check error:", error)
      setHasAccess(false)
      window.location.href = "/admin-access"
      return
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      console.log("Logging out...")

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        console.log("Logout successful")
        window.location.href = "/admin-access"
      } else {
        console.error("Logout failed")
        // Fallback: clear cookie manually and redirect
        document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.href = "/admin-access"
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback: clear cookie manually and redirect
      document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      window.location.href = "/admin-access"
    } finally {
      setLoggingOut(false)
    }
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const isItemExpanded = (itemName: string) => expandedItems.includes(itemName)

  // Show loading state while checking access
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Don't render admin layout if no access
  if (!hasAccess) {
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:flex lg:flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="flex h-full flex-col bg-white border-r border-gray-200 shadow-sm">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">BULU</span>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.subItems && item.subItems.some((sub) => pathname === sub.href))
                const isExpanded = isItemExpanded(item.name)

                return (
                  <div key={item.name}>
                    {/* Main menu item */}
                    {item.isExpandable ? (
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <Badge variant={item.badge === "new" ? "default" : "secondary"} className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`
                          flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <Badge variant={item.badge === "new" ? "default" : "secondary"} className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )}

                    {/* Sub-menu items */}
                    {item.isExpandable && isExpanded && item.subItems && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`
                                flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors group
                                ${
                                  isSubActive
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }
                              `}
                              title={subItem.description}
                            >
                              <div className="flex items-center space-x-3">
                                <subItem.icon className="h-4 w-4" />
                                <span className="text-xs">{subItem.name}</span>
                              </div>
                              {subItem.badge && (
                                <Badge variant="destructive" className="text-xs scale-75">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 p-3 rounded-md bg-gray-50">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@bulu.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-gray-500 hover:text-red-600"
                  title="Logout"
                >
                  {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search..." className="pl-10 w-80 bg-gray-50 border-gray-200" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-green-50 border border-green-200">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Online</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-gray-600 hover:text-red-600 border-gray-300 bg-transparent"
                >
                  {loggingOut ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LogOut className="h-4 w-4 mr-2" />}
                  {loggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </Suspense>
  )
}
