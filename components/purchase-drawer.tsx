"use client"

import type { Product } from "@/lib/products"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink } from "lucide-react"

type PurchaseDrawerProps = {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseDrawer({ product, open, onOpenChange }: PurchaseDrawerProps) {
  if (!product) return null

  const whatsappMessage = encodeURIComponent(`Hi! I'd like to order ${product.name} (GH₵ ${product.price.toFixed(2)})`)
  const whatsappLink = `https://wa.me/233592771234?text=${whatsappMessage}`
  const hubtelLink = `https://hubtel.com/shop/sweet-treats/${product.id}`
  const boltFoodLink = `https://food.bolt.eu/sweet-treats/${product.id}`

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Choose Purchase Platform</DrawerTitle>
          <DrawerDescription>Select where you'd like to complete your purchase for {product.name}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-3">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent" size="lg">
              <MessageCircle className="h-5 w-5 mr-3 text-green-600" />
              <div className="text-left">
                <div className="font-semibold">WhatsApp</div>
                <div className="text-xs text-muted-foreground">Order via WhatsApp chat</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a href={hubtelLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent" size="lg">
              <div className="h-5 w-5 mr-3 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                H
              </div>
              <div className="text-left">
                <div className="font-semibold">Hubtel</div>
                <div className="text-xs text-muted-foreground">Pay with mobile money</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>

          <a href={boltFoodLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent" size="lg">
              <div className="h-5 w-5 mr-3 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <div className="text-left">
                <div className="font-semibold">Bolt Food</div>
                <div className="text-xs text-muted-foreground">Order for delivery</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </a>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
