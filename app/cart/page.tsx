"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, type CartItem } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart())
      setTotal(getCartTotal())
    }

    updateCart()
    window.addEventListener("cartUpdated", updateCart)

    return () => window.removeEventListener("cartUpdated", updateCart)
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
    if (cartItems.length === 1) {
      setSelectedProduct(cartItems[0].product)
      setDrawerOpen(true)
    } else {
      // For multiple items, create a combined WhatsApp message
      const items = cartItems
        .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
        .join("\n")
      const message = encodeURIComponent(`Hi! I'd like to order:\n\n${items}\n\nTotal: GH₵ ${total.toFixed(2)}`)
      window.open(`https://wa.me/233XXXXXXXXX?text=${message}`, "_blank")
    }
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="container m-auto px-3 py-8 min-h-[60vh]">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some delicious treats to get started!</p>
            <Link href="/">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container m-auto px-3 py-8 min-h-[60vh]">
        <h1 className="text-3xl font-bold font-serif mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
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
                      <p className="font-bold text-primary text-sm md:text-base">GH₵ {item.product.price.toFixed(2)}</p>
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

                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}× {item.product.name}
                      </span>
                      <span className="font-medium">GH₵ {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-base md:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">GH₵ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
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
      </main>

      <Footer />
      <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
