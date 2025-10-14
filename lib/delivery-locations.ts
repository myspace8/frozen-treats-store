export type DeliveryLocation = {
  id: string
  name: string
  area: string
  deliveryTime: string // e.g., "15-20 min"
}

// Hard-coded delivery locations in Kumasi, Ghana
// To add more locations: Simply add new objects to this array with id, name, area, and deliveryTime
export const deliveryLocations: DeliveryLocation[] = [
  // Central Kumasi
  { id: "adum", name: "Adum", area: "Central Kumasi", deliveryTime: "20-25 min" },
  { id: "kejetia", name: "Kejetia", area: "Central Kumasi", deliveryTime: "20-25 min" },
  { id: "asafo", name: "Asafo", area: "Central Kumasi", deliveryTime: "15-20 min" },

  // North Kumasi
  { id: "santasi", name: "Santasi", area: "North Kumasi", deliveryTime: "10-15 min" },
  { id: "ahodwo", name: "Ahodwo", area: "North Kumasi", deliveryTime: "15-20 min" },
  { id: "nhyiaeso", name: "Nhyiaeso", area: "North Kumasi", deliveryTime: "20-25 min" },
  { id: "suame", name: "Suame", area: "North Kumasi", deliveryTime: "25-30 min" },

  // South Kumasi
  { id: "asokwa", name: "Asokwa", area: "South Kumasi", deliveryTime: "20-25 min" },
  { id: "atonsu", name: "Atonsu", area: "South Kumasi", deliveryTime: "25-30 min" },
  { id: "kwadaso", name: "Kwadaso", area: "South Kumasi", deliveryTime: "20-25 min" },

  // East Kumasi
  { id: "ayigya", name: "Ayigya", area: "East Kumasi", deliveryTime: "25-30 min" },
  { id: "maxima", name: "Maxima", area: "East Kumasi", deliveryTime: "20-25 min" },
  { id: "knust", name: "KNUST Campus", area: "East Kumasi", deliveryTime: "25-30 min" },

  // West Kumasi
  { id: "abrepo", name: "Abrepo", area: "West Kumasi", deliveryTime: "15-20 min" },
  { id: "bantama", name: "Bantama", area: "West Kumasi", deliveryTime: "20-25 min" },
  { id: "subin", name: "Subin", area: "West Kumasi", deliveryTime: "20-25 min" },

  // Residential Areas
  { id: "north-legon", name: "North Legon", area: "Residential", deliveryTime: "30-35 min" },
  { id: "tanoso", name: "Tanoso", area: "Residential", deliveryTime: "30-35 min" },
  { id: "emena", name: "Emena", area: "Residential", deliveryTime: "25-30 min" },
  { id: "bomso", name: "Bomso", area: "Residential", deliveryTime: "25-30 min" },
]

// LocalStorage key for selected location
const LOCATION_STORAGE_KEY = "frozen-treats-delivery-location"

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
