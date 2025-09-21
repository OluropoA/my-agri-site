import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
  experimental: {
    // Ensure proper module resolution
    esmExternals: true,
  },
  turbopack: {
    // Configure root directory to avoid lockfile warning
    root: process.cwd(),
    resolveAlias: {
      '@': './src',
    },
  }
};

export default nextConfig;
