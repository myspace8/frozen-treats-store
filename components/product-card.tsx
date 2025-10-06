"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
  onBuyNow: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow p-0">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-3 md:p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2 hidden md:block">
          {product.description}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span className="text-base md:text-lg font-bold text-primary">GH₵ {product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent text-xs md:text-sm px-2"
          onClick={(e) => {
            e.preventDefault()
            onAddToCart(product)
          }}
        >
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
          <span className="hidden md:inline">Add</span>
        </Button>
        <Button
          size="sm"
          className="flex-1 text-xs md:text-sm px-2"
          onClick={(e) => {
            e.preventDefault()
            onBuyNow(product)
          }}
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
}
