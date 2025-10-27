import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ErrorBoundary from "@/components/error-boundary"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" })

export const metadata: Metadata = {
  title: "Kelly Fashion - Moda Elegante e Sofisticada",
  description: "Descubra a melhor coleção de roupas femininas com estilo e qualidade",
  generator: "v0.app",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "Kelly Fashion - Moda Elegante e Sofisticada",
    description: "Descubra a melhor coleção de roupas femininas com estilo e qualidade",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${lato.variable} font-lato antialiased`}>
        <ErrorBoundary>
          {children}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}
