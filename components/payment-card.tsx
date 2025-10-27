"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"

interface PaymentCardProps {
  total: number
  onBack: () => void
  onClose: () => void
  orderId?: string
}

export default function PaymentCard({ total, onBack, onClose, orderId }: PaymentCardProps) {
  const router = useRouter()
  const [cardType, setCardType] = useState<"debito" | "credito" | null>(null)
  const [installments, setInstallments] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  })

  const maxInstallments = cardType === "credito" ? 12 : 1
  const installmentValue = total / installments

  const handleCardChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfirmPayment = async () => {
    if (!cardType) {
      alert("Por favor, selecione débito ou crédito")
      return
    }
    if (!cardData.number || !cardData.holder || !cardData.expiry || !cardData.cvv) {
      alert("Por favor, preencha todos os dados do cartão")
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const confirmOrderId = orderId || "KELLY-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/order-confirmation?orderId=${confirmOrderId}&total=${total.toFixed(2)}&method=cartao`)
    onClose()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg p-8 border border-border space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Pagamento com Cartão</h3>
          <p className="text-muted-foreground">Débito ou crédito</p>
        </div>

        {/* Card Type Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setCardType("debito")
              setInstallments(1)
            }}
            className={`p-4 rounded-lg border-2 transition ${
              cardType === "debito" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
            }`}
          >
            <div className="font-semibold text-foreground">Débito</div>
            <p className="text-sm text-muted-foreground">Pagamento imediato</p>
          </button>

          <button
            onClick={() => setCardType("credito")}
            className={`p-4 rounded-lg border-2 transition ${
              cardType === "credito" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
            }`}
          >
            <div className="font-semibold text-foreground">Crédito</div>
            <p className="text-sm text-muted-foreground">Até 12 parcelas</p>
          </button>
        </div>

        {/* Amount */}
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Valor a pagar:</p>
          <p className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</p>
        </div>

        {/* Installments (Credit Only) */}
        {cardType === "credito" && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground">
              Parcelamento: {installments}x de R$ {installmentValue.toFixed(2)}
            </label>
            <input
              type="range"
              min="1"
              max={maxInstallments}
              value={installments}
              onChange={(e) => setInstallments(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1x</span>
              <span>{maxInstallments}x</span>
            </div>
          </div>
        )}

        {/* Card Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Número do Cartão</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardData.number}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "").slice(0, 16)
                if (value.length > 0) {
                  value = value.replace(/(\d{4})/g, "$1 ").trim()
                }
                handleCardChange("number", value)
              }}
              maxLength={19}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Nome do Titular</label>
            <input
              type="text"
              placeholder="NOME COMPLETO"
              value={cardData.holder}
              onChange={(e) => handleCardChange("holder", e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Validade</label>
              <input
                type="text"
                placeholder="MM/AA"
                value={cardData.expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").slice(0, 4)
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2)
                  }
                  handleCardChange("expiry", value)
                }}
                maxLength={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">CVV</label>
              <input
                type="text"
                placeholder="000"
                value={cardData.cvv}
                onChange={(e) => handleCardChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-mono"
              />
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-accent/10 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Segurança</p>
          <p>Seus dados são criptografados e protegidos. Nunca armazenamos informações completas do cartão.</p>
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
            disabled={
              !cardType || !cardData.number || !cardData.holder || !cardData.expiry || !cardData.cvv || isProcessing
            }
            className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              !cardType || !cardData.number || !cardData.holder || !cardData.expiry || !cardData.cvv || isProcessing
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
              "Confirmar Pagamento"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
