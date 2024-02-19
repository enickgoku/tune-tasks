'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

const BoardSchema = z.object({
  title: z.string(),
});

export const createBoard = async (formData: FormData) => {
  const { title } = BoardSchema.parse({
    title: formData.get('title'),
  });

  if (!title) {
    return;
  }

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath('/organization/:organizationId');
};
