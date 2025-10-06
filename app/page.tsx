"use client"

import { useState, useMemo } from "react"
import { products } from "@/lib/products"
import { addToCart } from "@/lib/cart"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const { toast } = useToast()
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50],
    flavors: [],
    sortBy: "popularity",
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Flavor filter
      if (filters.flavors.length > 0) {
        const hasMatchingFlavor = product.flavors.some((flavor) => filters.flavors.includes(flavor))
        if (!hasMatchingFlavor) return false
      }

      return true
    })

    // Sort
    if (filters.sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity)
    } else if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [filters])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product)
    setDrawerOpen(true)
  }

  return (
    <>
      <Header />
      <main className="container m-auto px-3 py-8 min-h-[60vh]">
        <div className="mb-8">
          <p className="text-muted-foreground text-lg">
            Shop delicious ice cream, boba tea, pastries, and pancakes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters onFilterChange={setFilters} />
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <ProductFilters onFilterChange={setFilters} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
