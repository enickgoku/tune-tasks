'use server';

import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';

import { InputType, ReturnType } from './types';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/create-audit-log';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'User not authenticated',
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: 'Invalid image format',
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: 'Failed to create board.',
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
