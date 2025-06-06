/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  transpilePackages: ['@agenciasaas/database', '@agenciasaas/types'],
};

module.exports = nextConfig;
