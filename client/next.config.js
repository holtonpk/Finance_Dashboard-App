/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
};

module.exports = nextConfig;

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/createTransaction",
//         destination: "http://localhost:5000/createTransaction",
//       },
//       {
//         source: "/data",
//         destination: "http://localhost:5000/data",
//       },
//     ];
//   },
//   experimental: { appDir: true },
// };
