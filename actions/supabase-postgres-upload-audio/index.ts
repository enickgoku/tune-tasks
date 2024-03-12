'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ACTION, Audio, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/create-audit-log';
import { ActionState } from '@/lib/create-safe-action';
import { auth } from '@clerk/nextjs';

interface InputType {
  audioPath: string;
  title: string;
  cardId: string;
  boardId: string;
  orgId: string;
  audioId: string;
}

type ReturnType = ActionState<InputType, Audio>;

export const uploadToSupabaseAndPostgres = async ({
  data,
}: {
  data: InputType;
}): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { audioPath, title, cardId, boardId, orgId, audioId } = data;

  let createAudioInformation;

  try {
    createAudioInformation = await db.audio.create({
      data: {
        title,
        url: audioPath,
        cardId,
        orgId,
        audioId,
      },
    });

    if (!createAudioInformation) {
      throw new Error('Failed to create audio');
    }

    const cardForUpdate = await db.card.findUnique({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!cardForUpdate) {
      throw new Error('Card not found');
    }

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
