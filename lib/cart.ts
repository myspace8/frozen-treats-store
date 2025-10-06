import type { Product } from "./products"

export type CartItem = {
  product: Product
  quantity: number
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (product: Product, quantity = 1) => {
  const cart = getCart()
  const existingItem = cart.find((item) => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export const removeFromCart = (productId: string) => {
  const cart = getCart()
  const updatedCart = cart.filter((item) => item.product.id !== productId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart()
  const item = cart.find((item) => item.product.id === productId)

  if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      localStorage.setItem("cart", JSON.stringify(cart))
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }
}

export const clearCart = () => {
  localStorage.removeItem("cart")
  window.dispatchEvent(new Event("cartUpdated"))
}

export const getCartTotal = (): number => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

export const getCartCount = (): number => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}
