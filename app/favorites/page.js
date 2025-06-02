"use client";
import Header from '../components/Header';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getServers, initDefaultServers } from '../serverStorage';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    initDefaultServers();
    const updateServers = () => {
      setServers(getServers());
    };
    
    updateServers();
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(fav);

    window.addEventListener('serversUpdated', updateServers);
    return () => {
      window.removeEventListener('serversUpdated', updateServers);
    };
  }, []);

  const favoriteServers = servers.filter(s => favorites.includes(s.id));

  return (
    <main className="min-h-screen bg-background text-white relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #505050 0 2px, transparent 2px 40px)'}} />
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-primary">Избранные серверы</h2>
        {favoriteServers.length === 0 ? (
          <div className="text-gray-400 text-lg">У вас нет избранных серверов.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteServers.map((server, index) => (
              <Link
                key={server.id}
                href={`/servers/${server.id}`}
                className="bg-card rounded-2xl shadow-xl border border-primary/10 hover:border-primary transition p-6 flex flex-col gap-4 animate-fade-in animate-slide-up hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold text-white">{server.name}</h3>
                </div>
                <p className="text-gray-300 flex-1">{server.description}</p>
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <span><span className="text-primaryLight font-semibold">IP:</span> {server.ip}</span>
                  <span><span className="text-primaryLight font-semibold">Игроков:</span> {server.players}</span>
                  <span><span className="text-primaryLight font-semibold">Версия:</span> {server.version}</span>
                </div>
                <span className="mt-4 text-primaryLight font-bold">Подробнее →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 