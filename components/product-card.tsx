"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Clock, Star, Grid, List } from "lucide-react"
import { useState, useEffect } from "react"
import { getSelectedLocation, type DeliveryLocation } from "@/lib/delivery-locations"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
  onBuyNow: (product: Product) => void
  view?: 'grid' | 'list'
}

export function ProductCard({ product, onAddToCart, onBuyNow, view = 'grid' }: ProductCardProps) {
  const [location, setLocation] = useState<DeliveryLocation | null>(null)

  useEffect(() => {
    // Load initial location
    setLocation(getSelectedLocation())

    // Listen for location updates
    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    return () => window.removeEventListener("locationUpdated", handleLocationUpdate)
  }, [])

  const rating = product.popularity / 20
  const fullStars = Math.floor(rating)

  return (
    <Card className={cn(
      "overflow-hidden group hover:shadow-lg transition-shadow",
      view === 'grid' ? "flex flex-col p-0 gap-0" : "flex md:flex-row p-0 gap-4"
    )}>
      <Link href={`/product/${product.id}`}>
        <div className={cn(
          "relative overflow-hidden bg-muted",
          view === 'grid' ? "aspect-[3/3] sm:aspect-[6/3] w-full" : "w-full aspect-[4/2] flex-shrink-0 md:aspect-video md:w-lg md:h-full"
        )}>
          {/* Product image */}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />

          {/* Category banner */}
          <div className="absolute top-2 left-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md shadow-md">
            {product.category}
          </div>

          {location && (
            <div className="absolute top-2 right-2 bg-primary/95 backdrop-blur text-primary-foreground text-xs font-medium px-2 py-1 rounded-md shadow-md flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{location.deliveryTime}</span>
            </div>
          )}
        </div>
      </Link>

      <div className={cn(
        "flex flex-col justify-between flex-1",
        view === 'grid' ? "p-3 md:p-4" : "p-3 gap-3"
      )}>
        <div className={cn("space-y-2", view === 'grid' ? "space-y-1" : "")}>
          <Link href={`/product/${product.id}`}>
            <h3 className={cn(
              "font-semibold hover:text-primary transition-colors line-clamp-2",
              view === 'grid' ? "text-sm md:text-base mb-1" : "text-lg mb-1"
            )}>
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-xs md:text-sm mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3 md:h-4 md:w-4",
                  i < fullStars ? "fill-current" : ""
                )}
              />
            ))}
            <span className="ml-1 text-muted-foreground text-xs">({rating.toFixed(1)})</span>
          </div>

          {/* <p className={cn(
            "text-xs md:text-sm text-muted-foreground",
            view === 'grid' ? "line-clamp-1 md:line-clamp-2 mb-3" : "mb-2"
          )}>
            {product.description}
          </p> */}

          {view === 'list' && product.flavors.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.flavors.map((flavor) => (
                <span
                  key={flavor}
                  className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                >
                  {flavor}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <div className={cn(
            "font-bold text-primary",
            view === 'grid' ? "text-base md:text-lg" : "text-lg"
          )}>
            <span className="text-sm">GH₵</span>
            {product.price.toFixed(2)}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 px-2 bg-transparent",
                view === 'grid' ? "text-xs md:text-sm" : "text-sm"
              )}
              onClick={(e) => {
                e.preventDefault()
                onAddToCart(product)
              }}
            >
              <ShoppingCart className={cn(
                "h-3 w-3 md:h-4 md:w-4 mr-1",
                view === 'list' && "mr-1"
              )} />
              <span className={cn(view === 'grid' ? "hidden md:inline" : "inline")}>
                Add
              </span>
            </Button>
            <Button
              size="sm"
              className={cn(
                "flex-1 px-2",
                view === 'grid' ? "text-xs md:text-sm" : "text-sm"
              )}
              onClick={(e) => {
                e.preventDefault()
                onBuyNow(product)
              }}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}