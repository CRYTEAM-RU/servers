"use client";
import { useState } from "react";
import Link from "next/link";

const testPlayers = [
  { username: "test", password: "1234" }
];

export default function LoginModal({ open, onClose }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const player = testPlayers.find(
      (p) => p.username === login && p.password === password
    );
    if (player) {
      setSuccess(true);
      setError("");
      localStorage.setItem("player-auth", JSON.stringify(player));
    } else {
      setError("Неверный логин или пароль");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-fade-in animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Вход</h2>
        {success ? (
          <div className="text-green-400 text-center text-lg mb-4">Добро пожаловать, {login}!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Войти
            </button>
            <div className="text-xs text-gray-400 text-center">Тестовая учётка: test / 1234</div>
          </form>
        )}
        <div className="border-t border-primary/20 pt-4 mt-2 flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Администратор?</span>
          <Link
            href="/admin/login"
            className="bg-primaryLight hover:bg-primary text-white font-bold py-2 px-6 rounded-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-center"
            onClick={onClose}
          >
            Войти как админ
          </Link>
        </div>
      </div>
    </div>
  );
} 