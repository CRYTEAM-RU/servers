"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { users as initialUsers } from "./users";
import { getServers, setServers, initDefaultServers } from "../serverStorage"; // Import serverStorage functions

export default function AdminPanel() {
  const [auth, setAuth] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [players, setPlayers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [newPlayer, setNewPlayer] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [playerError, setPlayerError] = useState("");
  const [tab, setTab] = useState("admins");
  const router = useRouter();

  useEffect(() => {
    initDefaultServers(); // Ensure default servers are in storage
    const user = JSON.parse(localStorage.getItem("admin-auth"));
    if (!user || user.role !== "admin") {
      router.push("/admin/login");
    } else {
      setAuth(user);
    }
  }, [router]);

  function handleAddUser(e) {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      setError("Заполните все поля");
      return;
    }
    if (users.find((u) => u.username === newUser.username)) {
      setError("Пользователь с таким логином уже существует");
      return;
    }
    setUsers([...users, { ...newUser, role: "admin" }]);
    setNewUser({ username: "", password: "" });
    setError("");
  }

  function handleAddPlayer(e) {
    e.preventDefault();
    if (!newPlayer.username || !newPlayer.password) {
      setPlayerError("Заполните все поля");
      return;
    }
    if (players.find((p) => p.username === newPlayer.username)) {
      setPlayerError("Игрок с таким логином уже существует");
      return;
    }
    setPlayers([...players, { ...newPlayer, role: "player" }]);
    setNewPlayer({ username: "", password: "" });
    setPlayerError("");
  }

  function handleLogout() {
    localStorage.removeItem("admin-auth");
    router.push("/admin/login");
  }

  if (!auth) return null;

  return (
    <main className="min-h-screen bg-background text-white flex flex-col items-center py-12">
      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-2xl animate-fade-in animate-slide-up">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Админ-панель</h2>
        <div className="flex gap-4 mb-8 justify-center">
          <button onClick={() => setTab("admins")} className={`px-4 py-2 rounded-lg font-bold transition ${tab === "admins" ? "bg-primary text-white" : "bg-secondary text-gray-300 hover:bg-primary/20"}`}>Админы</button>
          <button onClick={() => setTab("players")} className={`px-4 py-2 rounded-lg font-bold transition ${tab === "players" ? "bg-primary text-white" : "bg-secondary text-gray-300 hover:bg-primary/20"}`}>Игроки</button>
          <button onClick={() => setTab("console")} className={`px-4 py-2 rounded-lg font-bold transition ${tab === "console" ? "bg-primary text-white" : "bg-secondary text-gray-300 hover:bg-primary/20"}`}>Консоль</button>
        </div>
        {tab === "admins" && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Список админов:</h3>
              <ul className="text-gray-300 list-disc pl-5">
                {users.map((u, i) => (
                  <li key={i}>{u.username}</li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleAddUser} className="flex flex-col gap-4 mb-4">
              <h3 className="text-lg font-semibold">Добавить нового админа</h3>
              <input
                type="text"
                placeholder="Логин"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
              />
              {error && <div className="text-red-500 text-center">{error}</div>}
              <button type="submit" className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">Добавить</button>
            </form>
          </>
        )}
        {tab === "players" && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Список игроков:</h3>
              <ul className="text-gray-300 list-disc pl-5">
                {players.map((p, i) => (
                  <li key={i}>{p.username}</li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleAddPlayer} className="flex flex-col gap-4 mb-4">
              <h3 className="text-lg font-semibold">Добавить нового игрока</h3>
              <input
                type="text"
                placeholder="Логин"
                value={newPlayer.username}
                onChange={(e) => setNewPlayer({ ...newPlayer, username: e.target.value })}
                className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={newPlayer.password}
                onChange={(e) => setNewPlayer({ ...newPlayer, password: e.target.value })}
                className="p-3 rounded bg-secondary text-white border border-primary/20 focus:border-primary outline-none"
              />
              {playerError && <div className="text-red-500 text-center">{playerError}</div>}
              <button type="submit" className="bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 hover:scale-105 hover:shadow-lg active:scale-95">Добавить</button>
            </form>
          </>
        )}
        {tab === "console" && (
          <div className="bg-secondary rounded-2xl shadow-xl p-10 text-gray-200 min-h-[450px] max-w-4xl mx-auto flex flex-col justify-start items-stretch">
            <h3 className="text-2xl font-semibold mb-8">Консоль серверов (RCON)</h3>
            <form onSubmit={handleLogout} className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 mb-8 w-full max-w-3xl mx-auto">
              <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primaryDark text-white font-bold px-6 py-3 rounded transition whitespace-nowrap text-lg">Выйти</button>
            </form>
          </div>
        )}
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition mt-8">Выйти</button>
      </div>
    </main>
  );
} 