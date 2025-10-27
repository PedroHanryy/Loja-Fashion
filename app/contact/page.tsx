"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import WhatsAppWidget from "@/components/whatsapp-widget"
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [cartCount] = useState(0)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartCount} onCartClick={() => {}} />

      <div className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos aqui para ajudar! Fale conosco através de qualquer um dos canais abaixo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* WhatsApp Card */}
            <div className="bg-card rounded-lg p-8 border border-border text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <MessageCircle size={32} className="text-green-600" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-6">Resposta rápida e atendimento personalizado</p>
              <a
                href="https://wa.me/5581992176202?text=Olá%20Kelly%20Fashion!%20Gostaria%20de%20mais%20informações"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Abrir WhatsApp
              </a>
              <p className="text-sm text-muted-foreground mt-4">+55 81 99217-6202</p>
            </div>

            {/* Phone Card */}
            <div className="bg-card rounded-lg p-8 border border-border text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Phone size={32} className="text-primary" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Telefone</h3>
              <p className="text-muted-foreground mb-6">Ligue para falar com nosso time</p>
              <a
                href="tel:+5581992176202"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Ligar Agora
              </a>
              <p className="text-sm text-muted-foreground mt-4">+55 81 99217-6202</p>
            </div>

            {/* Email Card */}
            <div className="bg-card rounded-lg p-8 border border-border text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Mail size={32} className="text-accent" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground mb-6">Envie sua mensagem por email</p>
              <a
                href="mailto:contato@kellyfashion.com"
                className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Enviar Email
              </a>
              <p className="text-sm text-muted-foreground mt-4">contato@kellyfashion.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Envie uma Mensagem</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Informações</h2>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Localização</h4>
                      <p className="text-muted-foreground">Recife, Pernambuco - Brasil</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Clock size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Horário de Atendimento</h4>
                      <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-muted-foreground">Sábado: 10h às 16h</p>
                      <p className="text-muted-foreground">Domingo: Fechado</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MessageCircle size={24} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Tempo de Resposta</h4>
                      <p className="text-muted-foreground">WhatsApp: Até 1 hora</p>
                      <p className="text-muted-foreground">Email: Até 24 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h3 className="font-semibold text-foreground mb-4">Perguntas Frequentes</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Qual é o prazo de entrega?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Vocês fazem trocas e devoluções?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Qual é a política de reembolso?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Como rastrear meu pedido?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      <Footer />
    </main>
  )
}
