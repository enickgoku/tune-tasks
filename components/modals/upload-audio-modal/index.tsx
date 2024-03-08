'use client';

import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useAddAudioModal } from '@/hooks/use-add-audio-modal';
import { useParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { ElementRef, useRef } from 'react';

import { toast } from 'sonner';
import { uploadToSupabaseAndPostgres } from '@/actions/supabase-postgres-upload-audio';
import { uniqueId } from 'lodash';
import { supabase } from '@/lib/supabase';

export const UploadCardModal = () => {
  const id = useAddAudioModal((state) => state.id);
  const isOpen = useAddAudioModal((state) => state.isOpen);
  const onClose = useAddAudioModal((state) => state.onClose);
  const { orgId } = useAuth();

  const params = useParams();
  const audioInputRef = useRef<ElementRef<'input'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const onSubmit = async (formData: FormData) => {
    if (!orgId) {
      return toast.error('Unauthorized');
    }

    const title = formData.get('audio-title') as string;
    const audio = formData.get('audio') as File;

    if (!title || !audio) {
      return;
    }

    const uniqueID = uniqueId();

    const { data: audioData, error: audioError } = await supabase.storage

      .from('audio')
      .upload(`audio-${title}-${uniqueID}`, audio, {
        cacheControl: '3600',
        upsert: false,
      });

    if (audioError) {
      throw new Error('Failed to upload audio');
    }

    uploadToSupabaseAndPostgres({
      data: {
        audioPath: audioData?.path as string,
        title,
        cardId: id as string,
        boardId: params.boardId as string,
        orgId,
      },
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-4">Add Audio</h2>
          <form ref={formRef} action={onSubmit}>
            <FormInput
              id="audio-title"
              type="text"
              placeholder="Name for this audio"
              ref={inputRef}
              className="mb-4 h-10 w-full"
            />
            <FormInput
              id="audio"
              type="file"
              placeholder="Upload audio for this card."
              ref={audioInputRef}
              className="mb-4 h-10 w-full file:cursor-pointer"
            />
            <div className="flex justify-center mt-10">
              <FormSubmit>Add Audio</FormSubmit>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
