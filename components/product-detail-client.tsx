"use client"

import { useState, useEffect } from "react"
import { addToCart } from "@/lib/cart"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { getSelectedLocation, type DeliveryLocation, getFulfillmentType } from "@/lib/delivery-locations"

type ProductDetailClientProps = {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { toast } = useToast()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery")

  useEffect(() => {
    setLocation(getSelectedLocation())
    setFulfillmentType(getFulfillmentType())

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

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      })
      return
    }

    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      })
      return
    }

    setDrawerOpen(true)
  }

  const estimatedTime = fulfillmentType === "pickup" ? location?.pickupTime : location?.deliveryTime
  const isOutOfStock = product.stock === 0

  return (
    <>
      {/* <Header /> */}
      <main className="px-3 pb-8 min-h-screen">
        <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48 text-center py-12">
          <div className="flex justify-start items-center">
            <Link
              href="/menu"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="bg-destructive text-destructive-foreground px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-semibold">Out of Stock</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-3 text-balance">{product.name}</h1>
                <p className="text-3xl font-bold text-primary mb-4">
                  <span className="text-base">GH₵</span>
                  {product.price.toFixed(2)}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Flavors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <Badge key={flavor} variant="outline">
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {isOutOfStock ? "Out of Stock" : `${product.stock} in stock`}
                    </p>
                  </div>
                  {location && estimatedTime && (
                    <div className="text-right">
                      <p className="text-sm font-semibold text-muted-foreground">
                        {fulfillmentType === "pickup" ? "Pickup" : "Delivery"}
                      </p>
                      <p className="text-lg font-bold text-primary">{estimatedTime}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" onClick={handleBuyNow} disabled={isOutOfStock}>
                  Order Now
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Purchase Options</h3>
                <p className="text-sm text-muted-foreground">
                  Buy directly through WhatsApp, Hubtel, or Bolt Food for quick and convenient ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
      <PurchaseDrawer product={product} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
