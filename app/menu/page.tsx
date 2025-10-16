

"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { products } from "@/lib/products"
import { addToCart } from "@/lib/cart"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import { LocationSelectorModal } from "@/components/location-selector-modal"
import { getSelectedLocation } from "@/lib/delivery-locations"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ProductDetailSheetProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// export function ProductDetailSheet({ product, open, onOpenChange }: ProductDetailSheetProps) {
//   const { toast } = useToast()
//   const isDesktop = useMediaQuery("(min-width: 1024px)")
//   const [quantity, setQuantity] = useState(1)

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product, quantity)
//       toast({
//         title: "Added to cart",
//         description: `${quantity} × ${product.name} added to your cart.`,
//       })
//     }
//   }

//   const handleQuantityChange = (delta: number) => {
//     setQuantity(prev => Math.max(1, prev + delta))
//   }

//   if (!product) return null

//   const sharedContent = (
//     <>
//       {/* Image */}
//       <div className="relative aspect-square w-full max-w-sm mx-auto mb-6 rounded-lg overflow-hidden bg-muted">
//         <Image
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Category and Price */}
//       <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
//         <Badge variant="secondary" className="text-sm">
//           {product.category}
//         </Badge>
//         <span className="text-2xl font-bold text-primary">
//           GH₵{product.price.toFixed(2)}
//         </span>
//       </div>

//       {/* Description */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-3">Description</h2>
//         <p className="text-muted-foreground leading-relaxed text-sm">
//           {product.description}
//         </p>
//       </div>

//       {/* Flavors */}
//       {product.flavors.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-3">Flavors</h2>
//           <div className="flex flex-wrap gap-2">
//             {product.flavors.map((flavor) => (
//               <Badge key={flavor} variant="outline" className="text-xs">
//                 {flavor}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quantity Selector */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-3">Quantity</h2>
//         <div className="flex items-center justify-center gap-4">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-10 w-10 rounded-full"
//             onClick={() => handleQuantityChange(-1)}
//           >
//             -
//           </Button>
//           <span className="text-xl font-semibold min-w-[3rem] text-center">
//             {quantity}
//           </span>
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-10 w-10 rounded-full"
//             onClick={() => handleQuantityChange(1)}
//           >
//             +
//           </Button>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-4">
//         <Button
//           variant="outline"
//           size="lg"
//           className="flex-1"
//           onClick={handleAddToCart}
//         >
//           <ShoppingCart className="h-5 w-5 mr-2" />
//           Add to Cart
//         </Button>
//       </div>

//       {/* Purchase Options */}
//       <div className="text-center text-sm text-muted-foreground p-4 bg-muted rounded-lg">
//         Buy directly through WhatsApp, Hubtel, or Bolt Food for quick and convenient ordering.
//       </div>
//     </>
//   )

//   return isDesktop ? (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="min-w-[80vw] max-h-[90vh] flex flex-col p-0">
//         <DialogHeader className="p-6 border-b">
//           <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
//         </DialogHeader>
//         <div className="flex-1 overflow-y-auto p-6">
//           {sharedContent}
//         </div>
//       </DialogContent>
//     </Dialog>
//   ) : (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent side="bottom" className="w-full flex flex-col p-0 max-h-[95vh]">
//         <SheetHeader className="p-6 border-b">
//           <SheetTitle className="text-xl font-bold">{product.name}</SheetTitle>
//         </SheetHeader>
//         <div className="flex-1 overflow-y-auto p-6">
//           {sharedContent}
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }

