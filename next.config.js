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
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/servers': { page: '/servers' },
      '/servers/1': { page: '/servers/[id]', query: { id: '1' } },
      '/servers/2': { page: '/servers/[id]', query: { id: '2' } },
    }
  }
}

module.exports = nextConfig 