"use client"

import { useState, useMemo, useEffect } from "react"
import { products } from "@/lib/products"
import { addToCart } from "@/lib/cart"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationHours } from "@/components/location-hours"
import { ContactForm } from "@/components/contact-form"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Star, Search } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const { toast } = useToast()
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    // Restore scroll position when component mounts
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition")
    if (savedScrollPosition) {
      window.scrollTo(0, Number.parseInt(savedScrollPosition, 10))
    }

    // Save scroll position before navigating away
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY.toString())
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50],
    flavors: [],
    sortBy: "popularity",
  })

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reviewsOpen, setReviewsOpen] = useState(false)

  // --- Product Filtering ---
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

  // --- Cart and Buy Handlers ---
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

  // --- Mock Reviews ---
  const mockReviews = [
    {
      name: "Ama K.",
      rating: 5,
      date: "Oct 4, 2025",
      text: "Absolutely delicious! The vanilla boba is my favorite treat every weekend.",
    },
    {
      name: "Kojo B.",
      rating: 4,
      date: "Sep 27, 2025",
      text: "Really good but I wish the portion was a bit larger. Still top-notch quality.",
    },
    {
      name: "Esi A.",
      rating: 5,
      date: "Sep 15, 2025",
      text: "Soft life in a cup indeed 😍. Customer service was on point too!",
    },
    {
      name: "Yaw D.",
      rating: 3,
      date: "Sep 12, 2025",
      text: "Decent taste, but could use more sweetness. Nice ambiance though!",
    },
    {
      name: "Afia M.",
      rating: 5,
      date: "Aug 29, 2025",
      text: "Best pancakes I’ve had in Accra! Fluffy and perfectly golden brown.",
    },
    {
      name: "Kwame O.",
      rating: 4,
      date: "Aug 10, 2025",
      text: "Tried the chocolate milk tea—amazing balance! I’ll definitely return.",
    },
    {
      name: "Nana Y.",
      rating: 5,
      date: "Jul 30, 2025",
      text: "Staff are super friendly, and the drinks are consistent every time.",
    },
  ]

  // --- Review Filtering / Sorting State ---
  const [reviewSearch, setReviewSearch] = useState("")
  const [reviewSort, setReviewSort] = useState<"latest" | "oldest" | "rating-high" | "rating-low">("latest")

  const filteredReviews = useMemo(() => {
    let reviews = [...mockReviews]
    if (reviewSearch.trim() !== "") {
      const term = reviewSearch.toLowerCase()
      reviews = reviews.filter((r) => r.name.toLowerCase().includes(term) || r.text.toLowerCase().includes(term))
    }
    if (reviewSort === "latest") reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    if (reviewSort === "oldest") reviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    if (reviewSort === "rating-high") reviews.sort((a, b) => b.rating - a.rating)
    if (reviewSort === "rating-low") reviews.sort((a, b) => a.rating - b.rating)
    return reviews
  }, [reviewSearch, reviewSort, mockReviews])

  const ReviewDrawerContent = (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={reviewSearch}
            onChange={(e) => setReviewSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm overflow-auto py-2">
          {/* <span className="text-muted-foreground">Sort by:</span> */}
          {["latest", "oldest", "rating-high", "rating-low"].map((opt) => (
            <Button
              key={opt}
              size="sm"
              variant={reviewSort === opt ? "default" : "outline"}
              onClick={() => setReviewSort(opt as any)}
              className={cn("capitalize", reviewSort === opt && "bg-primary text-white")}
            >
              {opt.replace("-", " ")}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {filteredReviews.map((review, index) => (
          <div key={index} className="flex gap-3 border-b pb-3">
            <Avatar>
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.name}</p>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm mt-1 text-muted-foreground">{review.text}</p>
            </div>
          </div>
        ))}
        {filteredReviews.length === 0 && <p className="text-center text-muted-foreground">No reviews found.</p>}
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <main className="container m-auto px-3 py-8 min-h-[60vh]">
        <p className="text-muted-foreground text-lg">Shop delicious ice cream, boba tea, pastries, and pancakes</p>

        {/* Review buttons */}
        <div className="flex items-center gap-4 mt-2">
          <Button onClick={() => router.push("/reviews/write")} variant="default">
            Write a Review
          </Button>
          <button
            onClick={() => setReviewsOpen(true)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
          >
            {mockReviews.length} Reviews
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
            <ProductFilters onFilterChange={setFilters} />
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden sticky top-16 z-30 bg-background/80 backdrop-blur-md py-2">
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

        <section className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Visit Us</h2>
            <p className="text-muted-foreground">Find us in Kumasi and check our opening hours</p>
          </div>
          <LocationHours />
        </section>

        <section className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <p className="text-muted-foreground">Have questions about catering or event bookings? Contact us!</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />

      <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />

      {/* Reviews Drawer / Modal */}
      {isDesktop ? (
        <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
          <DialogContent className="max-w-2xl h-[75vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Customer Reviews ({mockReviews.length})</DialogTitle>
            </DialogHeader>
            {ReviewDrawerContent}
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={reviewsOpen} onOpenChange={setReviewsOpen}>
          <SheetContent side="bottom" className="max-h-[75vh] overflow-y-auto rounded-t-md">
            <SheetHeader>
              <SheetTitle>Customer Reviews ({mockReviews.length})</SheetTitle>
              <SheetDescription>Read what others are saying</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-6">
              {ReviewDrawerContent}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
