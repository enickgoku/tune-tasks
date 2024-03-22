'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/modals/card-modal';
import { ProModal } from '@/components/modals/pro-modal';
import { AssignCardModal } from '../modals/assign-modal';
import { UploadCardModal } from '../modals/upload-audio-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadCardModal />
      <AssignCardModal />
      <CardModal />
      <ProModal />
    </>
  );
};
