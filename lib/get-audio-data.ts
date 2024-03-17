'use server';

import { db } from './db';
import { supabase } from './supabase';

export const getAudioData = async (audioId: string, id: string) => {
  const cardWithAudioId = await db.card.findFirst({
    where: {
      id: id,
      audioId: audioId,
    },
    select: { audioId: true },
  });

  if (!cardWithAudioId) {
    throw new Error('Card with audio not found');
  }

  const audio = await db.audio.findFirst({
    where: {
      cardId: id,
      audioId: cardWithAudioId.audioId ?? undefined,
    },
    select: { url: true, title: true },
  });

  if (!audio) {
    throw new Error('Audio not found');
  }

  const audioPublicURL = supabase.storage.from('audio').getPublicUrl(audio.url);

  return { url: audioPublicURL, title: audio.title };
};
