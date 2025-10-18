"use client"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Card } from "@/components/ui/card"
import { Clock, Star, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import {
  getSelectedLocation,
  type DeliveryLocation,
  getFulfillmentType,
  getPickupEstimate,
} from "@/lib/delivery-locations"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  product: Product
  onClick: (product: Product) => void
  view?: "grid" | "list"
}

export function ProductCard({ product, onClick, view = "grid" }: ProductCardProps) {
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery")

  useEffect(() => {
    // Load initial location and fulfillment type
    setLocation(getSelectedLocation())
    setFulfillmentType(getFulfillmentType())

    // Listen for location and fulfillment type updates
    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    const handleFulfillmentUpdate = () => {
      setFulfillmentType(getFulfillmentType())
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    window.addEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
    return () => {
      window.removeEventListener("locationUpdated", handleLocationUpdate)
      window.removeEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
    }
  }, [])

  const rating = product.popularity / 20
  const fullStars = Math.floor(rating)
  const estimatedTime = fulfillmentType === "pickup" ? getPickupEstimate() : location?.deliveryTime
  const isOutOfStock = product.stock === 0

  return (
    <Card
      className={cn(
        "overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer border-0 rounded-none bg-transparent shadow-none",
        view === "grid" ? "flex flex-col p-0 gap-0" : "flex md:flex-row p-0 gap-0 md:gap-4",
        isOutOfStock && "opacity-60",
      )}
      onClick={() => !isOutOfStock && onClick(product)}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted rounded-lg",
          view === "grid"
            ? "aspect-[3/3] sm:aspect-[6/3] w-full"
            : "w-full aspect-[4/2] flex-shrink-0 md:aspect-video md:w-lg md:h-full",
        )}
      >
        {/* Product image */}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn("object-cover transition-transform", !isOutOfStock && "group-hover:scale-105")}
        />

        {/* Category banner */}
        <div className="absolute top-2 left-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md shadow-md">
          {product.category}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span className="font-semibold text-sm">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      <div className={cn("flex flex-col justify-between flex-1", view === "grid" ? "py-3 md:py-4" : "p-3 gap-3")}>
        <div className={cn("space-y-2 text-start", view === "grid" ? "space-y-1" : "")}>
          <h3
            className={cn(
              "font-semibold hover:text-primary transition-colors line-clamp-2",
              view === "grid" ? "text-sm md:text-base mb-1" : "text-lg mb-1",
            )}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-xs md:text-sm mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-3 w-3 md:h-4 md:w-4", i < fullStars ? "fill-current" : "")} />
            ))}
            <span className="ml-1 text-muted-foreground text-xs">({rating.toFixed(1)})</span>
          </div>

          {view === "list" && product.flavors.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.flavors.map((flavor) => (
                <span key={flavor} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  {flavor}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-center justify-between">
            <div className={cn("font-bold text-primary", view === "grid" ? "text-base md:text-lg" : "text-lg")}>
              <span className="text-sm">GH₵</span>
              {product.price.toFixed(2)}
            </div>

            {location && estimatedTime && (
              <div className="bg-primary/95 backdrop-blur text-primary-foreground text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{estimatedTime}</span>
                <span className="text-[10px] opacity-80">{fulfillmentType === "pickup" ? "Pickup" : "Delivery"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
