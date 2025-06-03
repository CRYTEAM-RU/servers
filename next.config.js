/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/site' : '',
  images: {
    unoptimized: true,
  },
  // Отключаем статическую генерацию для динамических маршрутов
  trailingSlash: true,
  // Отключаем предупреждения о статических параметрах
  experimental: {
  }
}

module.exports = nextConfig 