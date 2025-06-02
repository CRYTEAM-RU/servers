import './globals.css'

export const metadata = {
  title: 'Minecraft Servers',
  description: 'Список ваших Minecraft серверов с красивым дизайном',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
