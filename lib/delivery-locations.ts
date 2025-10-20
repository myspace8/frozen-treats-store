export type DeliveryLocation = {
  id: string
  name: string
  area: string
  deliveryTime: string // e.g., "15-20 min"
  pickupTime: string // e.g., "5-10 min"
}

// Hard-coded delivery locations in Kumasi, Ghana
// To add more locations: Simply add new objects to this array with id, name, area, deliveryTime, and pickupTime
export const deliveryLocations: DeliveryLocation[] = [
  // Central Kumasi
  { id: "adum", name: "Adum", area: "Central Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "kejetia", name: "Kejetia", area: "Central Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "asafo", name: "Asafo", area: "Central Kumasi", deliveryTime: "15-20 min", pickupTime: "5-10 min" },

  // North Kumasi
  { id: "santasi", name: "Santasi", area: "North Kumasi", deliveryTime: "10-15 min", pickupTime: "5-10 min" },
  { id: "ahodwo", name: "Ahodwo", area: "North Kumasi", deliveryTime: "15-20 min", pickupTime: "5-10 min" },
  { id: "nhyiaeso", name: "Nhyiaeso", area: "North Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "suame", name: "Suame", area: "North Kumasi", deliveryTime: "25-30 min", pickupTime: "5-10 min" },

  // South Kumasi
  { id: "asokwa", name: "Asokwa", area: "South Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "atonsu", name: "Atonsu", area: "South Kumasi", deliveryTime: "25-30 min", pickupTime: "5-10 min" },
  { id: "kwadaso", name: "Kwadaso", area: "South Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },

  // East Kumasi
  { id: "ayigya", name: "Ayigya", area: "East Kumasi", deliveryTime: "25-30 min", pickupTime: "5-10 min" },
  { id: "maxima", name: "Maxima", area: "East Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "knust", name: "KNUST Campus", area: "East Kumasi", deliveryTime: "25-30 min", pickupTime: "5-10 min" },

  // West Kumasi
  { id: "abrepo", name: "Abrepo", area: "West Kumasi", deliveryTime: "15-20 min", pickupTime: "5-10 min" },
  { id: "bantama", name: "Bantama", area: "West Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },
  { id: "subin", name: "Subin", area: "West Kumasi", deliveryTime: "20-25 min", pickupTime: "5-10 min" },

  // Residential Areas
  { id: "north-legon", name: "North Legon", area: "Residential", deliveryTime: "30-35 min", pickupTime: "5-10 min" },
  { id: "tanoso", name: "Tanoso", area: "Residential", deliveryTime: "30-35 min", pickupTime: "5-10 min" },
  { id: "emena", name: "Emena", area: "Residential", deliveryTime: "25-30 min", pickupTime: "5-10 min" },
  { id: "bomso", name: "Bomso", area: "Residential", deliveryTime: "25-30 min", pickupTime: "5-10 min" },
]

// Pickup-specific locations (only 4, with Santasi enabled and others disabled)
export const pickupLocations: (DeliveryLocation & { disabled?: boolean; fullAddress?: string })[] = [
  {
    id: "santasi",
    name: "Santasi",
    fullAddress: "Santasi, Next to Opoku Ware School",
    area: "North Kumasi",
    deliveryTime: "10-15 min",
    pickupTime: "5-10 min",
    disabled: false,
  },
  {
    id: "ahodwo",
    name: "Ahodwo",
    area: "North Kumasi",
    deliveryTime: "15-20 min",
    pickupTime: "5-10 min",
    disabled: true,
  },
  {
    id: "asokwa",
    name: "Asokwa",
    area: "South Kumasi",
    deliveryTime: "20-25 min",
    pickupTime: "5-10 min",
    disabled: true,
  },
  {
    id: "knust",
    name: "KNUST Campus",
    area: "East Kumasi",
    deliveryTime: "25-30 min",
    pickupTime: "5-10 min",
    disabled: true,
  },
]

// LocalStorage keys
const LOCATION_STORAGE_KEY = "frozen-treats-delivery-location"
const FULFILLMENT_TYPE_KEY = "frozen-treats-fulfillment-type" // "delivery" or "pickup"

export function getSelectedLocation(): DeliveryLocation | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(LOCATION_STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function setSelectedLocation(location: DeliveryLocation): void {
  if (typeof window === "undefined") return
  localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location))

  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent("locationUpdated"))
}

export function clearSelectedLocation(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(LOCATION_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent("locationUpdated"))
}

export function getFulfillmentType(): "delivery" | "pickup" {
  if (typeof window === "undefined") return "delivery"
  return (localStorage.getItem(FULFILLMENT_TYPE_KEY) as "delivery" | "pickup") || "delivery"
}

export function setFulfillmentType(type: "delivery" | "pickup"): void {
  if (typeof window === "undefined") return
  localStorage.setItem(FULFILLMENT_TYPE_KEY, type)
  window.dispatchEvent(new CustomEvent("fulfillmentTypeUpdated"))
}

export function getPickupEstimate(): string {
  if (typeof window === "undefined") return "Ready in 15 min"

  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // Store hours: 9 AM - 9 PM
  const storeOpensAt = 9
  const storeClosesAt = 21

  // If store is closed, show when it opens
  if (hours < storeOpensAt) {
    return `Opens at ${storeOpensAt}:00 AM`
  }
  if (hours >= storeClosesAt) {
    return "Closed - Opens at 9:00 AM"
  }

  // During business hours, calculate queue-based estimate
  // This is a simple simulation - in production, this would come from a backend
  const timeOfDay = hours + minutes / 60
  let baseEstimate = 15 // Base 15 minutes

  // Peak hours (12-2 PM, 6-8 PM) - add 5-10 minutes
  if ((timeOfDay >= 12 && timeOfDay < 14) || (timeOfDay >= 18 && timeOfDay < 20)) {
    baseEstimate += Math.floor(Math.random() * 5) + 5
  }
  // Off-peak hours - reduce by 5 minutes
  else if ((timeOfDay >= 9 && timeOfDay < 11) || (timeOfDay >= 14 && timeOfDay < 18)) {
    baseEstimate = Math.max(10, baseEstimate - 5)
  }

  return `Ready in ${baseEstimate} min`
}
