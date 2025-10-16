export default function Dumb() {
    return (
        <div>This is where I dumb certain code I migh use later or might not at all</div>
    )
}

    // const ReviewDrawerContent = (
    //     <div className="flex flex-col h-full">
    //         <div className="flex flex-col gap-3 mb-4">
    //             <div className="flex items-center gap-2 text-sm overflow-auto py-2">
    //                 {["latest", "oldest", "rating-high", "rating-low"].map((opt) => (
    //                     <Button
    //                         key={opt}
    //                         size="sm"
    //                         variant={reviewSort === opt ? "default" : "outline"}
    //                         onClick={() => setReviewSort(opt as any)}
    //                         className={cn("capitalize", reviewSort === opt && "bg-primary text-white")}
    //                     >
    //                         {opt.replace("-", " ")}
    //                     </Button>
    //                 ))}
    //             </div>
    //         </div>

    //         <div className="space-y-4 overflow-y-auto flex-1 pr-2">
    //             {filteredReviews.map((review, index) => (
    //                 <div key={index} className="flex gap-3 border-b pb-3">
    //                     <Avatar>
    //                         <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
    //                     </Avatar>
    //                     <div>
    //                         <div className="flex items-center justify-between">
    //                             <p className="font-medium">{review.name}</p>
    //                             <span className="text-xs text-muted-foreground">{review.date}</span>
    //                         </div>
    //                         <div className="flex items-center gap-1 text-yellow-500">
    //                             {Array.from({ length: review.rating }).map((_, i) => (
    //                                 <Star key={i} size={14} fill="currentColor" />
    //                             ))}
    //                         </div>
    //                         <p className="text-sm mt-1 text-muted-foreground">{review.text}</p>
    //                     </div>
    //                 </div>
    //             ))}
    //             {filteredReviews.length === 0 && <p className="text-center text-muted-foreground">No reviews found.</p>}
    //         </div>
    //     </div>
    // )


                    {/* <div className="flex items-center gap-4 mt-2 sticky top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b">
                        <Button onClick={() => router.push("/reviews/write")} variant="default">
                            Write a Review
                        </Button>
                        <button
                            onClick={() => setReviewsOpen(true)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                        >
                            {mockReviews.length} Reviews
                        </button>
                    </div> */}

                                {/* {isDesktop ? (
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
                        <SheetHeader className="pb-0">
                            <SheetTitle>Customer Reviews ({mockReviews.length})</SheetTitle>
                            <SheetDescription>Read what others are saying</SheetDescription>
                        </SheetHeader>
                        <div className="px-4 pb-6">
                            {ReviewDrawerContent}
                        </div>
                    </SheetContent>
                </Sheet>
            )} */}

                    {/* Categories */}
        {/* <div className="space-y-3">
          <Label className="text-base font-semibold">Categories</Label>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div> */}

        {/* Sort By */}
        {/* <div className="space-y-3">
          <Label className="text-base font-semibold">Sort By</Label>
          <select
            className="w-full p-2 border rounded-md bg-background"
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState["sortBy"] })}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div> */}

                  {/* Cart Items */}
          {/* <div className="lg:col-span-2 space-y-4">
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
                      <p className="font-bold text-primary text-sm md:text-base"><span className="text-xs">GH₵</span>{item.product.price.toFixed(2)}</p>
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
          </div> */}

          {/* Order Summary */}
          {/* <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-20">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}× {item.product.name}
                      </span>
                      <span className="font-medium"><span className="text-xs">GH₵</span>{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-base md:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary"><span className="text-xs">GH₵</span>{total.toFixed(2)}</span>
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
          </div> */}

            // const [cartItems, setCartItems] = useState<CartItem[]>([])
  // const [total, setTotal] = useState(0)
  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  // const { toast } = useToast()

  // useEffect(() => {
  //   const updateCart = () => {
  //     setCartItems(getCart())
  //     setTotal(getCartTotal())
  //   }

  //   updateCart()
  //   window.addEventListener("cartUpdated", updateCart)

  //   return () => window.removeEventListener("cartUpdated", updateCart)
  // }, [])

  // const handleRemove = (productId: string) => {
  //   removeFromCart(productId)
  //   toast({
  //     title: "Removed from cart",
  //     description: "Item has been removed from your cart.",
  //   })
  // }

  // const handleQuantityChange = (productId: string, newQuantity: number) => {
  //   updateCartQuantity(productId, newQuantity)
  // }

  // const handleCheckout = () => {
  //   if (cartItems.length === 1) {
  //     setSelectedProduct(cartItems[0].product)
  //     setDrawerOpen(true)
  //   } else {
  //     // For multiple items, create a combined WhatsApp message
  //     const items = cartItems
  //       .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
  //       .join("\n")
  //     const message = encodeURIComponent(`Hi! I'd like to order:\n\n${items}\n\nTotal: GH₵ ${total.toFixed(2)}`)
  //     window.open(`https://wa.me/233592771234?text=${message}`, "_blank")
  //   }
  // }

  // if (cartItems.length === 0) {
  //   return (
  //     <>
  //       <main className="px-3 pb-8 min-h-screen">
  //         <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-0 md:top-30 text-center py-12">
  //           <h2 className="text-xl lg:text-2xl font-bold leading-tight">You haven't ordered anything yet</h2>
  //         </div>
  //       </main>
  //     </>
  //   )
  // }

      // const filteredReviews = useMemo(() => {
    //     let reviews = [...mockReviews]
    //     if (reviewSearch.trim() !== "") {
    //         const term = reviewSearch.toLowerCase()
    //         reviews = reviews.filter((r) => r.name.toLowerCase().includes(term) || r.text.toLowerCase().includes(term))
    //     }
    //     if (reviewSort === "latest") reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    //     if (reviewSort === "oldest") reviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    //     if (reviewSort === "rating-high") reviews.sort((a, b) => b.rating - a.rating)
    //     if (reviewSort === "rating-low") reviews.sort((a, b) => a.rating - b.rating)
    //     return reviews
    // }, [reviewSearch, reviewSort, mockReviews])

        // const mockReviews = [
        //     {
        //         name: "Ama K.",
        //         rating: 5,
        //         date: "Oct 4, 2025",
        //         text: "Absolutely delicious! The vanilla boba is my favorite treat every weekend.",
        //     },
        //     {
        //         name: "Kojo B.",
        //         rating: 4,
        //         date: "Sep 27, 2025",
        //         text: "Really good but I wish the portion was a bit larger. Still top-notch quality.",
        //     },
        //     {
        //         name: "Esi A.",
        //         rating: 5,
        //         date: "Sep 15, 2025",
        //         text: "Soft life in a cup indeed 😍. Customer service was on point too!",
        //     },
        //     {
        //         name: "Yaw D.",
        //         rating: 3,
        //         date: "Sep 12, 2025",
        //         text: "Decent taste, but could use more sweetness. Nice ambiance though!",
        //     },
        //     {
        //         name: "Afia M.",
        //         rating: 5,
        //         date: "Aug 29, 2025",
        //         text: "Best pancakes I've had in Accra! Fluffy and perfectly golden brown.",
        //     },
        //     {
        //         name: "Kwame O.",
        //         rating: 4,
        //         date: "Aug 10, 2025",
        //         text: "Tried the chocolate milk tea—amazing balance! I'll definitely return.",
        //     },
        //     {
        //         name: "Nana Y.",
        //         rating: 5,
        //         date: "Jul 30, 2025",
        //         text: "Staff are super friendly, and the drinks are consistent every time.",
        //     },
        // ]
    
        // const [reviewSearch, setReviewSearch] = useState("")
        // const [reviewSort, setReviewSort] = useState<"latest" | "oldest" | "rating-high" | "rating-low">("latest")
    