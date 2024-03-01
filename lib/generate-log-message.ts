import { clerkClient } from '@clerk/nextjs';
import { ACTION, AuditLog } from '@prisma/client';

export const generateLogMessage = async (log: AuditLog) => {
  const { action, entityTitle, entityType, userId, assignedUserId } = log;

  let assigningUser, assignedUser;
  if (action === ACTION.ASSIGN) {
    if (userId) {
      assigningUser = await clerkClient.users.getUser(userId);
    }
    if (assignedUserId) {
      assignedUser = await clerkClient.users.getUser(assignedUserId);
    }
  }

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.ASSIGN:
      if (assigningUser && assignedUser) {
        return `${assigningUser?.firstName} assigned ${assignedUser?.firstName} to "${entityTitle}"`;
      }
    default:
      return `Performed an action on ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
