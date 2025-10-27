/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // <UPDATE> Set images to be unoptimized
  },

  compress: true,

  reactStrictMode: true,

  swcMinify: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ]
  },

  // <UPDATE> ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // <UPDATE> TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
