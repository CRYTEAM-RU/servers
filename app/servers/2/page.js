import { defaultServers } from '../../defaultServers';
import ServerDetail from '../ServerDetail';

export default function ServerPage() {
  const server = defaultServers.find(s => s.id === 2);
  return <ServerDetail server={server} />;
} 