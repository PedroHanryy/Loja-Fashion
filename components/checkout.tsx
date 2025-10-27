"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/store"
import { ChevronLeft } from "lucide-react"
import PaymentPix from "./payment-pix"
import PaymentCash from "./payment-cash"
import PaymentCard from "./payment-card"

interface CheckoutProps {
  items: CartItem[]
  total: number
  onBack: () => void
  onClose: () => void
}

export default function Checkout({ items, total, onBack, onClose }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "dinheiro" | "cartao" | null>(null)
  const orderId = "KELLY-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <section className="py-8 md:py-12 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-primary hover:opacity-70 transition mb-8">
          <ChevronLeft size={20} />
          Voltar
        </button>

        <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Escolha o Método de Pagamento</h2>

        {!paymentMethod ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pix Option */}
            <button
              onClick={() => setPaymentMethod("pix")}
              className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left group"
            >
              <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-110 transition">Pix</div>
              <p className="text-sm text-muted-foreground mb-4">Transferência instantânea</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Rápido e seguro</li>
                <li>✓ Sem taxas</li>
                <li>✓ Confirmação imediata</li>
              </ul>
            </button>

            {/* Cash Option */}
            <button
              onClick={() => setPaymentMethod("dinheiro")}
              className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left group"
            >
              <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-110 transition">Dinheiro</div>
              <p className="text-sm text-muted-foreground mb-4">Pagamento na entrega</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Sem juros</li>
                <li>✓ Flexível</li>
                <li>✓ Seguro</li>
              </ul>
            </button>

            {/* Card Option */}
            <button
              onClick={() => setPaymentMethod("cartao")}
              className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left group"
            >
              <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-110 transition">Cartão</div>
              <p className="text-sm text-muted-foreground mb-4">Débito ou crédito</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Até 12 parcelas</li>
                <li>✓ Seguro</li>
                <li>✓ Rápido</li>
              </ul>
            </button>
          </div>
        ) : paymentMethod === "pix" ? (
          <PaymentPix total={total} onBack={() => setPaymentMethod(null)} onClose={onClose} orderId={orderId} />
        ) : paymentMethod === "dinheiro" ? (
          <PaymentCash total={total} onBack={() => setPaymentMethod(null)} onClose={onClose} orderId={orderId} />
        ) : (
          <PaymentCard total={total} onBack={() => setPaymentMethod(null)} onClose={onClose} orderId={orderId} />
        )}
      </div>
    </section>
  )
}
