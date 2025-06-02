"use client";
import { useState } from "react";
import { users } from "../users";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // Сохраняем сессию в localStorage
      localStorage.setItem("admin-auth", JSON.stringify(user));
      router.push("/admin");
    } else {
      setError("Неверный логин или пароль");
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-sm animate-fade-in animate-slide-up"
      >
        <h2 className="text-2xl font-bold text-primary text-center">Вход для админов</h2>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Войти
        </button>
      </form>
    </main>
  );
} 