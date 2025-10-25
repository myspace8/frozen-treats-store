"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getOrders, type Order, type OrderStatus } from "@/lib/orders"
import { addToCart, clearCart } from "@/lib/cart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle, RotateCcw, X } from "lucide-react"
import { cn } from "@/lib/utils"
// import { cancelOrder } from "@/lib/orders"
// import { CancelOrderModal } from "@/components/cancel-order-modal"
// import { toast } from "@/hooks/use-toast"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null)
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  useEffect(() => {
    const loadOrders = () => {
      setOrders(getOrders())
    }

    loadOrders()

    const handleOrderAdded = () => {
      loadOrders()
    }

    const handleOrderUpdated = () => {
      loadOrders()
    }

    window.addEventListener("orderAdded", handleOrderAdded)
    window.addEventListener("orderUpdated", handleOrderUpdated)

    return () => {
      window.removeEventListener("orderAdded", handleOrderAdded)
      window.removeEventListener("orderUpdated", handleOrderUpdated)
    }
  }, [])

  const getStatusMessage = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is awaiting confirmation. We'll update you shortly via WhatsApp."
      case "confirmed":
        return "Great! Your order has been confirmed. We're preparing it now."
      case "preparing":
        return "Your order is being prepared. We'll notify you when it's ready."
      case "ready":
        return "Your order is ready! Please proceed to pick it up or wait for delivery."
      case "completed":
        return "Thank you for your order! We hope you enjoyed your meal."
      case "cancelled":
        return "This order has been cancelled. Contact us via WhatsApp if you have any questions."
      default:
        return "Your order is being processed. To cancel or make changes, please contact us via WhatsApp."
    }
  }

  const handleReorder = (order: Order) => {
    setReorderingOrderId(order.id)
    clearCart()
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity)
    })
    setTimeout(() => {
      router.push("/cart")
    }, 300)
  }

  // const handleCancelOrder = (orderId: string) => {
  //   setCancellingOrderId(orderId)
  //   setCancelModalOpen(true)
  // }

  // const handleConfirmCancel = () => {
  //   if (cancellingOrderId) {
  //     console.log("OrderId Present");
      
  //     try {
  //       cancelOrder(cancellingOrderId)
  //       toast({
  //         title: "Order Cancelled",
  //         description: "Your order has been cancelled successfully.",
  //         variant: "destructive",
  //       })
  //     } catch (error) {
  //       toast({
  //         title: "Cancellation Failed",
  //         description: "Please try again or contact support.",
  //         variant: "destructive",
  //       })
  //       return // Don't close modal on error
  //     }
  //     setTimeout(() => {
  //       setOrders(getOrders()) // Refresh
  //       setCancellingOrderId(null)
  //       setCancelModalOpen(false)
  //     }, 500) // Delay for UX
  //   }
  // }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-purple-100 text-purple-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "preparing":
        return <Package className="h-4 w-4" />
      case "ready":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDate(order.createdAt).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusOptions: (OrderStatus | "all")[] = [
    "all",
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ]

  if (orders.length === 0) {
    return (
      <main className="px-3 pb-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-6">Your orders will appear here once you place them.</p>
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
        <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-16 md:top-48">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Orders</h1>

          <div className="max-w-4xl mx-auto mb-6 space-y-4">
            {/* Search Bar */}
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order number or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div> */}

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                >
                  {status === "all" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 max-w-4xl mx-auto">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No orders found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div
                      className="p-4 md:p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Order {order.id.replace("order-", "#")}
                            </span>
                            <Badge className={cn("text-xs", getStatusColor(order.status))}>
                              <span className="mr-1">{getStatusIcon(order.status)}</span>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-semibold">{formatDate(order.createdAt)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Items</p>
                              <p className="text-sm font-semibold">
                                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="text-sm font-semibold text-primary">GH₵{order.total.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {order.fulfillmentType === "pickup" ? "Pickup" : "Delivery"}
                              </p>
                              <p className="text-sm font-semibold">{order.estimatedTime}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-muted-foreground">{expandedOrderId === order.id ? "▼" : "▶"}</div>
                      </div>
                    </div>

                    {/* Order Details (Expanded) */}
                    {expandedOrderId === order.id && (
                      <div className="border-t p-4 md:p-6 bg-muted/30">
                        {/* Location Info */}
                        <div className="mb-6 p-4 bg-background rounded-lg">
                          <div className="flex items-start gap-3">
                            {order.fulfillmentType === "pickup" ? (
                              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            ) : (
                              <Truck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-muted-foreground uppercase">
                                {order.fulfillmentType === "pickup" ? "Pickup Location" : "Delivery Location"}
                              </p>
                              <p className="text-base font-semibold">{order.location}</p>
                              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Scheduled {order.fulfillmentType === "pickup" ? "pickup" : "delivery"}
                                  {order.scheduledDateTime
                                    ? new Date(order.scheduledDateTime).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold mb-3">Order Items</h3>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex gap-3 p-3 bg-background rounded-lg">
                                <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                                  <Image
                                    src={item.product.image || "/placeholder.svg"}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm line-clamp-1">{item.product.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.product.category}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                    <span className="font-semibold text-sm">
                                      GH₵{(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Total */}
                        <div className="border-t pt-4 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="text-lg font-bold text-primary">GH₵{order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                          <p className="text-sm text-blue-900">
                            <span className="font-semibold">Order Status:</span> {getStatusMessage(order.status)}
                          </p>
                        </div>

                        {/* <div className="flex gap-3">
                          {order.status === "pending" && (
                            <Button
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={cancellingOrderId === order.id}
                              className="flex-1"
                              variant="destructive"
                            >
                              <X className="h-4 w-4 mr-2" />
                              {cancellingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                            </Button>
                          )}
                          {order.status === "completed" && (
                            <Button
                              onClick={() => handleReorder(order)}
                              disabled={reorderingOrderId === order.id}
                              className="flex-1"
                              variant="outline"
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              {reorderingOrderId === order.id ? "Reordering..." : "Reorder"}
                            </Button>
                          )}
                        </div> */}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* <CancelOrderModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        onConfirm={handleConfirmCancel}
        isLoading={cancellingOrderId !== null}
        orderId={cancellingOrderId ?? undefined}
      /> */}
    </>
  )
}
