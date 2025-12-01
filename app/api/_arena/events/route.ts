import { NextResponse } from 'next/server';
import { getArenaJWT } from '@/lib/arenaAuth';
import type { IArenaEventResponse } from '@/types/arena.types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month');

    if (!month) {
      return NextResponse.json(
        { message: 'Month parameter is required' },
        { status: 400 }
      );
    }

    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json(
        { message: 'Month must be between 1 and 12' },
        { status: 400 }
      );
    }

    const jwt = await getArenaJWT();
    
    const eventsUrl = `${process.env.ARENA_AUTH_BASE_URL}/event/month/1318/${month}`;
    const eventsResponse = await fetch(eventsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!eventsResponse.ok) {
      throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
    }

    const events: IArenaEventResponse[] = await eventsResponse.json();

    return NextResponse.json({
      data: events,
      total: events.length,
      month: monthNum,
    });
  } catch (error) {
    console.error('Arena events API error:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch Arena Racing events',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}