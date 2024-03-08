'use server';

import { db } from './db';
import { supabase } from './supabase';

export const getAudioData = async (id: string) => {
  const audio = await db.audio.findFirst({
    where: {
      cardId: id,
    },
    select: { url: true, title: true },
  });
  const audioPublicURL = await supabase.storage
    .from('audio')
    .getPublicUrl(audio?.url ?? '');
  return { url: audioPublicURL ?? '', title: audio?.title ?? '' };
};
