import { db } from '@/lib/db';
import { getAudioData } from '@/lib/get-audio-data';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
      },
      select: {
        id: true,
        audioId: true,
      },
    });

    if (!card) {
      return new NextResponse('Card not found', { status: 404 });
    }

    const audio = await db.audio.findFirst({
      where: {
        audioId: card.audioId as string,
      },
      select: {
        url: true,
        title: true,
        audioId: true,
      },
    });

    if (!audio) {
      return new NextResponse('No audio associated with this card.', {
        status: 404,
      });
    }

    const audioData = await getAudioData(audio.audioId as string, card.id);

    if (!audioData) {
      return new NextResponse('Audio not found', { status: 404 });
    }

    return NextResponse.json(audioData);
  } catch (error) {
    return new NextResponse('Internal API Error', { status: 500 });
  }
}
