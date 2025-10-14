"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getCartCount } from "@/lib/cart"
import { DeliveryLocationHeader } from "@/components/delivery-location-header"

export function Header() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }

    updateCartCount()
    window.addEventListener("cartUpdated", updateCartCount)

    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [])

  return (
    <header className="sticky px-3 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <img src="/frozentreatslogo.png" alt="Frozen Treats" className="h-16" />
        </Link>

        <div className="flex-1 flex justify-center">
          <DeliveryLocationHeader />
        </div>

        <Link href="/cart" className="flex-shrink-0">
          <Button variant="outline" size="icon" className="relative bg-transparent">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}
