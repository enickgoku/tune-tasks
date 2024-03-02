'use client';

import { format } from 'date-fns';
import { AuditLog } from '@prisma/client';

import { generateLogMessage } from '@/lib/generate-log-message';
import { Avatar, AvatarImage } from './ui/avatar';

interface ActivityItemProps {
  log: AuditLog;
}

export const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-7 w-7">
        <AvatarImage src={log.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-mont lowercase text-neutral-700">
            {log.userName}
          </span>{' '}
          {generateLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
