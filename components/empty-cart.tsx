"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-secondary rounded-full">
          <ShoppingBag size={48} className="text-muted-foreground" />
        </div>
      </div>

      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Carrinho Vazio</h3>
      <p className="text-muted-foreground mb-8">Você ainda não adicionou nenhum produto ao carrinho</p>

      <Link
        href="/products"
        className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
      >
        Explorar Produtos
      </Link>
    </div>
  )
}
