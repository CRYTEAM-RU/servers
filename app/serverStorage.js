import { defaultServers } from './defaultServers'; // Убедитесь, что этот импорт существует

const STORAGE_KEY = 'minecraftServers';

export function getServers() {
  if (typeof window === 'undefined') {
    // На сервере возвращаем дефолтные серверы
    return defaultServers;
  }
  const serversJson = localStorage.getItem(STORAGE_KEY);
  return serversJson ? JSON.parse(serversJson) : defaultServers;
}

export function setServers(servers) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(servers));
  // Вызываем кастомное событие после сохранения
  window.dispatchEvent(new CustomEvent('serversUpdated'));
}

export function initDefaultServers() {
  if (typeof window === 'undefined') return;
  const servers = getServers();
  if (servers.length === 0) {
    setServers(defaultServers);
  }
} 