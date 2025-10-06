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
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col p-0">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
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
        </div>
      </Link>

      <CardContent className="flex-grow flex flex-col justify-between px-3 md:px-4">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm md:text-lg mb-1 text-foreground hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2 hidden md:block">
            {product.description}
          </p>
        </div>

        <div className="flex gap-2 mt-auto">
          <span className="text-base md:text-lg font-bold text-primary">
            <span className="text-xs">GH₵</span>{product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-4 pt-0 flex gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent text-xs md:text-sm px-2"
          onClick={(e) => {
            e.preventDefault()
            onAddToCart(product)
          }}
        >
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
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
