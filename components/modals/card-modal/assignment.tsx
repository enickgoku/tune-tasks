'use client';

interface AssignmentProps {
  cardId: string;
}

import { UserRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { Skeleton } from '@/components/ui/skeleton';

type AssignmentData = {
  name: string;
};

export const Assignment = ({ cardId: id }: AssignmentProps) => {
  const { data: assignmentUserData } = useQuery<AssignmentData[]>({
    queryKey: ['cardAssignments', id],
    queryFn: () => fetcher(`/api/cards/${id}/assignments`),
  });

  if (!assignmentUserData) {
    return <Assignment.Skeleton />;
  }

  return (
    <div className="flex items-start flex-col w-full">
      <p className="font-semibold text-neutral-700 mb-2">Assignments:</p>
      <div className="mt-3">
        {assignmentUserData?.map((user: AssignmentData) => {
          return (
            <div key={user.name} className="flex items-center mb-2">
              <UserRound size={24} className="mr-2 w-4 h-4" />
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Assignment.Skeleton = function AssignmentSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
