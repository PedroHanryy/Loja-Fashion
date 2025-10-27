"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Collections from "@/components/collections"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
import type { CartItem } from "@/lib/store"

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

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

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
      {showCart ? (
        <Cart
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onClose={() => setShowCart(false)}
        />
      ) : (
        <>
          <Hero />
          <Collections onAddToCart={addToCart} />
        </>
      )}
      <Footer />
    </main>
  )
}
