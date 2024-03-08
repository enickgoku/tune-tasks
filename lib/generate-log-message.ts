import { LogUserData } from '@/types';
import { ACTION, AuditLog } from '@prisma/client';

export const generateLogMessage = (log: AuditLog, users: LogUserData[]) => {
  const { action, entityTitle, entityType, userId, assignedUserId } = log;

  const delegator = users.find((user) => user.userId === userId);
  const assignedUser = users.find((user) => user.userId === assignedUserId);

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.ASSIGN:
      return `${delegator?.firstName} assigned ${assignedUser?.firstName} to this card.`;
    case ACTION.UPLOAD_AUDIO:
      return `${
        delegator?.firstName
      } Uploaded audio to ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `Performed an action on ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
