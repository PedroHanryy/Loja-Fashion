"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Check, Loader } from "lucide-react"

interface PaymentPixProps {
  total: number
  onBack: () => void
  onClose: () => void
  orderId?: string
}

export default function PaymentPix({ total, onBack, onClose, orderId }: PaymentPixProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const pixKey = "123.456.789-00"
  const qrCode =
    "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913KELLY FASHION6009SAO PAULO62410503***63041D3D"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const confirmOrderId = orderId || "KELLY-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/order-confirmation?orderId=${confirmOrderId}&total=${total.toFixed(2)}&method=pix`)
    onClose()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg p-8 border border-border space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Pagamento via Pix</h3>
          <p className="text-muted-foreground">Escaneie o QR code ou copie a chave Pix abaixo</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="w-56 h-56 bg-white rounded-lg flex items-center justify-center border-4 border-border p-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">QR</div>
              <p className="text-sm text-muted-foreground font-mono text-xs break-all">{qrCode.slice(0, 20)}...</p>
            </div>
          </div>
        </div>

        {/* Pix Key */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Chave Pix (CPF):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pixKey}
              readOnly
              className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg font-mono text-sm"
            />
            <button
              onClick={handleCopyPix}
              className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition flex items-center gap-2 font-semibold"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Valor a pagar:</p>
          <p className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</p>
        </div>

        {/* Instructions */}
        <div className="bg-primary/10 rounded-lg p-4 space-y-3">
          <p className="font-semibold text-foreground">Como pagar:</p>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Abra seu app de banco ou carteira digital</li>
            <li>Selecione a opção Pix</li>
            <li>Escaneie o QR code ou copie a chave</li>
            <li>Confirme o pagamento</li>
            <li>Clique em "Confirmar Pagamento" após transferir</li>
          </ol>
        </div>

        {/* Security Info */}
        <div className="bg-accent/10 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Segurança</p>
          <p>Seu pagamento é protegido e criptografado. Nunca compartilhe sua senha ou dados bancários.</p>
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
            disabled={isProcessing}
            className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              isProcessing
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
