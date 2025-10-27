"use client"

import type { CartItem } from "@/lib/store"
import { PRODUCTS } from "@/lib/store"

interface CartSummaryProps {
  items: CartItem[]
  onCheckout?: () => void
  isLoading?: boolean
}

export default function CartSummary({ items, onCheckout, isLoading }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-card rounded-lg p-6 border border-border space-y-4">
      <h3 className="font-serif text-xl font-bold text-foreground">Resumo do Pedido</h3>

      {/* Items Summary */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId)
          return (
            <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {product?.name} ({item.size}) x{item.quantity}
              </span>
              <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} itens):</span>
          <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete:</span>
          <span className="font-semibold text-accent">Grátis</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
          <span>Total:</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      {onCheckout && (
        <button
          onClick={onCheckout}
          disabled={items.length === 0 || isLoading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            items.length === 0 || isLoading
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {isLoading ? "Processando..." : "Ir para Pagamento"}
        </button>
      )}
    </div>
  )
}
