"use client"

import { useState } from "react"
import { PRODUCTS, CATEGORIES, type CartItem } from "@/lib/store"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("relevancia")
  const [priceRange, setPriceRange] = useState([0, 500])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && i.size === item.size)
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
    } else {
      setCartItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i)))
    }
  }

  let filteredProducts =
    selectedCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  filteredProducts = filteredProducts.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

  if (sortBy === "preco-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === "preco-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === "nome") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
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
                  const product = PRODUCTS.find((p) => p.id === item.productId)
                  return (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex justify-between items-center p-4 bg-card rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{product?.name}</p>
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
            <div className="mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Todos os Produtos</h1>
              <p className="text-muted-foreground max-w-2xl">
                Explore nossa coleção completa de roupas elegantes e sofisticadas
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 space-y-6 sticky top-20">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
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
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
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
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {/* Sort Options */}
                <div className="mb-8 flex justify-between items-center">
                  <p className="text-muted-foreground">{filteredProducts.length} produtos encontrados</p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold">Ordenar por:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="relevancia">Relevância</option>
                      <option value="preco-asc">Menor Preço</option>
                      <option value="preco-desc">Maior Preço</option>
                      <option value="nome">Nome (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Products */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Nenhum produto encontrado com os filtros selecionados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
