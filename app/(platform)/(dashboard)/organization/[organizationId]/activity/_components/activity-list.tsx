import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No Activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} log={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="h-6 w-full bg-neutral-200" />
      <Skeleton className="h-6 w-full bg-neutral-200" />
      <Skeleton className="h-6 w-full bg-neutral-200" />
    </ol>
  );
};
