// Security and configuration constants

export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 60000, // 1 minute
  RATE_LIMIT_MAX_ATTEMPTS: 5,

  // Session
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  SESSION_WARNING_MS: 25 * 60 * 1000, // 25 minutes

  // Password requirements
  MIN_PASSWORD_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL_CHARS: true,

  // Data retention
  CART_RETENTION_DAYS: 30,
  ORDER_RETENTION_DAYS: 365,
}

export const PERFORMANCE_CONFIG = {
  // Cache TTL
  API_CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
  PRODUCT_CACHE_TTL_MS: 30 * 60 * 1000, // 30 minutes

  // Debounce/Throttle
  SEARCH_DEBOUNCE_MS: 300,
  SCROLL_THROTTLE_MS: 100,

  // Image optimization
  IMAGE_QUALITY: 80,
  THUMBNAIL_SIZE: 200,
}

export const BUSINESS_CONFIG = {
  BUSINESS_NAME: "Kelly Fashion",
  BUSINESS_EMAIL: "contato@kellyfashion.com",
  BUSINESS_PHONE: "+55 81 99217-6202",
  BUSINESS_WHATSAPP: "5581992176202",
  BUSINESS_LOCATION: "Recife, Pernambuco - Brasil",

  // Business hours (in 24-hour format)
  BUSINESS_HOURS: {
    MONDAY_TO_FRIDAY: { OPEN: 9, CLOSE: 18 },
    SATURDAY: { OPEN: 10, CLOSE: 16 },
    SUNDAY: "CLOSED",
  },

  // Shipping
  FREE_SHIPPING_THRESHOLD: 100, // R$
  STANDARD_SHIPPING_DAYS: 7,
  EXPRESS_SHIPPING_DAYS: 3,
}
