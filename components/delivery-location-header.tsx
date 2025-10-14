"use client"

import { useState, useEffect } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSelectedLocation, type DeliveryLocation } from "@/lib/delivery-locations"
import { LocationSelectorModal } from "@/components/location-selector-modal"

export function DeliveryLocationHeader() {
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Load initial location
    setLocation(getSelectedLocation())

    // Listen for location updates
    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    return () => window.removeEventListener("locationUpdated", handleLocationUpdate)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 hover:bg-accent px-2 md:px-3 h-auto py-2"
      >
        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">Delivering to</span>
          <span className="font-semibold text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
            {location ? location.name : "Select location"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 flex-shrink-0" />
      </Button>

      <LocationSelectorModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
