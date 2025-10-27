"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import type { CartItem } from "@/lib/store"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && i.size === item.size)
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
    } else {
      setCartItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i)))
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => router.push("/")} />
        <div className="py-16 text-center">
          <p className="text-muted-foreground">Carregando carrinho...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartItems.length} onCartClick={() => router.push("/")} />
      <div className="flex-1">
        <Cart
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onClose={() => router.push("/")}
        />
      </div>
      <Footer />
    </main>
  )
}
