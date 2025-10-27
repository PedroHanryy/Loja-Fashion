"use client"

import type React from "react"

import { useState } from "react"
import { Send, Loader } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would send this to your backend
      console.log("Form submitted:", formData)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Nome Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Seu nome"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="seu@email.com"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Telefone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(81) 99217-6202"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Assunto</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecione um assunto</option>
          <option value="duvida">Dúvida sobre Produto</option>
          <option value="pedido">Informação sobre Pedido</option>
          <option value="troca">Troca ou Devolução</option>
          <option value="sugestao">Sugestão</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Mensagem</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Escreva sua mensagem aqui..."
          rows={5}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Erro ao enviar mensagem. Por favor, tente novamente.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          isSubmitting
            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Enviar Mensagem
          </>
        )}
      </button>
    </form>
  )
}
