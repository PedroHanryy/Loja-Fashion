"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Package, Truck, MapPin } from "lucide-react"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "KELLY-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const total = searchParams.get("total") || "0.00"
  const paymentMethod = searchParams.get("method") || "pix"

  const paymentMethodLabel =
    {
      pix: "Pix",
      dinheiro: "Dinheiro na Entrega",
      cartao: "Cartão de Crédito/Débito",
    }[paymentMethod as string] || "Pix"

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={0} onCartClick={() => {}} />

      <div className="flex-1 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <CheckCircle size={80} className="text-primary relative" />
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Pedido Confirmado!</h1>
            <p className="text-lg text-muted-foreground">Obrigada por sua compra na Kelly Fashion</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-lg border border-border p-8 mb-8 space-y-6">
            {/* Order Number */}
            <div className="text-center pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Número do Pedido</p>
              <p className="font-mono text-2xl font-bold text-primary">{orderId}</p>
            </div>

            {/* Order Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Valor Total</p>
                <p className="text-3xl font-bold text-foreground">R$ {Number.parseFloat(total).toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Método de Pagamento</p>
                <p className="text-lg font-semibold text-foreground">{paymentMethodLabel}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4 pt-6 border-t border-border">
              <p className="font-semibold text-foreground mb-4">Status do Pedido</p>

              <div className="space-y-4">
                {/* Confirmed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div className="w-0.5 h-12 bg-primary mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pedido Confirmado</p>
                    <p className="text-sm text-muted-foreground">Seu pedido foi recebido e confirmado</p>
                  </div>
                </div>

                {/* Processing */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Package size={20} />
                    </div>
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Preparando Envio</p>
                    <p className="text-sm text-muted-foreground">Seu pedido está sendo preparado</p>
                  </div>
                </div>

                {/* Shipping */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Em Trânsito</p>
                    <p className="text-sm text-muted-foreground">Seu pedido será enviado em breve</p>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Entregue</p>
                    <p className="text-sm text-muted-foreground">Seu pedido chegará em breve</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/10 rounded-lg p-6 mb-8 space-y-4">
            <h3 className="font-semibold text-foreground">Próximos Passos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Você receberá um email de confirmação com os detalhes do pedido</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Acompanhe seu pedido através do número de rastreamento</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Qualquer dúvida, entre em contato conosco via WhatsApp</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-center"
            >
              Voltar à Loja
            </Link>
            <Link
              href="/products"
              className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition text-center"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
