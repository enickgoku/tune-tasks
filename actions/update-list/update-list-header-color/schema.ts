import { z } from 'zod';

export const updateListColorSchema = z.object({
  headerColor: z.optional(z.string()),
  id: z.string(),
  boardId: z.string(),
});
