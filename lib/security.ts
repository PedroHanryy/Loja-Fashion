// Security utilities for Kelly Fashion

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format (Brazilian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+55)?(\d{2})?(\d{4,5})(\d{4})$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

/**
 * Validate credit card number using Luhn algorithm
 */
export function isValidCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Hash sensitive data (client-side only, for display purposes)
 */
export function hashSensitiveData(data: string, visibleChars = 4): string {
  if (data.length <= visibleChars) return "*".repeat(data.length)
  const visible = data.slice(-visibleChars)
  const hidden = "*".repeat(data.length - visibleChars)
  return hidden + visible
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let token = ""
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((time) => now - time < this.windowMs)

    if (recentAttempts.length >= this.maxAttempts) {
      return false
    }

    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}
