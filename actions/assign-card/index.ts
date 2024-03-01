'use server';

import { auth } from '@clerk/nextjs';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { assignUserToCardSchema } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId: authUserId, orgId } = auth();

  if (!authUserId || !orgId) {
    throw new Error('Unauthorized');
  }

  const { boardId, cardId, userId: userAssignedId } = data;

  if (!boardId || !cardId || !userAssignedId) {
    return {
      error: 'Missing required data',
    };
  }

  let cardAssignment;

  try {
    cardAssignment = await db.cardAssignment.create({
      data: {
        cardId,
        userId: userAssignedId,
      },
    });

    const currentCard = await db.card.findUnique({
      where: { id: cardId },
    });

    if (!currentCard) {
      return {
        error: 'Card not found',
      };
    }

    await createAuditLog({
      entityId: cardId,
      entityTitle: currentCard?.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.ASSIGN,
    });
  } catch (error) {
    return {
      error: 'Issue assigning user to card.',
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cardAssignment };
};

export const assignUserToCard = createSafeAction(
  assignUserToCardSchema,
  handler
);
