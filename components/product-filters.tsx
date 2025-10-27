"use client"

import { CATEGORIES } from "@/lib/store"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Faixa de Preço</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Mínimo: R$ {priceRange[0]}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Máximo: R$ {priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Ordenar por</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="relevancia">Relevância</option>
          <option value="preco-asc">Menor Preço</option>
          <option value="preco-desc">Maior Preço</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>
    </div>
  )
}
