import { LayoutDashboard, ListChecks, Plus, Settings, ShoppingBag, ShoppingBasket, Users, Shield } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SidebarNavItem } from "@/components/sidebar-nav-item"

interface SidebarProps {
  isSuperAdmin?: boolean
}

export function Sidebar({ isSuperAdmin }: SidebarProps) {
  const navigation = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          title: "Products",
          href: "/admin/products",
          icon: ShoppingBag,
        },
        {
          title: "Categories",
          href: "/admin/categories",
          icon: ShoppingBasket,
        },
        {
          title: "Add New",
          href: "/admin/products/new",
          icon: Plus,
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          title: "All Orders",
          href: "/admin/orders",
          icon: ListChecks,
        },
      ],
    },
    {
      title: "Insurance Leads",
      icon: Shield,
      href: "/admin/insurance",
      items: [
        { title: "All Leads", href: "/admin/insurance" },
        { title: "Car Insurance", href: "/admin/insurance?type=car-insurance" },
        { title: "Bike Insurance", href: "/admin/insurance?type=bike-insurance" },
        { title: "Health Insurance", href: "/admin/insurance?type=health-insurance" },
        { title: "Term Insurance", href: "/admin/insurance?type=term-insurance" },
        { title: "Investment Plans", href: "/admin/insurance?type=investment-plans" },
        { title: "Business Insurance", href: "/admin/insurance?type=business-insurance" },
        { title: "Family Health", href: "/admin/insurance?type=family-health-insurance" },
        { title: "Guaranteed Returns", href: "/admin/insurance?type=guaranteed-return-plans" },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ]

  if (isSuperAdmin) {
    navigation.push({
      title: "Super Admin",
      items: [
        {
          title: "Users",
          href: "/admin/users",
          icon: Users,
        },
      ],
    })
  }

  return (
    <div className="flex flex-col space-y-6 w-full">
      <MainNav className="px-6" />
      <div className="flex-1 space-y-2 px-6">
        {navigation.map((item) => (
          <div key={item.title}>
            <h4 className="mb-1 rounded-md px-2 text-sm font-semibold">{item.title}</h4>
            {item.items?.map((item) => (
              <SidebarNavItem key={item.href} title={item.title} href={item.href} icon={item.icon} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
