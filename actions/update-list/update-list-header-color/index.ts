'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { updateListColorSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  const { headerColor, id, boardId } = data;

  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        headerColor,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update the list color.',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateListColor = createSafeAction(updateListColorSchema, handler);
