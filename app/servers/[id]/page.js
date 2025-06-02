import { defaultServers } from '../../defaultServers';
import ServerDetail from './ServerDetail';

// Функция для статической генерации страниц
export async function generateStaticParams() {
  return defaultServers.map((server) => ({
    id: server.id.toString(),
  }));
}

export default function ServerPage({ params, searchParams }) {
  const serverId = searchParams?.id || params?.id;
  const server = defaultServers.find(s => s.id === Number(serverId));
  
  if (!server) {
    return <div className="text-white p-8">Сервер не найден</div>;
  }

  return <ServerDetail server={server} />;
} 