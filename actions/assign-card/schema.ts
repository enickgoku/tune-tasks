import { z } from 'zod';

export const assignUserToCardSchema = z.object({
  cardId: z.string(),
  userId: z.optional(z.string()),
  boardId: z.string(),
  assignedUserId: z.optional(z.string()),
});
