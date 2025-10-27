// Performance optimization utilities

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit function calls
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load images
 */
export function lazyLoadImages(): void {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img.lazy").forEach((img) => imageObserver.observe(img))
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: "image" | "font" | "script" | "style"): void {
  const link = document.createElement("link")
  link.rel = "preload"
  link.as = as
  link.href = href
  document.head.appendChild(link)
}

/**
 * Cache API responses
 */
export class ResponseCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private ttl: number

  constructor(ttlMs = 300000) {
    // 5 minutes default
    this.ttl = ttlMs
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }
}
