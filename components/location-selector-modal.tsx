


"use client"

import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Clock, Map } from "lucide-react"
import {
  deliveryLocations,
  pickupLocations,
  setSelectedLocation,
  setFulfillmentType,
  type DeliveryLocation,
} from "@/lib/delivery-locations"
import { getPickupEstimate } from "@/lib/delivery-locations"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"

type LocationSelectorModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelected?: () => void
}

export function LocationSelectorModal({ open, onOpenChange, onLocationSelected }: LocationSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [fulfillmentType, setLocalFulfillmentType] = useState<"delivery" | "pickup">("delivery")
  const [showSantasiMap, setShowSantasiMap] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Reset search and map when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("")
      setSelectedArea(null)
      setShowSantasiMap(false)
    }
  }, [open])

  // Get unique areas for delivery only
  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(deliveryLocations.map((loc) => loc.area)))
    return uniqueAreas
  }, [])

  // Determine locations based on fulfillment type
  const locations = useMemo(() => {
    return fulfillmentType === "pickup" ? pickupLocations : deliveryLocations
  }, [fulfillmentType])

  // Filter locations based on search and selected area (only for delivery)
  const filteredLocations = useMemo(() => {
    let filtered = locations

    if (fulfillmentType === "delivery") {
      if (selectedArea) {
        filtered = filtered.filter((loc) => loc.area === selectedArea)
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (loc) => loc.name.toLowerCase().includes(query) || loc.area.toLowerCase().includes(query),
        )
      }
    }

    return filtered
  }, [searchQuery, selectedArea, locations, fulfillmentType])

  const handleSelectLocation = (location: DeliveryLocation) => {
    setSelectedLocation(location)
    setFulfillmentType(fulfillmentType)
    onOpenChange(false)
    onLocationSelected?.()
  }

  const isPickupMode = fulfillmentType === "pickup"

  const ModalContent = (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2">
        <Button
          size="sm"
          variant={fulfillmentType === "delivery" ? "default" : "outline"}
          onClick={() => setLocalFulfillmentType("delivery")}
          className="flex-1"
        >
          Delivery
        </Button>
        <Button
          size="sm"
          variant={fulfillmentType === "pickup" ? "default" : "outline"}
          onClick={() => setLocalFulfillmentType("pickup")}
          className="flex-1"
        >
          Pickup
        </Button>
      </div> */}

      {/* Search Input - Only for delivery */}
      {/* {!isPickupMode && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for your location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )} */}

      {/* Area Filter Pills - Only for delivery */}
      {/* {!isPickupMode && (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedArea === null ? "default" : "outline"}
            onClick={() => setSelectedArea(null)}
            className="text-xs"
          >
            All Areas
          </Button>
          {areas.map((area) => (
            <Button
              key={area}
              size="sm"
              variant={selectedArea === area ? "default" : "outline"}
              onClick={() => setSelectedArea(area)}
              className="text-xs"
            >
              {area}
            </Button>
          ))}
        </div>
      )} */}

      {/* Locations List */}
      <div className="md:max-h-[400px] pb-6 overflow-y-auto space-y-2">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No locations found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          filteredLocations.map((location) => {
            // For pickup mode, check if disabled
            const isDisabled = isPickupMode && (location as any).disabled
            const fullAddress = isPickupMode && !isDisabled ? (location as any).fullAddress : undefined
            const hasMap = isPickupMode && location.id === "santasi" // Only Santasi has map

            return (
              <div key={location.id} className="space-y-2">
                <button
                  onClick={() => !isDisabled && handleSelectLocation(location)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-colors",
                    isDisabled
                      ? "bg-muted cursor-not-allowed opacity-50"
                      : "hover:border-primary hover:bg-accent cursor-pointer"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <MapPin className={cn("h-5 w-5 mt-0.5 flex-shrink-0", isDisabled ? "text-muted-foreground" : "text-primary")} />
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm md:text-base", isDisabled ? "text-muted-foreground" : "font-semibold")}>
                          {fullAddress || location.name}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {location.area}
                          {isDisabled && <span className="block mt-1 text-xs italic">Opening soon</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs md:text-sm flex-shrink-0">
                      <Clock className={cn("h-4 w-4", isDisabled ? "text-muted-foreground" : "text-primary")} />
                      <span className="whitespace-nowrap">
                        {isPickupMode ? getPickupEstimate() : location.deliveryTime}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Map for Santasi pickup - expandable */}
                {hasMap && (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-primary hover:text-primary/80"
                      onClick={() => setShowSantasiMap(prev => !prev)}
                    >
                      <Map className="h-3 w-3 mr-2" />
                      {showSantasiMap ? "Hide map" : "See location on map"}
                    </Button>
                    {showSantasiMap && (
                      <div className="w-full rounded-lg overflow-hidden border shadow-sm">
                        {/* Google Maps Embed with vivid pin/marker for Santasi, Next to Opoku Ware School */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.68129356965443!2d-1.643168314992485!3d6.659228151721549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1760760475019!5m2!1sen!2sgh" // Updated with vivid red pin marker; customize by replacing coords or full pb param
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Santasi Pickup Location - Next to Opoku Ware School"
                        />
                        {/* To customize: 
                           - Lat/Lng: 6.663055, -1.645 (approx Opoku Ware School, Santasi, Kumasi, Ghana). 
                           - For precise pin: Use Google Maps > Share > Embed > Copy src, paste here. 
                           - Marker style: Default red pin; for custom, use Google Maps API (requires key) or update pb param via Maps URL generator. */}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              <div className="flex items-center justify-center mb-2">
                <div className="flex gap-2 bg-muted w-fit rounded-md mb-4">
                  <Button
                    size="sm"
                    variant={fulfillmentType === "delivery" ? "default" : "ghost"}
                    onClick={() => setLocalFulfillmentType("delivery")}
                    className="flex-"
                  >
                    Delivery
                  </Button>
                  <Button
                    size="sm"
                    variant={fulfillmentType === "pickup" ? "default" : "ghost"}
                    onClick={() => setLocalFulfillmentType("pickup")}
                    className="flex-"
                  >
                    Pickup
                  </Button>
                </div>
              </div>
              {fulfillmentType === "pickup" ? "Where do you want to pick up your order?" : "Where should we drop off your order?"}            
              </DialogTitle>
            {/* <DialogDescription>
              {fulfillmentType === "pickup"
                ? "Choose your pickup location to see real-time pickup times"
                : "Choose your location to see accurate delivery times"}
            </DialogDescription> */}
          </DialogHeader>
          {ModalContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[75vh] min-h-[75vh] overflow-y-auto rounded-t-md">
        <SheetHeader className="text-cente px-4 pt-10 pb-0">
          <SheetTitle className="text-xl">
            <div className="flex items-center justify-center mb-2">
              <div className="flex gap-2 bg-muted w-fit rounded-md mb-4">
                <Button
                  size="sm"
                  variant={fulfillmentType === "delivery" ? "default" : "ghost"}
                  onClick={() => setLocalFulfillmentType("delivery")}
                  className="flex-"
                >
                  Delivery
                </Button>
                <Button
                  size="sm"
                  variant={fulfillmentType === "pickup" ? "default" : "ghost"}
                  onClick={() => setLocalFulfillmentType("pickup")}
                  className="flex-"
                >
                  Pickup
                </Button>
              </div>
            </div>
              {fulfillmentType === "pickup" ? "Where do you want to pick up your order?" : "Where should we drop off your order?"}            
          </SheetTitle>
          {/* <SheetDescription>
            {fulfillmentType === "pickup"
              ? "Choose your pickup location to see real-time pickup times"
              : "Choose your location to see accurate delivery times"}
          </SheetDescription> */}
        </SheetHeader>
        <div className="px-4">{ModalContent}</div>
      </SheetContent>
    </Sheet>
  )
}