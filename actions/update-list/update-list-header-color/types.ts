import { z } from 'zod';
import { List } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';

import { updateListColorSchema } from './schema';

export type InputType = z.infer<typeof updateListColorSchema>;
export type ReturnType = ActionState<InputType, List>;
