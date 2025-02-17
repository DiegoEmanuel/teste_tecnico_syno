/** @type {import('next').NextConfig} */
const nextConfig = {  
  images: {
    remotePatterns: [
      // localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/products/**',
      },
      // // render
      // {
      //   protocol: 'https',
      //   hostname: 'teste-tecnico-syno-api.onrender.com',
      //   pathname: '/uploads/products/**',
      // },
      // aws
      {
        protocol: 'http',
        hostname: '34.205.99.179',
        port: '3000',
        pathname: '/uploads/products/**',
      }
    ],
    domains: ['teste-tecnico-syno-api.onrender.com']
  },
  rewrites: async () => [
    {
      source: '/api/auth/:path*',
      destination: '/api/auth/:path*',
    },
    {
      source: "/api/products",
      destination: "http://34.205.99.179:3000/products",
    },
  ],
}

module.exports = nextConfig 