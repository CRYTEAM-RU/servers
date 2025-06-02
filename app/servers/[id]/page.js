"use client";
import Link from 'next/link'
import Header from '../../components/Header'
import { useState, useEffect } from 'react';
import { getServers, initDefaultServers, setServers } from '../../serverStorage';

function HeartIcon({ active }) {
  return (
    <svg width="24" height="24" fill={active ? '#F7070F' : 'none'} stroke="#F7070F" strokeWidth="2" viewBox="0 0 24 24" className="inline align-middle">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13.07 5.36C13.64 3.99 15.1 3 16.64 3C19.64 3 22.14 5.5 22.14 8.5C22.14 13.5 12 21 12 21Z" />
    </svg>
  );
}

export default function ServerDetailPage({ params }) {
  const [favorites, setFavorites] = useState([]);
  const [server, setServer] = useState(null);

  useEffect(() => {
    initDefaultServers();
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(fav);

    const updateServerData = () => {
      const allServers = getServers();
      const s = allServers.find(s => s.id === Number(params.id));
      setServer(s);
    };

    updateServerData();

    window.addEventListener('serversUpdated', updateServerData);

    return () => {
      window.removeEventListener('serversUpdated', updateServerData);
    };

  }, [params.id]);

  function toggleFavorite(id) {
    let fav = [...favorites];
    if (fav.includes(id)) {
      fav = fav.filter(f => f !== id);
    } else {
      fav.push(id);
    }
    setFavorites(fav);
    localStorage.setItem('favorites', JSON.stringify(fav));
  }

  if (!server) return <div className="text-white p-8">Сервер не найден</div>;

  return (
    <main className="min-h-screen bg-background text-white relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #505050 0 2px, transparent 2px 40px)'}} />
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
        <div className="bg-card rounded-2xl shadow-2xl border border-primary/10 p-8 max-w-lg w-full animate-fade-in animate-slide-up mb-8 relative">
          <button
            onClick={() => toggleFavorite(server.id)}
            className="absolute top-4 right-4 z-10"
            title={favorites.includes(server.id) ? 'Убрать из избранного' : 'В избранное'}
          >
            <HeartIcon active={favorites.includes(server.id)} />
          </button>
          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center gap-2">{server.name}</h2>
          <p className="text-gray-300 mb-4">{server.description}</p>
          <div className="flex flex-col gap-2 text-gray-400 mb-6">
            <span><span className="text-primaryLight font-semibold">IP:</span> {server.ip}</span>
            <span><span className="text-primaryLight font-semibold">Игроков:</span> {server.players}</span>
            <span><span className="text-primaryLight font-semibold">Версия:</span> {server.version}</span>
          </div>
        </div>
      </div>
    </main>
  );
} 