"use client"

import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Clock } from "lucide-react"
import { deliveryLocations, setSelectedLocation, type DeliveryLocation } from "@/lib/delivery-locations"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

type LocationSelectorModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelected?: () => void
}

export function LocationSelectorModal({ open, onOpenChange, onLocationSelected }: LocationSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Reset search when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("")
      setSelectedArea(null)
    }
  }, [open])

  // Get unique areas
  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(deliveryLocations.map((loc) => loc.area)))
    return uniqueAreas
  }, [])

  // Filter locations based on search and selected area
  const filteredLocations = useMemo(() => {
    let filtered = deliveryLocations

    if (selectedArea) {
      filtered = filtered.filter((loc) => loc.area === selectedArea)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (loc) => loc.name.toLowerCase().includes(query) || loc.area.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [searchQuery, selectedArea])

  const handleSelectLocation = (location: DeliveryLocation) => {
    setSelectedLocation(location)
    onOpenChange(false)
    onLocationSelected?.()
  }

  const ModalContent = (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for your location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Area Filter Pills */}
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

      {/* Locations List */}
      <div className="max-h-[400px] overflow-y-auto space-y-2">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No locations found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelectLocation(location)}
              className={cn(
                "w-full text-left p-4 rounded-lg border hover:border-primary hover:bg-accent transition-colors",
                "flex items-center justify-between gap-4",
              )}
            >
              <div className="flex items-start gap-3 flex-1">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base">{location.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{location.area}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground flex-shrink-0">
                <Clock className="h-4 w-4" />
                <span className="whitespace-nowrap">{location.deliveryTime}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Select Your Delivery Location</DialogTitle>
            <DialogDescription>Choose your location to see accurate delivery times</DialogDescription>
          </DialogHeader>
          {ModalContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">Select Your Delivery Location</DrawerTitle>
          <DrawerDescription>Choose your location to see accurate delivery times</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6">{ModalContent}</div>
      </DrawerContent>
    </Drawer>
  )
}
