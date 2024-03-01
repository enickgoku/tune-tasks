import { z } from 'zod';
import { CardAssignment } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';

import { assignUserToCardSchema } from './schema';

export type InputType = z.infer<typeof assignUserToCardSchema>;
export type ReturnType = ActionState<InputType, CardAssignment>;
