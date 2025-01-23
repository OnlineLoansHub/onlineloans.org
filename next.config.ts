import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Si estás usando alguna API externa, agregar aquí
  // async rewrites() {
  //   return [];
  // }
}

export default nextConfig
