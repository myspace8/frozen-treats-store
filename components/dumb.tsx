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


                    // {/* <div className="flex items-center gap-4 mt-2 sticky top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b">
                    //     <Button onClick={() => router.push("/reviews/write")} variant="default">
                    //         Write a Review
                    //     </Button>
                    //     <button
                    //         onClick={() => setReviewsOpen(true)}
                    //         className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                    //     >
                    //         {mockReviews.length} Reviews
                    //     </button>
                    // </div> */}

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
  //        <div className="lg:col-span-2 space-y-4">
  //           {cartItems.map((item) => (
  //             <Card key={item.product.id}>
  //               <CardContent className="p-3 md:p-4">
  //                 <div className="flex gap-3 md:gap-4">
  //                   <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
  //                     <Image
  //                       src={item.product.image || "/placeholder.svg"}
  //                       alt={item.product.name}
  //                       fill
  //                       className="object-cover"
  //                     />
  //                   </div>

  //                   <div className="flex-1 min-w-0">
  //                     <Link href={`/product/${item.product.id}`}>
  //                       <h3 className="font-semibold text-sm md:text-base hover:text-primary transition-colors line-clamp-1">
  //                         {item.product.name}
  //                       </h3>
  //                     </Link>
  //                     <p className="text-xs md:text-sm text-muted-foreground mb-2">{item.product.category}</p>
  //                     <p className="font-bold text-primary text-sm md:text-base"><span className="text-xs">GH₵</span>{item.product.price.toFixed(2)}</p>
  //                   </div>

  //                   <div className="flex flex-col items-end justify-between">
  //                     <Button
  //                       variant="ghost"
  //                       size="icon"
  //                       className="h-8 w-8"
  //                       onClick={() => handleRemove(item.product.id)}
  //                     >
  //                       <Trash2 className="h-4 w-4 text-destructive" />
  //                     </Button>

  //                     <div className="flex items-center gap-1 md:gap-2">
  //                       <Button
  //                         variant="outline"
  //                         size="icon"
  //                         className="h-7 w-7 md:h-8 md:w-8 bg-transparent"
  //                         onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
  //                       >
  //                         <Minus className="h-3 w-3" />
  //                       </Button>
  //                       <span className="w-6 md:w-8 text-center font-semibold text-sm">{item.quantity}</span>
  //                       <Button
  //                         variant="outline"
  //                         size="icon"
  //                         className="h-7 w-7 md:h-8 md:w-8 bg-transparent"
  //                         onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
  //                       >
  //                         <Plus className="h-3 w-3" />
  //                       </Button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </div>

  //         {/* Order Summary */}
  //          <div className="lg:col-span-1">
  //           <Card className="lg:sticky lg:top-20">
  //             <CardContent className="p-4 md:p-6">
  //               <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

  //               <div className="space-y-3 mb-6">
  //                 {cartItems.map((item) => (
  //                   <div key={item.product.id} className="flex justify-between text-xs md:text-sm">
  //                     <span className="text-muted-foreground">
  //                       {item.quantity}× {item.product.name}
  //                     </span>
  //                     <span className="font-medium"><span className="text-xs">GH₵</span>{(item.product.price * item.quantity).toFixed(2)}</span>
  //                   </div>
  //                 ))}
  //               </div>

  //               <div className="border-t pt-4 mb-6">
  //                 <div className="flex justify-between text-base md:text-lg font-bold">
  //                   <span>Total</span>
  //                   <span className="text-primary"><span className="text-xs">GH₵</span>{total.toFixed(2)}</span>
  //                 </div>
  //               </div>

  //               <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
  //                 Proceed to Checkout
  //               </Button>

  //               <Button
  //                 variant="outline"
  //                 className="w-full bg-transparent"
  //                 onClick={() => {
  //                   clearCart()
  //                   toast({
  //                     title: "Cart cleared",
  //                     description: "All items have been removed from your cart.",
  //                   })
  //                 }}
  //               >
  //                 Clear Cart
  //               </Button>

  //               <p className="text-xs text-muted-foreground text-center mt-4">
  //                 Choose your preferred payment method at checkout
  //               </p>
  //             </CardContent>
  //           </Card>
  //         </div> 

  //           const [cartItems, setCartItems] = useState<CartItem[]>([])
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
    
      //   <main className="px-3 pb-8 min-h-screen">
      //   <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48 text-center py-12">
      //     <section className="py-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
      //       <h2 className="text-2xl font-bold text-center mb-6">Hot Right Now—Don't Miss Out!</h2>
      //       <div className="space-y-4">
      //         {[
      //           { name: "Fresh Strawberry Fields (3 left!)", img: "/strawberry.png", price: 16, timer: "Ends in 2h" },
      //           { name: "Caramel Crunch Popcorn (Limited Batch)", img: "/caramel.png", price: 10, timer: "Selling Fast" },
      //         ].map((item, i) => (
      //           <Card key={i} className="flex items-center gap-4 p-4">
      //             <Image src={item.img} alt={item.name} width={80} height={80} className="rounded-md object-cover flex-shrink-0" />
      //             <div className="flex-1">
      //               <h3 className="font-semibold">{item.name}</h3>
      //               <p className="text-sm text-muted-foreground mb-1">{item.timer}</p>
      //               <div className="flex justify-between items-center">
      //                 <span className="text-lg font-bold">GH₵{item.price}</span>
      //                 <Button size="sm" className="bg-primary">Secure Now</Button>
      //               </div>
      //             </div>
      //           </Card>
      //         ))}
      //       </div>
      //     </section>
      //     <section className="py-8">
      //       <h2 className="text-2xl font-bold text-center mb-6">Mix Magic: Perfect Pairs</h2>
      //       <div className="max-w-md mx-auto">
      //         <Select onValueChange={(base) => {/* Update pairs state */ }} defaultValue="pancakes">
      //           <SelectTrigger className="mb-4">
      //             <SelectValue placeholder="Pick your base craving..." />
      //           </SelectTrigger>
      //           <SelectContent>
      //             <SelectItem value="pancakes">Fluffy Pancakes</SelectItem>
      //             <SelectItem value="icecream">Creamy Scoop</SelectItem>
      //           </SelectContent>
      //         </Select>
      //         <div className="space-y-3">
      //           {[
      //             { pair: "Blueberry Pancakes + Orange Sunrise", save: "Save GH₵3", price: 37 },
      //             { pair: "Classic Buttermilk + Pineapple Paradise", save: "Save GH₵2", price: 38 },
      //           ].map((combo, i) => (
      //             <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
      //               <span className="text-sm">{combo.pair}</span>
      //               <div className="text-right">
      //                 <p className="text-xs text-green-600">{combo.save}</p>
      //                 <p className="font-semibold">GH₵{combo.price}</p>
      //               </div>
      //               <Button variant="outline" size="sm" className="ml-2">Add Pair</Button>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </section>
      //     <section className="py-8 bg-gradient-to-r from-muted/50 to-primary/10 rounded-lg">
      //       <h2 className="text-2xl font-bold text-center mb-6">What's your vibe today?</h2>
      //       <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
      //         {[
      //           { emoji: '😊', mood: 'Happy', desc: 'Celebrate with sweetness!', suggestions: ['Madagascar Vanilla Dream'] },
      //           { emoji: '😩', mood: 'Stressed', desc: 'Unwind with creamy comfort.', suggestions: ['Velvet Taro Boba'] },
      //           { emoji: '⚡', mood: 'Energized', desc: 'Fuel the buzz!', suggestions: ['Blueberry Morning Stack'] },
      //         ].map((vibe, i) => (
      //           <div key={i} className="flex-shrink-0 w-64 bg-white rounded-xl p-4 shadow-sm snap-center">
      //             <span className="text-3xl">{vibe.emoji}</span>
      //             <h3 className="font-semibold mt-2">{vibe.mood}</h3>
      //             <p className="text-sm text-muted-foreground mb-4">{vibe.desc}</p>
      //             <div className="space-y-2">
      //               {vibe.suggestions.map(s => (
      //                 <Button key={s} variant="outline" size="sm" className="w-full justify-start">
      //                   {s} – GH₵15.00
      //                 </Button>
      //               ))}
      //             </div>
      //           </div>
      //         ))}
      //       </div>
      //     </section>

      //     <section className="py-8">
      //       <h2 className="text-2xl font-bold text-center mb-6">Stories That Sweeten the Moment</h2>
      //       <div className="relative overflow-hidden rounded-lg">
      //         {/* Simple slider logic with state/useEffect for rotation */}
      //         <div className="flex transition-transform duration-500" style={{ transform: 'translateX(0%)' }}> {/* Adjust for active index */}
      //           {[
      //             { title: "Vanilla's Journey from Madagascar", img: "/vanilla.png", story: "Sourced from sun-kissed beans, this scoop transports you to creamy horizons—perfect for quiet evenings.", price: 15 },
      //             { title: "Taro's Cozy Embrace", img: "/taro.png", story: "Whispered secrets of purple roots, blended for a hug in every sip.", price: 22 },
      //           ].map((story, i) => (
      //             <div key={i} className="flex-shrink-0 w-full bg-muted p-6 text-center">
      //               <Image src={story.img} alt={story.title} width={300} height={200} className="mx-auto rounded mb-4" />
      //               <h3 className="font-semibold mb-2">{story.title}</h3>
      //               <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
      //               <Button className="mr-2">Dive In – GH₵{story.price}</Button>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </section>

      //     <section className="py-8 bg-primary/5">
      //       <h2 className="text-2xl font-bold text-center mb-6">Just for You, [User]</h2>
      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      //         {[
      //           { name: "Your Chocolate Crush Returns", img: "/chocolate.png", why: "Loved last time? Try the fudge swirl upgrade.", price: 18 },
      //           { name: "Berry Boost for Your Routine", img: "/strawberry.png", why: "Based on your fruity faves—pairs with morning coffee.", price: 16 },
      //         ].map((rec, i) => (
      //           <Card key={i} className="overflow-hidden">
      //             <Image src={rec.img} alt={rec.name} width={400} height={200} className="w-full object-cover" />
      //             <CardContent className="p-4">
      //               <h3 className="font-semibold mb-2">{rec.name}</h3>
      //               <p className="text-sm text-muted-foreground mb-3">{rec.why}</p>
      //               <div className="flex justify-between items-center">
      //                 <span className="text-lg font-bold">GH₵{rec.price}</span>
      //                 <Button size="sm">Add to Craving</Button>
      //               </div>
      //             </CardContent>
      //           </Card>
      //         ))}
      //       </div>
      //     </section>

      //     <section className="py-8 text-center">
      //       <h2 className="text-2xl font-bold mb-6">Feeling Adventurous? Surprise Yourself!</h2>
      //       <div className="relative">
      //         <div className="w-64 h-64 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-spin-slow"> {/* Custom @keyframes for slow spin */}
      //           <div className="absolute inset-0 rounded-full bg-background flex flex-col items-center justify-center">
      //             <span className="text-4xl mb-2">🎲</span>
      //             <p className="text-sm font-medium">Tap to Spin!</p>
      //           </div>
      //         </div>
      //         {/* On click, reveal overlay with random product */}
      //         <div className="mt-6 space-y-2 hidden group-hover:block"> {/* Use state to show after spin */}
      //           <h3 className="font-semibold">Today's Wild Pick: Mint Choco Chill</h3>
      //           <p className="text-sm text-muted-foreground">Cool mint meets crunchy chips—GH₵17. A hidden gem!</p>
      //           <Button>Grab It Now</Button>
      //         </div>
      //       </div>
      //     </section>
      //     <section className="py-8 bg-muted/20">
      //       <h2 className="text-2xl font-bold text-center mb-6">Kumasi's Current Crave</h2>
      //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      //         {[
      //           { user: "Ama K.", product: "Cinnamon Swirl Roll", review: "Rainy day magic—warm & gooey! ❤️", rating: 5 },
      //           { user: "Kojo B.", product: "Pineapple Paradise", review: "Sunny sips for hot afternoons.", rating: 4 },
      //           { user: "Esi A.", product: "Belgian Waffle Classic", review: "Fluffy perfection—crowd fave!", rating: 5 },
      //         ].map((buzz, i) => (
      //           <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
      //             <div className="flex items-center gap-2 mb-2">
      //               <Avatar className="h-8 w-8">
      //                 <AvatarFallback>{buzz.user.charAt(0)}</AvatarFallback>
      //               </Avatar>
      //               <div>
      //                 <p className="font-medium">{buzz.user}</p>
      //                 <div className="flex gap-0.5 text-yellow-500">
      //                   {Array(buzz.rating).fill(0).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
      //                 </div>
      //               </div>
      //             </div>
      //             <p className="font-semibold mb-2">{buzz.product}</p>
      //             <p className="text-sm text-muted-foreground">"{buzz.review}"</p>
      //             <Button variant="ghost" size="sm" className="mt-2 w-full">Try It – GH₵13</Button>
      //           </div>
      //         ))}
      //       </div>
      //     </section>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //     <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
      //     <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
      //     <Link href="/menu">
      //       <Button size="lg">Browse Menu</Button>
      //     </Link>
      //   </div>
      // </main>

        // const handleCheckout = () => {
  //   if (!location) {
  //     toast({
  //       title: "Select Location",
  //       description: "Please select a delivery/pickup location first.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   if (!isValidSchedule()) {
  //     toast({
  //       title: "Invalid Schedule",
  //       description: "Please select a valid date and time slot.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   if (cartItems.length === 1) {
  //     setSelectedProduct(cartItems[0].product)
  //     setDrawerOpen(true)
  //   } else {
  //     // For multiple items, create a combined WhatsApp message
  //     const items = cartItems
  //       .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
  //       .join("\n")
  //     const locationInfo = `${fulfillmentType === "pickup" ? "Pickup" : "Delivery"} at ${location.name}`
  //     const scheduledInfo = `Scheduled for: ${formatScheduledDateTime()}`
  //     const message = encodeURIComponent(
  //       `Hi! I'd like to order:\n\n${items}\n\n${locationInfo}\n${scheduledInfo}\n\nTotal: GH₵ ${total.toFixed(2)}`,
  //     )

  //     addOrder({
  //       items: cartItems,
  //       total,
  //       status: "pending",
  //       fulfillmentType,
  //       location: location.name,
  //       estimatedTime: fulfillmentType === "pickup" ? location.pickupTime : location.deliveryTime,
  //       scheduledDateTime: `${scheduledDate}T${selectedSlot}:00`, // Assuming slot is HH:MM
  //     })

  //     // Mock analytics log
  //     console.log("Order Analytics:", { itemsCount: cartItems.length, total, scheduled: formatScheduledDateTime() })
  //     localStorage.setItem("lastOrderAnalytics", JSON.stringify({ timestamp: Date.now(), ...console.log })) // Mock ops tie-in

  //     window.open(`https://wa.me/233592771234?text=${message}`, "_blank")
  //     clearCart()
  //     setScheduledDate("")
  //     setSelectedSlot("")
  //     toast({
  //       title: "Order Placed",
  //       description: `Your order is scheduled for ${formatScheduledDateTime()}. Check your orders page for details.`,
  //     })
  //   }
  // }


  {/* 
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
                          window.dispatchEvent(new CustomEvent("openLocationModal"))
                        }}
                        className="w-full"
                      >
                        <div className="w-full text-xs bg-transparent h-9 px-4 py-2 has-[>svg]:px- border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
                          Change
                        </div>
                      </button>
                    </div>
                  )} */}
