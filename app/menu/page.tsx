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
                <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-12 md:top-48 text-center py-12">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex justify-start">
                            <h2 className=" text-xl lg:text-2xl font-bold leading-tight">
                                What would you like today?
                            </h2>
                        </div>
                        {isDesktop && (
                            <div className="md:flex justify-center items-center gap-3 hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="bg-background/80 hover:bg-background rounded-full p-1 shadow-lg"
                                    onClick={() => categoriesRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="bg-background/80 hover:bg-background rounded-full p-1 shadow-lg"
                                    onClick={() => categoriesRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                    {/* <div className="relative"> */}
                    <div
                        ref={categoriesRef}
                        className="flex md:justify-start group overflow-x-auto space-x-3 pb-4 py-1 snap-x snap-mandatory scrollbar-hide lg:scrollbar-thin lg:scrollbar-thumb-muted lg:scrollbar-track-transparent"
                    >
                        {categories.map(({ name, icon }) => (
                            <div
                                key={name}
                                className={cn(
                                    "flex flex-col items-center gap-1 rounded-sm px-3 py-2 flex-shrink-0 snap-center min-w-20 md:min-w-28 whitespace-nowrap cursor-pointer transition-transform hover:scal active:scal-95 border-[0.1px border border-foreground/10",
                                    filters.categories.includes(name)
                                        ? "shadow-md border-2 border-foreground/85"
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


                    {/* </div> */}


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
                                        onAddToCart={handleAddToCart}
                                        onBuyNow={handleBuyNow}
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
            <PurchaseDrawer product={selectedProduct} open={drawerOpen} onOpenChange={setDrawerOpen} />

            <LocationSelectorModal open={locationModalOpen} onOpenChange={setLocationModalOpen} />
        </>
    )
}