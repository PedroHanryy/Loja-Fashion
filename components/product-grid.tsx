"use client"

import type { Product, CartItem } from "@/lib/store"
import ProductCard from "./product-card"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (item: CartItem) => void
  isLoading?: boolean
}

export default function ProductGrid({ products, onAddToCart, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
