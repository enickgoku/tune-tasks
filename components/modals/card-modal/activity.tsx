'use client';

import { AuditLog } from '@prisma/client';

import { Skeleton } from '@/components/ui/skeleton';

interface ActivityProps {
  logs: AuditLog[];
}

export const Activity = ({ logs }: ActivityProps) => {
  return (
    <div>
      <h1>Activity</h1>
    </div>
  );
};

Activity.Skeleton = function ActicitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
