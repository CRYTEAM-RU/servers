"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav className="relative z-10 bg-secondary border-b border-primaryDark shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-xl text-white">M</div>
          <span className="text-2xl font-bold text-white tracking-tight">Minecraft Servers</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white hover:text-primary transition">Главная</Link>
          <Link href="/servers" className="text-white hover:text-primary transition">Серверы</Link>
          <Link href="/favorites" className="text-white hover:text-primary transition">Избранные</Link>
          <button
            onClick={() => setModalOpen(true)}
            className="text-white hover:text-primary transition px-4 py-2 rounded-lg border border-primary/20 hover:border-primary focus:outline-none"
          >
            Войти
          </button>
        </div>
      </div>
      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
} 