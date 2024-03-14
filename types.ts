import { Card, List, CardAssignment } from '@prisma/client';

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export type CardAssignments = CardAssignment;

export type LogUserData = {
  firstName: string | null;
  lastName: string | null;
  userId?: string | null;
};
