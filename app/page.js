import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Паттерн-фон */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #505050 0 2px, transparent 2px 40px)'}} />
      <div className="relative z-10 max-w-xl w-full p-8 bg-card rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in animate-slide-up">
        <h1 className="text-4xl font-bold text-primary mb-2">Добро пожаловать!</h1>
        <p className="text-lg text-gray-300 text-center">Мы — команда энтузиастов Minecraft, создающая уникальные серверы для игроков всех возрастов. Присоединяйтесь к нашему сообществу и найдите сервер по душе!</p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-primaryLight font-semibold">Наша команда:</span>
          <ul className="text-gray-400">
            <li>• CRYTEAM - Основатель</li>
            <li>• CRYTEAM — Разработчик</li>
            <li>• Cobra — Дизайнер</li>
          </ul>
        </div>
        <Link href="/servers" className="mt-4 bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">Перейти к серверам</Link>
      </div>
    </main>
  )
} 
