import Link from 'next/link';
import Header from './components/Header';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-white relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #505050 0 2px, transparent 2px 40px)'}} />
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
        <div className="bg-card rounded-2xl shadow-2xl border border-primary/10 p-8 max-w-lg w-full animate-fade-in animate-slide-up mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">404 - Страница не найдена</h2>
          <p className="text-gray-300 mb-6">Извините, запрашиваемая страница не существует.</p>
          <Link href="/" className="text-primary hover:text-primaryLight transition-colors">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
} 