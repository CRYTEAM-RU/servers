import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export async function POST(request) {
  try {
    const { host, port, password, command } = await request.json();
    const rcon = new Rcon({ host, port, password });
    await rcon.connect();
    let response = '';
    if (command) {
      response = await rcon.send(command);
    } else {
      response = 'Подключение успешно!';
    }
    await rcon.end();
    return NextResponse.json({ success: true, response });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message });
  }
} 