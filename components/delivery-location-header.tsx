"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSelectedLocation, type DeliveryLocation, getFulfillmentType } from "@/lib/delivery-locations"
import { LocationSelectorModal } from "@/components/location-selector-modal"

export function DeliveryLocationHeader() {
  const [location, setLocation] = useState<DeliveryLocation | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery")
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Load initial location and fulfillment type
    setLocation(getSelectedLocation())
    setFulfillmentType(getFulfillmentType())

    // Listen for location and fulfillment type updates
    const handleLocationUpdate = () => {
      setLocation(getSelectedLocation())
    }

    const handleFulfillmentUpdate = () => {
      setFulfillmentType(getFulfillmentType())
    }

    const handleOpenModal = () => {
      setModalOpen(true)
    }

    window.addEventListener("locationUpdated", handleLocationUpdate)
    window.addEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
    window.addEventListener("openLocationModal", handleOpenModal)
    return () => {
      window.removeEventListener("locationUpdated", handleLocationUpdate)
      window.removeEventListener("fulfillmentTypeUpdated", handleFulfillmentUpdate)
      window.removeEventListener("openLocationModal", handleOpenModal)
    }
  }, [])

  const displayText = fulfillmentType === "pickup" ? "Pickup at" : "Delivering to"

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setModalOpen(true)}
        className="flex flex-col items-start hover:bg-accent gap-0 px-0 md:px-0 h-auto py-2"
      >
        <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wide">{displayText}</span>
        <div className="flex justify-center items-center gap-0.5">
          <span className="font-semibold text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
            {location ? location.name : "Select location"}
          </span>
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-primary" />
        </div>
      </Button>

      <LocationSelectorModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
