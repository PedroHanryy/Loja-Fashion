"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/store"
import { X, Trash2 } from "lucide-react"
import Checkout from "./checkout"
import { PRODUCTS } from "@/lib/store"

interface CartProps {
  items: CartItem[]
  onRemove: (productId: string, size: string) => void
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void
  onClose: () => void
}

export default function Cart({ items, onRemove, onUpdateQuantity, onClose }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (showCheckout) {
    return <Checkout items={items} total={total} onBack={() => setShowCheckout(false)} onClose={onClose} />
  }

  return (
    <section className="py-8 md:py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Carrinho de Compras</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId)
                if (!product) return null

                return (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="bg-card rounded-lg p-4 flex gap-4 border border-border"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                      <p className="font-semibold text-primary mt-2">R$ {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-secondary transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-secondary transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.productId, item.size)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-20">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Resumo do Pedido</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete:</span>
                  <span className="font-semibold">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Ir para Pagamento
              </button>

              <button
                onClick={onClose}
                className="w-full mt-3 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
