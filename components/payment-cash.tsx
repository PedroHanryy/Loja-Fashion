"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"

interface PaymentCashProps {
  total: number
  onBack: () => void
  onClose: () => void
  orderId?: string
}

export default function PaymentCash({ total, onBack, onClose, orderId }: PaymentCashProps) {
  const router = useRouter()
  const [cashAmount, setCashAmount] = useState("")
  const [change, setChange] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCalculateChange = () => {
    const amount = Number.parseFloat(cashAmount)
    if (isNaN(amount) || amount < total) {
      alert("Por favor, insira um valor válido maior ou igual ao total")
      return
    }
    setChange(amount - total)
  }

  const handleConfirmPayment = async () => {
    if (change === null) {
      alert("Por favor, calcule o troco primeiro")
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const confirmOrderId = orderId || "KELLY-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/order-confirmation?orderId=${confirmOrderId}&total=${total.toFixed(2)}&method=dinheiro`)
    onClose()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg p-8 border border-border space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Pagamento em Dinheiro</h3>
          <p className="text-muted-foreground">Você pagará em dinheiro na entrega</p>
        </div>

        {/* Amount */}
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Valor a pagar:</p>
          <p className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</p>
        </div>

        {/* Cash Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Quanto você vai pagar em dinheiro?</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-3 text-muted-foreground font-semibold">R$</span>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => {
                  setCashAmount(e.target.value)
                  setChange(null)
                }}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg"
                step="0.01"
                min="0"
              />
            </div>
            <button
              onClick={handleCalculateChange}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
            >
              Calcular Troco
            </button>
          </div>
        </div>

        {/* Change Display */}
        {change !== null && (
          <div className="bg-accent/10 rounded-lg p-4 space-y-2 border border-accent/20">
            <p className="text-sm text-muted-foreground">Troco:</p>
            <p className="text-3xl font-bold text-accent">R$ {change.toFixed(2)}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-primary/10 rounded-lg p-4 space-y-3">
          <p className="font-semibold text-foreground">Informações importantes:</p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Pagamento será realizado na entrega</li>
            <li>Tenha o valor exato ou troco disponível</li>
            <li>Seu pedido será confirmado após o pagamento</li>
            <li>Você receberá um comprovante de entrega</li>
          </ul>
        </div>

        {/* Security Info */}
        <div className="bg-accent/10 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Segurança</p>
          <p>Nossos entregadores são treinados e identificados. Verifique a identidade antes de pagar.</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onBack}
            disabled={isProcessing}
            className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition disabled:opacity-50"
          >
            Voltar
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={change === null || isProcessing}
            className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              change === null || isProcessing
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {isProcessing ? (
              <>
                <Loader size={18} className="animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar Pedido"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
