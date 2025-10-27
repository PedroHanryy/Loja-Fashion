"use client"

import { useState } from "react"
import { PRODUCTS, CATEGORIES, type CartItem } from "@/lib/store"
import ProductCard from "./product-card"

interface CollectionsProps {
  onAddToCart: (item: CartItem) => void
}

export default function Collections({ onAddToCart }: CollectionsProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts =
    selectedCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <section id="colecoes" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Nossa Coleção</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa seleção cuidadosa de peças para todos os estilos e ocasiões
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
