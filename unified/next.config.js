/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Point to frontend directory for pages and assets
  experimental: {
    externalDir: true,
  },
  // Webpack configuration to handle frontend assets
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Alias para a importa din frontend
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../frontend/src'),
      '@/components': path.resolve(__dirname, '../frontend/src/components'),
      '@/lib': path.resolve(__dirname, '../frontend/src/lib'),
      '@/utils': path.resolve(__dirname, '../frontend/src/utils'),
      '@/services': path.resolve(__dirname, '../frontend/src/services'),
      '@/types': path.resolve(__dirname, '../frontend/src/types'),
      '@/hooks': path.resolve(__dirname, '../frontend/src/hooks'),
      '@/store': path.resolve(__dirname, '../frontend/src/store'),
    };

    return config;
  },
  images: {
    domains: [
      'localhost',
      'ai-agents-romania.com',
      'images.unsplash.com',
      'placehold.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configurare pentru serverul de dezvoltare
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1'}/:path*`,
      },
    ] : [];
  },
  // Headers pentru CORS în development
  async headers() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ] : [];
  },
  // Configurare pentru bundling optimizat
  transpilePackages: ['@ai-agents-romania/shared'],
};

module.exports = nextConfig;