"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { getCart, getCartTotal, removeFromCart, updateCartQuantity, clearCart } from "@/lib/cart"
import { getSelectedLocation, getFulfillmentType, type DeliveryLocation } from "@/lib/delivery-locations"
import { addOrder } from "@/lib/orders"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Truck, MapPin } from "lucide-react"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import type { Product } from "@/lib/products"
import type { CartItem } from "@/lib/cart"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery")
  const { toast } = useToast()

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart())
      setTotal(getCartTotal())
    }

    setLocation(getSelectedLocation())
    setFulfillmentType(getFulfillmentType())

    updateCart()
    window.addEventListener("cartUpdated", updateCart)

    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    const handleFulfillmentUpdate = () => {
      setFulfillmentType(getFulfillmentType())
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    window.addEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)

    return () => {
      window.removeEventListener("cartUpdated", updateCart)
      window.removeEventListener("locationUpdated", handleLocationUpdate)
      window.removeEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
    }
  }, [])

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity)
  }

  const handleCheckout = () => {
    if (!location) {
      toast({
        title: "Select Location",
        description: "Please select a delivery/pickup location first.",
        variant: "destructive",
      })
      return
    }

    if (cartItems.length === 1) {
      setSelectedProduct(cartItems[0].product)
      setDrawerOpen(true)
    } else {
      // For multiple items, create a combined WhatsApp message
      const items = cartItems
        .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
        .join("\n")
      const locationInfo = `${fulfillmentType === "pickup" ? "Pickup" : "Delivery"} at ${location.name}`
      const message = encodeURIComponent(`Hi! I'd like to order:\n\n${items}\n\n${locationInfo}\n\nTotal: GH₵ ${total.toFixed(2)}`)

      addOrder({
        items: cartItems,
        total,
        status: "pending",
        fulfillmentType,
        location: location.name,
        estimatedTime: fulfillmentType === "pickup" ? location.pickupTime : location.deliveryTime,
      })

      window.open(`https://wa.me/233592771234?text=${message}`, "_blank")
      // Not sure if cart should be cleared here 
      clearCart()
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="px-3 pb-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center py-12">
          <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">You haven't added any items yet.</p>
          <Link href="/menu">
            <Button size="lg" className="px-8">
              See the Menu
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="px-3 pb-8 min-h-screen">
        <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48 text-center py-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex gap-3 md:gap-4">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-sm md:text-base hover:text-primary transition-colors line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{item.product.category}</p>
                        <p className="font-bold text-primary text-sm md:text-base">
                          <span className="text-xs">GH₵</span>
                          {item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemove(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>

                        <div className="flex items-center gap-1 md:gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 md:w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-20">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

                  {location && (
                    <div className="mb-6 p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        {fulfillmentType === "pickup" ? (
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        ) : (
                          <Truck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">
                            {fulfillmentType === "pickup" ? "Pickup" : "Delivery"}
                          </p>
                          <p className="text-sm font-semibold">{location.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {fulfillmentType === "pickup" ? location.pickupTime : location.deliveryTime}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Dispatch event to open location modal from header
                          window.dispatchEvent(new CustomEvent("openLocationModal"))
                        }}
                        className="w-full"
                      >
                        <div className="w-full text-xs bg-transparent h-9 px-4 py-2 has-[>svg]:px- border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50
                        inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
                        ">
                          Change
                        </div>
                      </button>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs md:text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}× {item.product.name}
                        </span>
                        <span className="font-medium">
                          <span className="text-xs">GH₵</span>
                          {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-base md:text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        <span className="text-xs">GH₵</span>
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
                    Proceed to Order
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      clearCart()
                      toast({
                        title: "Cart cleared",
                        description: "All items have been removed from your cart.",
                      })
                    }}
                  >
                    Clear Cart
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Choose your preferred payment method at checkout
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}