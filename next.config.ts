import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  typescript: {
    // Durante el build ignorará errores de TS
    ignoreBuildErrors: true,
  },
  eslint: {
    // Durante el build ignorará errores de ESLint
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
