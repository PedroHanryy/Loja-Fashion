"use client"

import { useState } from "react"
import type { Product, CartItem } from "@/lib/store"
import { ShoppingBag, ChevronDown } from "lucide-react"

interface ProductCardProps {
  product: Product
  onAddToCart: (item: CartItem) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeSelector, setShowSizeSelector] = useState(false)

  const selectedSizeData = product.sizes.find((s) => s.size === selectedSize)
  const isOutOfStock = selectedSizeData && selectedSizeData.stock === 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho")
      return
    }

    if (isOutOfStock) {
      alert("Este tamanho está esgotado")
      return
    }

    onAddToCart({
      productId: product.id,
      size: selectedSize as any,
      quantity,
      price: product.price,
    })

    setSelectedSize("")
    setQuantity(1)
    setShowSizeSelector(false)
    alert("Produto adicionado ao carrinho!")
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      {/* Product Image */}
      <div className="relative h-64 bg-muted overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</div>

        {/* Size Selector */}
        <div className="space-y-2">
          <button
            onClick={() => setShowSizeSelector(!showSizeSelector)}
            className="w-full flex items-center justify-between px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
          >
            <span className="text-sm font-semibold">
              {selectedSize ? `Tamanho: ${selectedSize}` : "Selecione o tamanho"}
            </span>
            <ChevronDown size={18} className={`transition ${showSizeSelector ? "rotate-180" : ""}`} />
          </button>

          {showSizeSelector && (
            <div className="grid grid-cols-3 gap-2 p-3 bg-secondary rounded-lg">
              {product.sizes.map((sizeOption) => (
                <button
                  key={sizeOption.size}
                  onClick={() => {
                    setSelectedSize(sizeOption.size)
                    setShowSizeSelector(false)
                  }}
                  disabled={sizeOption.stock === 0}
                  className={`py-2 px-3 rounded font-semibold text-sm transition ${
                    sizeOption.stock === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                      : selectedSize === sizeOption.size
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-muted"
                  }`}
                  title={sizeOption.stock === 0 ? "Esgotado" : `${sizeOption.stock} disponível(is)`}
                >
                  {sizeOption.size}
                  {sizeOption.stock === 0 && <span className="text-xs ml-1">(0)</span>}
                </button>
              ))}
            </div>
          )}

          {selectedSizeData && (
            <p className="text-xs text-muted-foreground">
              {selectedSizeData.stock > 0 ? `${selectedSizeData.stock} disponível(is)` : "Esgotado"}
            </p>
          )}
        </div>

        {/* Quantity */}
        {selectedSize && !isOutOfStock && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold">Quantidade:</label>
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-secondary transition"
              >
                -
              </button>
              <span className="px-4 py-1 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-secondary transition">
                +
              </button>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
            !selectedSize || isOutOfStock
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          <ShoppingBag size={20} />
          {isOutOfStock ? "Esgotado" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  )
}