export function ProductDetailSheet({
  product,
  open,
  onOpenChange,
}: ProductDetailSheetProps) {
  const { toast } = useToast()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart.`,
      })
    }
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const productInfo = (
    <>
      {/* Category and Price */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Badge variant="secondary" className="text-sm">
          {product.category}
        </Badge>
        <span className="text-2xl font-bold text-primary">
          GH₵{product.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {product.description}
        </p>
      </div>

      {/* Flavors */}
      {product.flavors.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Flavors</h2>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((flavor) => (
              <Badge key={flavor} variant="outline" className="text-xs">
                {flavor}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  )

  const quantityBar = (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </Button>
        <span className="text-xl font-semibold min-w-[3rem] text-center">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </Button>
      </div>
      <Button
        size="lg"
        className="flex-1 font-medium flex items-center justify-center"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
    </div>
  )

  // ------------------ DESKTOP VIEW ------------------
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-[80vw] max-h-[90vh] overflow-hidden p-0 rounded-2xl">
          <div className="flex h-full">
            {/* Left: Image */}
            <div className="relative w-1/2 bg-muted overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col w-1/2">
              <DialogHeader className="p-6 border-b">
                <DialogTitle className="text-2xl font-bold">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6">{productInfo}</div>

              {/* Sticky Footer */}
              <div className="p-6 border-t bg-background sticky bottom-0">
                {quantityBar}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // ------------------ MOBILE VIEW ------------------
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full flex flex-col p-0 max-h-[95vh] rounded-t-2xl overflow-hidden"
      >
        {/* Header */}
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-lg font-semibold">
            {product.name}
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Image on top */}
          <div className="relative aspect-square w-full mb-6 rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {productInfo}
        </div>

        {/* Sticky Footer */}
        <div className="p-6 border-t bg-background">{quantityBar}</div>
      </SheetContent>
    </Sheet>
  )
}

export default function MenuPage() {
    const { toast } = useToast()
    const isDesktop = useMediaQuery("(min-width: 1024px)")

    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [locationModalOpen, setLocationModalOpen] = useState(false)
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, 50],
        flavors: [],
        sortBy: "popularity",
    })

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [reviewsOpen, setReviewsOpen] = useState(false)

    const categoriesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem("homeScrollPosition")
        if (savedScrollPosition) {
            window.scrollTo(0, Number.parseInt(savedScrollPosition, 10))
        }

        const handleScroll = () => {
            sessionStorage.setItem("homeScrollPosition", window.scrollY.toString())
        }

        window.addEventListener("scroll", handleScroll)

        const checkLocation = () => {
            const location = getSelectedLocation()
            if (!location) {
                setTimeout(() => setLocationModalOpen(true), 500)
            }
        }
        checkLocation()

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        setView(isDesktop ? 'grid' : 'list')
    }, [isDesktop])

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
            if (filters.flavors.length > 0) {
                const hasMatchingFlavor = product.flavors.some((flavor) => filters.flavors.includes(flavor))
                if (!hasMatchingFlavor) return false
            }
            return true
        })

        if (filters.sortBy === "popularity") filtered.sort((a, b) => b.popularity - a.popularity)
        else if (filters.sortBy === "price-low") filtered.sort((a, b) => a.price - b.price)
        else if (filters.sortBy === "price-high") filtered.sort((a, b) => b.price - a.price)

        return filtered
    }, [filters])

    const categories = useMemo(() => [
        { name: "Ice Cream", icon: "/categories-filter-icons/ice-cream.png" },
        { name: "Boba Tea", icon: "/categories-filter-icons/boba-tea.png" },
        { name: "Pastries", icon: "/categories-filter-icons/pastries.png" },
        { name: "Pancakes", icon: "/categories-filter-icons/pancake.png" },
        { name: "Slushy", icon: "/categories-filter-icons/slushy.png" },
        { name: "Waffles", icon: "/categories-filter-icons/waffles.png" },
        { name: "Popcorn", icon: "/categories-filter-icons/popcorn.png" },
        { name: "Fruit Juice", icon: "/categories-filter-icons/fruit-juice.png" },
        { name: "Spring Roll", icon: "/categories-filter-icons/spring-roll.png" },
        { name: "Jam Roll", icon: "/categories-filter-icons/jam-roll.png" },
        { name: "Cocktails", icon: "/categories-filter-icons/cocktail.png" },
        { name: "Shawarma", icon: "/categories-filter-icons/shawarma.png" },
    ], [])

    const toggleCategory = useCallback((category: string) => {
        setFilters(prev => {
            const categories = prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
            return { ...prev, categories }
        })
    }, [])

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
    }

    const handleCloseProductSheet = () => {
        setSelectedProduct(null)
    }

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
            <main className="px-3 pb-8 min-h-screen">
                <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48 text-center py-12">
                    <div className="flex justify-start mb-2">
                        <h2 className=" text-xl lg:text-2xl font-bold leading-tight">
                            What would you like today?
                        </h2>
                    </div>
                    <div className="relative">
                        <div 
                            ref={categoriesRef}
                            className="flex md:justify-center group overflow-x-auto space-x-3 pb-4 py-1 px-1 snap-x snap-mandatory scrollbar-hide lg:scrollbar-thin lg:scrollbar-thumb-muted lg:scrollbar-track-transparent"
                        >
                            {categories.map(({ name, icon }) => (
                                <div
                                    key={name}
                                    className={cn(
                                        "flex flex-col items-center gap-1 rounded-sm px-3 py-2 flex-shrink-0 snap-center min-w-20 md:min-w-28 whitespace-nowrap cursor-pointer transition-transform hover:scal active:scal-95 border-[0.1px ring ring-foreground/10",
                                        filters.categories.includes(name)
                                            ? "shadow-md ring-2 ring-foreground/85"
                                            : ""
                                    )}
                                    onClick={() => toggleCategory(name)}
                                >
                                    <Image
                                        width={48}
                                        height={48}
                                        priority={false}
                                        src={icon}
                                        alt={`${name} icon`}
                                        className={cn(
                                            "h-10 w-10 md:h-16 md:w-16 flex-shrink-0 object-contain transition-transform group-hover:scale-112",
                                            filters.categories.includes(name) ? "scale-112" : ""
                                        )}
                                    />
                                    <span className={cn(
                                        "text-xs font-semibold uppercase transition-colors",
                                        filters.categories.includes(name) ? "text-primary-" : "text-foreground"
                                    )}>
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {isDesktop && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1 shadow-lg"
                                    onClick={() => categoriesRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1 shadow-lg"
                                    onClick={() => categoriesRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>


                    <div className="flex flex-col lg:flex-row gap-4 mt-6">
                        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
                            <ProductFilters onFilterChange={setFilters} />
                        </aside>
                        <div className="flex-1">
                            <div className="mb-4 flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                                </span>
                                <div className="flex gap-1">
                                    <Button
                                        variant={view === 'grid' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setView('grid')}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={view === 'list' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setView('list')}
                                        className="h-8 w-8 p-0"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className={cn(
                                "grid",
                                view === 'grid' ? 'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-4' : 'grid-cols-1 gap-4'
                            )}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={handleProductClick}
                                        view={view}
                                    />
                                ))}
                            </div>
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>
            <ProductDetailSheet 
              product={selectedProduct} 
              open={!!selectedProduct} 
              onOpenChange={handleCloseProductSheet} 
            />
            <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />

            <LocationSelectorModal open={locationModalOpen} onOpenChange={setLocationModalOpen} />
        </>
    )
}