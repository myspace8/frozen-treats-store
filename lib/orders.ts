import type { CartItem } from "@/lib/cart"

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"

export type Order = {
  id: string
  items: CartItem[]
  total: number
  status: OrderStatus
  fulfillmentType: "delivery" | "pickup"
  location: string
  estimatedTime: string
  createdAt: string
  customerName?: string
  customerPhone?: string
  notes?: string
}

const ORDERS_STORAGE_KEY = "frozen-treats-orders"

export function getOrders(): Order[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(ORDERS_STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function addOrder(order: Omit<Order, "id" | "createdAt">): Order {
  if (typeof window === "undefined") throw new Error("Cannot add order on server")

  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  const orders = getOrders()
  orders.unshift(newOrder) // Add to beginning for newest first
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))

  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent("orderAdded", { detail: newOrder }))

  return newOrder
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  if (typeof window === "undefined") return

  const orders = getOrders()
  const order = orders.find((o) => o.id === orderId)

  if (order) {
    order.status = status
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    window.dispatchEvent(new CustomEvent("orderUpdated", { detail: order }))
  }
}

export function getOrderById(orderId: string): Order | undefined {
  return getOrders().find((o) => o.id === orderId)
}
