'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/modals/card-modal';
import { ProModal } from '@/components/modals/pro-modal';
import { AssignCardModal } from '../modals/assign-modal';
import { UploadCardModal } from '../modals/upload-audio-modal';
import { AudioProvider } from './audio-provider';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AudioProvider>
        <UploadCardModal />
        <AssignCardModal />
        <CardModal />
        <ProModal />
      </AudioProvider>
    </>
  );
};
