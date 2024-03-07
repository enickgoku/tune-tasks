'use client';

import { useQuery } from '@tanstack/react-query';

import { useCardModal } from '@/hooks/use-card-modal';
import { fetcher } from '@/lib/fetcher';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CardWithList } from '@/types';
import { Header } from './header';
import { Description } from './description';
import { Actions } from './actions';
import { AuditLog } from '@prisma/client';
import { Activity } from './activity';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { checkSubscription } from '@/lib/subscription';
import { useAddAudioModal } from '@/hooks/use-add-audio-modal';

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const [isPro, setIsPro] = useState(false);
  const addAudioModal = useAddAudioModal();

  useEffect(() => {
    const checkPro = async () => {
      setIsPro(await checkSubscription());
    };
    checkPro();
  }, []);

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
        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-x-4">
          <div className="col-span-1">
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
          <div className="flex justify-center mt-5">
            {isPro ? (
              <Button
                onClick={() => addAudioModal.onOpen(cardData?.id as string)}
              >
                Add Audio To This Card!
              </Button>
            ) : (
              <Button>Upgrade to Pro to add audio to this card!</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
