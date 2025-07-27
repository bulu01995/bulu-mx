"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Shield,
  CreditCard,
  HardHat,
  Settings,
  BarChart3,
  LogOut,
  Building2,
} from "lucide-react"

interface AdminSidebarProps {
  onLogout: () => void
  loggingOut: boolean
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Insurance",
    href: "/admin/insurance",
    icon: Shield,
  },
  {
    name: "Loans",
    href: "/admin/loans",
    icon: CreditCard,
  },
  {
    name: "Labour",
    href: "/admin/labour",
    icon: HardHat,
    children: [
      {
        name: "All Labour",
        href: "/admin/labour/all",
      },
      {
        name: "Add Labour",
        href: "/admin/labour/add",
      },
      {
        name: "Applications",
        href: "/admin/labour/applications",
      },
      {
        name: "Edit Labour",
        href: "/admin/labour/edit",
      },
    ],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar({ onLogout, loggingOut }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Bulu Enterprises</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>

              {/* Sub-navigation for Labour */}
              {item.children && isActive && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "block px-3 py-1 text-sm rounded-md transition-colors",
                        pathname === child.href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-3"></div>
              Logging out...
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
