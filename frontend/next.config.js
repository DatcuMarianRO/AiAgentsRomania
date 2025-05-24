/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for production
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
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
    // Unoptimized for static export
    unoptimized: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // serverActions sunt disponibile by default în Next.js 14+
  },
  // Configurare pentru serverul de dezvoltare
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/:path*`,
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