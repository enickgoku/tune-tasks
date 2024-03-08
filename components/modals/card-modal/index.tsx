'use client';

import { useQuery } from '@tanstack/react-query';

import { Actions } from './actions';
import { getAudioData } from '@/lib/get-audio-data';
import { AuditLog } from '@prisma/client';
import { CardWithList } from '@/types';
import { checkSubscription } from '@/lib/subscription';
import { useCardModal } from '@/hooks/use-card-modal';
import { fetcher } from '@/lib/fetcher';
import { useAddAudioModal } from '@/hooks/use-add-audio-modal';
import { useEffect, useState } from 'react';
import { useProModal } from '@/hooks/use-pro-modal';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Header } from './header';
import { Description } from './description';
import { Activity } from './activity';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './audio';

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const [audioData, setAudioData] = useState({
    url: '',
    title: '',
  });

  useEffect(() => {
    const checkPro = async () => {
      setIsPro(await checkSubscription());
    };
    const getAndSetAudioData = async () => {
      const audioDataFromDB = await getAudioData(id as string);

      setAudioData({
        url: audioDataFromDB.url.data.publicUrl,
        title: audioDataFromDB.title,
      });
    };
    checkPro();
    getAndSetAudioData();
  }, [id]);

  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const [isPro, setIsPro] = useState(false);
  const addAudioModal = useAddAudioModal();
  const proModal = useProModal();

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
              <Button onClick={() => proModal.onOpen}>
                Upgrade to Pro to add audio to this card!
              </Button>
            )}
          </div>
          {audioData && audioData.url && audioData.title && (
            <AudioPlayer
              audioData={audioData as { url: string; title: string }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
