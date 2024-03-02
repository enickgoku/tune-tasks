import { ACTION, AuditLog } from '@prisma/client';

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType, userId, assignedUserId } = log;

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.ASSIGN:
      return `Assigned ${entityType.toLowerCase()} "${entityTitle}" to ${assignedUserId}`;
    default:
      return `Performed an action on ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
