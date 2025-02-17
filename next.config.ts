/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações
  images: {
    remotePatterns: [
      //localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/products/**',
      },
      //render
      {
        protocol: 'https',
        hostname: 'teste-tecnico-syno-api.onrender.com',
        port: '',
        pathname: '/uploads/products/**',
      },
      //aws
      {
        protocol: 'http',
        hostname: '34.205.99.179',
        port: '3000',
        pathname: '/uploads/products/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
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