/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:5003",
      }
    ],
    minimumCacheTTL: 1500000,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/tracks',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
