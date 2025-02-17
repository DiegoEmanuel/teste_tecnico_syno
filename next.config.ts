/** @type {import('next').NextConfig} */
const nextConfig = {  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/products/**',
      },
      {
        protocol: 'https',
        hostname: 'teste-tecnico-syno-api.onrender.com',
        port: '',
        pathname: '/uploads/products/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
}

module.exports = nextConfig 