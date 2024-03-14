import { db } from './db';

export const getCardAssignmentData = async (cardId: string) => {
  let assignment;
  let users = [];
  try {
    assignment = await db.cardAssignment.findMany({
      where: {
        cardId: cardId,
      },
      select: {
        userId: true,
      },
    });
  } catch (error) {
    console.error('Error fetching card assignment data', error);
  }

  return { data: assignment };
};
