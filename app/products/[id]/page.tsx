"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { PRODUCTS, type CartItem } from "@/lib/store"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Share2, Heart } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = PRODUCTS.find((p) => p.id === productId)

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeSelector, setShowSizeSelector] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
        <div className="py-16 text-center">
          <p className="text-muted-foreground text-lg">Produto não encontrado</p>
        </div>
        <Footer />
      </main>
    )
  }

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

    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.size === selectedSize)
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.size === selectedSize ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          size: selectedSize as any,
          quantity,
          price: product.price,
        },
      ]
    })

    setSelectedSize("")
    setQuantity(1)
    alert("Produto adicionado ao carrinho!")
  }

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  const updateCartQuantity = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size)
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity: qty } : i)),
      )
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />

      {showCart ? (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-serif text-3xl font-bold mb-8">Seu Carrinho</h1>
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const prod = PRODUCTS.find((p) => p.id === item.productId)
                  return (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex justify-between items-center p-4 bg-card rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{prod?.name}</p>
                        <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.size, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-secondary"
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.size, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-secondary"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-destructive hover:opacity-70"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{product.name}</h1>
                  <p className="text-lg text-muted-foreground">{product.description}</p>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-primary">R$ {product.price.toFixed(2)}</div>

                {/* Size Selector */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Selecione o Tamanho</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {product.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => {
                          setSelectedSize(sizeOption.size)
                          setShowSizeSelector(false)
                        }}
                        disabled={sizeOption.stock === 0}
                        className={`py-3 px-4 rounded-lg font-semibold transition ${
                          sizeOption.stock === 0
                            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            : selectedSize === sizeOption.size
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary border border-border hover:bg-muted"
                        }`}
                        title={sizeOption.stock === 0 ? "Esgotado" : `${sizeOption.stock} disponível(is)`}
                      >
                        {sizeOption.size}
                      </button>
                    ))}
                  </div>
                  {selectedSizeData && (
                    <p className="text-sm text-muted-foreground">
                      {selectedSizeData.stock > 0 ? `${selectedSizeData.stock} disponível(is)` : "Esgotado"}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                {selectedSize && !isOutOfStock && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Quantidade</label>
                    <div className="flex items-center border border-border rounded-lg w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-secondary transition"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-secondary transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || isOutOfStock}
                    className={`w-full py-4 rounded-lg font-semibold transition ${
                      !selectedSize || isOutOfStock
                        ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {isOutOfStock ? "Esgotado" : "Adicionar ao Carrinho"}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`flex-1 py-3 rounded-lg font-semibold border transition flex items-center justify-center gap-2 ${
                        isFavorite
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                      {isFavorite ? "Favoritado" : "Favoritar"}
                    </button>
                    <button className="flex-1 py-3 rounded-lg font-semibold border border-border hover:bg-secondary transition flex items-center justify-center gap-2">
                      <Share2 size={20} />
                      Compartilhar
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="border-t border-border pt-8 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Disponibilidade por Tamanho</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {product.sizes.map((size) => (
                        <p key={size.size} className="text-muted-foreground">
                          {size.size}: {size.stock > 0 ? `${size.stock} em estoque` : "Esgotado"}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
