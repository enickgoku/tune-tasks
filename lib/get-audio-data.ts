'use server';

import { db } from './db';
import { supabase } from './supabase';

export const getAudioData = async (audioId: string, id: string) => {
  const audio = await db.audio.findFirst({
    where: {
      cardId: id,
      audioId: audioId,
    },
    select: { url: true, title: true },
  });

  console.log(audio?.url);

  const audioPublicURL = await supabase.storage
    .from('audio')
    .getPublicUrl(audio?.url ?? '');

  return { url: audioPublicURL ?? '', title: audio?.title ?? '' };
};
