"use client";
import Link from 'next/link'
import Header from '../components/Header'
import { useState, useEffect } from 'react';
import { defaultServers } from '../defaultServers';
import { getServers, initDefaultServers } from '../serverStorage';

function HeartIcon({ active }) {
  return (
    <svg width="24" height="24" fill={active ? '#F7070F' : 'none'} stroke="#F7070F" strokeWidth="2" viewBox="0 0 24 24" className="inline align-middle">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13.07 5.36C13.64 3.99 15.1 3 16.64 3C19.64 3 22.14 5.5 22.14 8.5C22.14 13.5 12 21 12 21Z" />
    </svg>
  );
}

export default function ServersPage() {
  const [favorites, setFavorites] = useState([]);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    setServers(defaultServers);
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(fav);
  }, []);

  return (
    <main className="min-h-screen bg-background text-white relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #505050 0 2px, transparent 2px 40px)'}} />
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white">Список серверов</h2>
        <div className="bg-card rounded-2xl shadow-xl border border-primary/10 p-6 mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Последние обновления</h3>
          <div className="text-gray-300">
            {servers.length > 0 ? (
              <ul className="list-disc pl-5">
                {servers.map(server => (
                  <li key={server.id}>
                    <b>{server.name}</b> ({server.ip}) - {server.description}, Игроков: {server.players}, Версия: {server.version}
                  </li>
                ))}
              </ul>
            ) : (
              <p>На данный момент серверы не добавлены.</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servers.map((server, index) => (
            <Link
              key={server.id}
              href={`/servers/${server.id}`}
              className="bg-card rounded-2xl shadow-xl border border-primary/10 hover:border-primary transition p-6 flex flex-col gap-4 animate-fade-in animate-slide-up hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let fav = [...favorites];
                  if (fav.includes(server.id)) {
                    fav = fav.filter(f => f !== server.id);
                  } else {
                    fav.push(server.id);
                  }
                  setFavorites(fav);
                  localStorage.setItem('favorites', JSON.stringify(fav));
                }}
                className="absolute top-4 right-4 z-10"
                title={favorites.includes(server.id) ? 'Убрать из избранного' : 'В избранное'}
              >
                <HeartIcon active={favorites.includes(server.id)} />
              </button>
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
      </div>
    </main>
  );
} 