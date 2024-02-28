'use client';

import { useQuery } from '@tanstack/react-query';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCardModal } from '@/hooks/use-card-modal';

import { CardWithList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { Header } from './header';
import { Description } from './description';
import { Actions } from './actions';
import { AuditLog } from '@prisma/client';
import { Activity } from './activity';

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header cardData={cardData} />}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4">
          <div className="cols-span-3">
            <div className="space-y-6 w-full">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description card={cardData} />
              )}
              {!auditLogData ? (
                <Activity.Skeleton />
              ) : (
                <Activity logs={auditLogData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions card={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
