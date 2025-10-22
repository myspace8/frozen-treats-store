"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { getCart, getCartTotal, removeFromCart, updateCartQuantity, clearCart } from "@/lib/cart"
import { getSelectedLocation, getFulfillmentType, type DeliveryLocation } from "@/lib/delivery-locations"
import { addOrder } from "@/lib/orders"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Truck, MapPin, Calendar, Clock, AlertCircle } from "lucide-react"
import { PurchaseDrawer } from "@/components/purchase-drawer"
import type { Product } from "@/lib/products"
import type { CartItem } from "@/lib/cart"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery")
  const [scheduledDate, setScheduledDate] = useState<string>("")
  const [selectedSlot, setSelectedSlot] = useState<string>("") // e.g., "10:00 AM"
  const [availability, setAvailability] = useState<Record<string, number>>({}) // Mock: { "2025-10-20_10:00": 3 } (remaining slots)
  const [isInstant, setIsInstant] = useState<boolean>(false);
  const { toast } = useToast()

  // Mock business hours: Mon-Sat 9AM-9PM, Sun 10AM-6PM, 30-min slots
  const BUSINESS_HOURS = {
    monSat: { open: 9, close: 21 },
    sun: { open: 10, close: 18 },
  }
  const SLOT_INTERVAL = 30 // minutes
  const CAPACITY = fulfillmentType === "pickup" ? 5 : 3 // per slot
  const MAX_DAYS = 30

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart())
      setTotal(getCartTotal())
    }

    setLocation(getSelectedLocation())
    setFulfillmentType(getFulfillmentType())

    // Load mock availability from localStorage (simulate bookings)
    const storedAvail = localStorage.getItem("mockAvailability")
    setAvailability(storedAvail ? JSON.parse(storedAvail) : {})

    updateCart()
    window.addEventListener("cartUpdated", updateCart)

    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    const handleFulfillmentUpdate = () => {
      setFulfillmentType(getFulfillmentType())
      setScheduledDate("")
      setSelectedSlot("")
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    window.addEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)

    return () => {
      window.removeEventListener("cartUpdated", updateCart)
      window.removeEventListener("locationUpdated", handleLocationUpdate)
      window.removeEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
    }
  }, [])

  // Generate available slots for a date
  const getSlotsForDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = date.getDay() // 0=Sun, 1=Mon, etc.
    const hours = day === 0 ? BUSINESS_HOURS.sun : BUSINESS_HOURS.monSat
    const slots: string[] = []

    for (let h = hours.open; h < hours.close; h++) {
      for (let m = 0; m < 60; m += SLOT_INTERVAL) {
        const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
        const slotKey = `${dateStr}_${timeStr}`
        const remaining = CAPACITY - (availability[slotKey] || 0)
        if (remaining > 0) slots.push(timeStr)
      }
    }
    return slots
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + MAX_DAYS)
    return maxDate.toISOString().split("T")[0]
  }

  // Convert 24h time to 12h AM/PM
  const convertToAMPM = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hour12 = hours % 12 || 12
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  const formatScheduledDateTime = () => {
    if (!scheduledDate || !selectedSlot) return null
    const date = new Date(scheduledDate)
    const today = new Date().toISOString().split("T")[0]
    const dateStr = scheduledDate === today
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    const timeAMPM = convertToAMPM(selectedSlot)
    return `${dateStr} at ${timeAMPM}`
  }

  const isValidSchedule = () => {
    if (isInstant) return true; // Instant orders are always valid
    if (!scheduledDate || !selectedSlot) return false;
    const slots = getSlotsForDate(scheduledDate);
    return slots.includes(selectedSlot);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    })
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(productId)
      return
    }
    updateCartQuantity(productId, newQuantity)
  }

  const handleCheckout = () => {
    if (!location) {
      toast({
        title: "Select Location",
        description: "Please select a delivery/pickup location first.",
        variant: "destructive",
      });
      return;
    }

    if (isInstant) {
      // Handle instant order
      if (cartItems.length === 1) {
        setSelectedProduct(cartItems[0].product);
        setDrawerOpen(true);
      } else {
        const items = cartItems
          .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
          .join("\n");
        const locationInfo = `${fulfillmentType === "pickup" ? "Pickup" : "Delivery"} at ${location.name}`;
        const instantInfo = `Instant ${fulfillmentType === "pickup" ? "Pickup - Ready in 20-30 mins" : "Delivery - 40-60 mins"}`;
        const message = encodeURIComponent(
          `Hi! I'd like to order:\n\n${items}\n\n${locationInfo}\n${instantInfo}\n\nTotal: GH₵ ${total.toFixed(2)}`,
        );

        addOrder({
          items: cartItems,
          total,
          status: "pending",
          fulfillmentType,
          location: location.name,
          estimatedTime: fulfillmentType === "pickup" ? "20-30 mins" : "40-60 mins",
        });

        console.log("Order Analytics:", { itemsCount: cartItems.length, total, instant: true });
        localStorage.setItem("lastOrderAnalytics", JSON.stringify({ timestamp: Date.now(), ...console.log }));

        window.open(`https://wa.me/233592771234?text=${message}`, "_blank");
        // clearCart(); // Commented out to retain cart for instant orders
        setScheduledDate("");
        setSelectedSlot("");
        toast({
          title: "Order Placed",
          description: `Your ${fulfillmentType} is on its way! Estimated ${fulfillmentType === "pickup" ? "ready in 20-30 mins" : "delivery in 40-60 mins"}.`,
        });
      }
      return;
    }

    if (!isValidSchedule()) {
      toast({
        title: "Invalid Schedule",
        description: "Please select a valid date and time slot.",
        variant: "destructive",
      });
      return;
    }

    // Handle scheduled order
    if (cartItems.length === 1) {
      setSelectedProduct(cartItems[0].product);
      setDrawerOpen(true);
    } else {
      const items = cartItems
        .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
        .join("\n");
      const locationInfo = `${fulfillmentType === "pickup" ? "Pickup" : "Delivery"} at ${location.name}`;
      const scheduledInfo = `Scheduled for ${formatScheduledDateTime()}`;
      const message = encodeURIComponent(
        `Hi! I'd like to order:\n\n${items}\n\n${locationInfo}\n${scheduledInfo}\n\nTotal: GH₵ ${total.toFixed(2)}`,
      );

      addOrder({
        items: cartItems,
        total,
        status: "pending",
        fulfillmentType,
        location: location.name,
        estimatedTime: fulfillmentType === "pickup" ? location.pickupTime : location.deliveryTime,
        scheduledDateTime: formatScheduledDateTime() || undefined,
      });

      console.log("Order Analytics:", { itemsCount: cartItems.length, total, instant: false, scheduledDateTime: formatScheduledDateTime() });
      localStorage.setItem("lastOrderAnalytics", JSON.stringify({ timestamp: Date.now(), ...console.log }));

      window.open(`https://wa.me/233592771234?text=${message}`, "_blank");
      // clearCart(); // Commented out to retain cart for scheduled orders
      setScheduledDate("");
      setSelectedSlot("");
      toast({
        title: "Order Scheduled",
        description: `Your ${fulfillmentType} has been scheduled for ${formatScheduledDateTime()}.`,
      });
    }
  }


  // Update availability on slot selection (mock booking)
  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
    const slotKey = `${scheduledDate}_${slot}`
    const newAvail = { ...availability, [slotKey]: (availability[slotKey] || 0) + 1 }
    setAvailability(newAvail)
    localStorage.setItem("mockAvailability", JSON.stringify(newAvail)) // Persist mock
  }

  if (cartItems.length === 0) {
    return (
      <main className="px-3 pb-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center py-12">
          <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">You haven't added any items yet.</p>
          <Link href="/menu">
            <Button size="lg" className="px-8">
              See the Menu
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="px-3 pb-8 min-h-screen">
        <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48 text-center py-12">
          <div className="grid lg:grid-cols-3 gap-6">
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

                      <div className="flex-1 text-left min-w-0">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-sm md:text-base hover:text-primary transition-colors line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{item.product.category}</p>
                        <p className="font-bold text-primary text-sm md:text-base">
                          <span className="text-xs">GH₵</span>
                          {item.product.price.toFixed(2)}
                        </p>
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
                  {/* Scheduling Section */}
                  <div className="mb-6 p-4 bg-muted rounded-lg border border-muted-foreground/20">
                    {/* <Calendar className="h-6 w-6 text-primary" /> */}
                    <div className="flex flex-col items-cente gap-2 my-3">
                      <p className="text-sm text-left font-semibold text-muted-foreground mb-1">
                        {fulfillmentType === "pickup" ? "When do you want to pick up your order?" : "When do you want your order delivered?"}
                      </p>
                      <div className="flex flex-col mb-4 w-full">
                        <div className="flex gap- bg-background w-fit rounded-md mb-1">
                            <Button
                              variant={isInstant ? "default" : "ghost"}
                              className="w-1/2 hover:bg-"
                              onClick={() => {
                                setIsInstant(true);
                                setScheduledDate("");
                                setSelectedSlot("");
                              }}
                            >
                              {fulfillmentType === "pickup" ? "Pick Up Now" : "Deliver Now"}
                            </Button>
                          <Button
                            variant={!isInstant ? "default" : "ghost"}
                            className="w-1/2 hover:bg-"
                            onClick={() => {
                              setIsInstant(false);
                              setScheduledDate(getMinDate());
                              setSelectedSlot("");
                            }}
                          >
                            {fulfillmentType === "pickup" ? "Pick Up Later" : "Deliver Later"}
                          </Button>
                        </div>
                      {isInstant && 
                        <p className="text-xs text-left text-primary">
                          {fulfillmentType === "pickup" ? "Ready in 20-30 mins" : "Delivery in 40-60 mins"}
                        </p>
                      }
                      </div>
                    </div>

                    {/* Date Picker */}
                    {!isInstant && <div className="mb-3">
                      <label className="text-xs text-left font-medium text-muted-foreground mb-1 block">
                        Pick a date
                      </label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => {
                          setScheduledDate(e.target.value);
                          setSelectedSlot(""); // Reset slot on date change
                        }}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        // disabled={isInstant}
                      />
                    </div>}

                    {/* Slots Dropdown with Availability */}
                    {scheduledDate && (
                      <div className="mb-3">
                        <label className="text-xs text-left font-medium text-muted-foreground mb-1 block">
                          Select time Slot ({getSlotsForDate(scheduledDate).length} available)
                        </label>
                        <select
                          value={selectedSlot}
                          onChange={(e) => handleSlotSelect(e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          disabled={isInstant}
                        >
                          <option value="">Select a time</option>
                          {getSlotsForDate(scheduledDate).map((slot) => {
                            const slotKey = `${scheduledDate}_${slot}`;
                            const remaining = CAPACITY - (availability[slotKey] || 0);
                            const isLimited = remaining <= 1;
                            return (
                              <option
                                key={slot}
                                value={slot}
                                disabled={remaining === 0}
                              >
                                {slot} {remaining < CAPACITY && `(${remaining} spots left)`}
                                {isLimited && " ⚠️"}
                              </option>
                            );
                          })}
                        </select>
                        {!isValidSchedule() && selectedSlot && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Slot full or invalid—choose another
                          </p>
                        )}
                      </div>
                    )}

                    {/* Summary Preview */}
                    {formatScheduledDateTime() && (
                      <div className="p-3 bg-primary/5 rounded-md border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Confirmed:</p>
                        <p className="text-sm font-semibold text-primary">{formatScheduledDateTime()}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs md:text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}× {item.product.name}
                        </span>
                        <span className="font-medium">
                          <span className="text-xs">GH₵</span>
                          {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-base md:text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        <span className="text-xs">GH₵</span>
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mb-3"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!isValidSchedule()}
                  >
                    Proceed to Order
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      clearCart()
                      setScheduledDate("")
                      setSelectedSlot("")
                      toast({
                        title: "Cart cleared",
                        description: "All items have been removed from your cart.",
                      })
                    }}
                  >
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <PurchaseDrawer
        product={selectedProduct}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        scheduledDateTime={formatScheduledDateTime()}
      />
    </>
  )
}