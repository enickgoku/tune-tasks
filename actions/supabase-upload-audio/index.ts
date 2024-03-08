'use server';

import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ACTION, Audio, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/create-audit-log';
import { supabase } from '@/lib/supabase';
import { uniqueId } from 'lodash';
import { ActionState } from '@/lib/create-safe-action';

interface InputType {
  audio: Blob;
  title: string;
  cardId: string;
  boardId: string;
}

type ReturnType = ActionState<InputType, Audio>;

export const uploadToSupabase = async ({
  data,
}: {
  data: InputType;
}): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  const { audio, title, cardId, boardId } = data;

  let createAudioInformation;

  try {
    const uniqueID = uniqueId();

    const { data: audioData, error: audioError } = await supabase.storage
      .from('audio')
      .upload(`audio-${title}-${uniqueID}`, audio as Blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (audioError) {
      throw new Error('Failed to upload audio');
    }

    const cardForUpdate = await db.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!cardForUpdate) {
      throw new Error('Card not found');
    }

    createAudioInformation = await db.audio.create({
      data: {
        id: uniqueID,
        title: title,
        url: audioData.path,
        orgId: orgId,
        cardId: cardId,
      },
    });

    await createAuditLog({
      entityTitle: cardForUpdate.title,
      entityId: cardForUpdate.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPLOAD_AUDIO,
    });
  } catch (error) {
    return {
      error: 'Failed to upload audio',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: createAudioInformation };
};
