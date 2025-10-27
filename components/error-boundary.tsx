"use client"

import type React from "react"
import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Oops! Algo deu errado</h1>
            <p className="text-muted-foreground mb-6">
              Desculpe, ocorreu um erro inesperado. Por favor, tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
