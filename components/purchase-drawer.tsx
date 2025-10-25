"use client"

import type { Product } from "@/lib/products"
import { getSelectedLocation, getFulfillmentType } from "@/lib/delivery-locations"
import { addOrder } from "@/lib/orders"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

type PurchaseDrawerProps = {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  scheduledDateTime?: string | null
  cartItems?: Array<{ product: Product; quantity: number }>
}

export function PurchaseDrawer({ product, open, onOpenChange, scheduledDateTime, cartItems }: PurchaseDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const location = getSelectedLocation()
  const fulfillmentType = getFulfillmentType()

  if (!product) return null

  const handleWhatsAppClick = () => {
    if (!location) {
      console.error("No location selected")
      return
    }

    const itemsToOrder = cartItems || [{ product, quantity: 1 }]
    const totalPrice = itemsToOrder.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    addOrder({
      items: itemsToOrder,
      total: totalPrice,
      status: "pending",
      fulfillmentType,
      location: location.name,
      estimatedTime: fulfillmentType === "pickup" ? location.pickupTime : location.deliveryTime,
      scheduledDateTime: scheduledDateTime || undefined,
    })

    // Mock analytics
    console.log("Single Order Analytics:", {
      items: itemsToOrder.length,
      total: totalPrice,
      scheduled: scheduledDateTime,
    })
    localStorage.setItem("lastSingleOrder", JSON.stringify({ timestamp: Date.now(), productId: product.id }))

    const itemsList = itemsToOrder
      .map((item) => `${item.quantity}× ${item.product.name} (GH₵ ${item.product.price.toFixed(2)})`)
      .join("\n")
    const locationInfo = `${fulfillmentType === "pickup" ? "Pickup" : "Delivery"} at ${location.name}`
    const scheduleInfo = scheduledDateTime ? `\nScheduled for: ${scheduledDateTime}` : ""
    const whatsappMessage = encodeURIComponent(
      `Hi! I'd like to order:\n\n${itemsList}\n\n${locationInfo}${scheduleInfo}\n\nTotal: GH₵ ${totalPrice.toFixed(2)}`,
    )
    const whatsappLink = `https://wa.me/233592771234?text=${whatsappMessage}`

    window.open(whatsappLink, "_blank")
  }

  const hubtelLink = `https://hubtel.com/shop/frozen-treats/${product.id}`
  const boltFoodLink = `https://food.bolt.eu/frozen-treats/${product.id}`

  const sharedContent = (
    <>
      <div className="p-4 space-y-3 md:p-6">
        <a href="#" target="_blank" rel="noopener noreferrer" className="block" onClick={handleWhatsAppClick}>
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-3 md:px-4 bg-transparent" size="lg">
            <MessageCircle className="h-5 w-5 mr-3 text-green-600 flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm md:text-base line-clamp-1">WhatsApp</div>
              <div className="text-xs text-muted-foreground line-clamp-1">Order via WhatsApp chat</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-2 md:ml-auto text-muted-foreground" />
          </Button>
        </a>

        <a href={hubtelLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-3 md:px-4 bg-transparent" size="lg">
            <div className="h-5 w-5 mr-3 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
              H
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm md:text-base line-clamp-1">Hubtel</div>
              <div className="text-xs text-muted-foreground line-clamp-1">Pay with mobile money</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-2 md:ml-auto text-muted-foreground" />
          </Button>
        </a>

        <a href={boltFoodLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-3 md:px-4 bg-transparent" size="lg">
            <div className="h-5 w-5 mr-3 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              B
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold text-sm md:text-base line-clamp-1">Bolt Food</div>
              <div className="text-xs text-muted-foreground line-clamp-1">Order for delivery</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-2 md:ml-auto text-muted-foreground" />
          </Button>
        </a>
      </div>
      <div className="p-4 text-center text-xs text-muted-foreground md:p-6">
        Buy directly through WhatsApp, Hubtel, or Bolt Food for quick and convenient ordering.
      </div>
    </>
  )

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="text-left p-6 border-b">
          <DialogTitle className="text-lg md:text-xl font-bold">Choose Purchase Platform</DialogTitle>
          <DialogDescription className="text-sm">
            Select where you'd like to complete your purchase for {product.name}
          </DialogDescription>
        </DialogHeader>
        {sharedContent}
        <DialogFooter className="p-6 pt-0 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Choose Purchase Platform</DrawerTitle>
          <DrawerDescription>Select where you'd like to complete your purchase for {product.name}</DrawerDescription>
        </DrawerHeader>
        {sharedContent}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
