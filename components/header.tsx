"use client"

import { ShoppingBag, Phone, Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleWhatsApp = () => {
    window.open("https://wa.me/5581992176202", "_blank")
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-serif text-2xl font-bold text-primary">Kelly Fashion</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#colecoes" className="text-foreground hover:text-primary transition">
              Coleções
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition">
              Contato
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleWhatsApp}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
              title="Contato via WhatsApp"
            >
              <Phone size={18} />
              <span className="text-sm">Contato</span>
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-secondary rounded-lg transition"
              title="Carrinho de compras"
            >
              <ShoppingBag size={24} className="text-primary" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <a href="#colecoes" className="text-foreground hover:text-primary transition py-2">
              Coleções
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition py-2">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition py-2">
              Contato
            </a>
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              <Phone size={18} />
              <span>Contato via WhatsApp</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
