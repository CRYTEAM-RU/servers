/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        primaryLight: '#3b82f6',
        primaryDark: '#1e40af',
        secondary: '#1A1A1A',
        background: '#1E1E1E',
        card: '#18181b',
      },
    },
  },
  plugins: [],
} 