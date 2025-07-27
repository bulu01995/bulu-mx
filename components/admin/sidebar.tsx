"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  BarChart3,
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

interface AdminSidebarProps {
  onLogout: () => void
  loggingOut: boolean
}

export function AdminSidebar({ onLogout, loggingOut }: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const isItemExpanded = (itemName: string) => expandedItems.includes(itemName)

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900">BULU</span>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
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
            onClick={onLogout}
            disabled={loggingOut}
            className="text-gray-500 hover:text-red-600"
            title="Logout"
          >
            {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
