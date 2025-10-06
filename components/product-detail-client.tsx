"use client"

import { useState } from "react"
import { addToCart } from "@/lib/cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"

type ProductDetailClientProps = {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { toast } = useToast()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    setDrawerOpen(true)
  }

  return (
    <>
      <Header />
      <main className="container m-auto px-3 py-8 min-h-[60vh]">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

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
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-3 text-balance">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-4">GH₵ {product.price.toFixed(2)}</p>
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

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Quantity</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button variant="outline" size="lg" className="bg-transparent" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" onClick={handleBuyNow}>
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
      </main>

      <Footer />
      <PurchaseDrawer product={product} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
