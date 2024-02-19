'use server';

import { db } from '@/lib/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const BoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long.' }),
});

export const createBoard = async (prevState: State, formData: FormData) => {
  const validatedFields = BoardSchema.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields',
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while creating the board.',
    };
  }

  revalidatePath('/organization/org_2cSo2dWZ4AVE1scnoF6fGVjgsFC');
  redirect('/organization/org_2cSo2dWZ4AVE1scnoF6fGVjgsFC');
};
