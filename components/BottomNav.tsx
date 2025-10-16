"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Menu as MenuIcon, Percent, ShoppingBag, User } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Home", href: "/", icon: Home },
  { name: "Menu", href: "/menu", icon: MenuIcon },
  { name: "Deals", href: "/deals", icon: Percent },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Profile", href: "/profile", icon: User },
] as const

export function BottomNav() {
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
<nav className={cn(
  "fixed z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border",
  isDesktop 
    ? "top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-max rounded-2xl border" 
    : "bottom-0 left-0 right-0 border-t h-16"
)}>
      <div className={cn(
        "flex items-center h-full",
        isDesktop ? "justify-start px-2 gap-6" : "h-full justify-around px-4"
      )}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-md p-2 text-sm font-medium transition-colors",
                isDesktop 
                  ? "py-3 px-4" 
                  : "flex-1",
                isActive
                  ? "text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span className="text-sm">{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}