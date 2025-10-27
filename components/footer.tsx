import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Kelly Fashion</h3>
            <p className="text-sm opacity-90">
              Sua loja de moda elegante e sofisticada, com as melhores peças para você se sentir confiante e linda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="hover:opacity-80 transition">
                  Produtos
                </a>
              </li>
              <li>
                <a href="/#colecoes" className="hover:opacity-80 transition">
                  Coleções
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-80 transition">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                <a
                  href="https://wa.me/5581992176202?text=Olá%20Kelly%20Fashion!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+5581992176202" className="hover:opacity-80 transition">
                  +55 81 99217-6202
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:contato@kellyfashion.com" className="hover:opacity-80 transition">
                  contato@kellyfashion.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Recife, Pernambuco - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm opacity-75">© 2025 Kelly Fashion. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
