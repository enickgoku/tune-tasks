'use client';

import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useAddAudioModal } from '@/hooks/use-add-audio-modal';
import { ElementRef, useRef } from 'react';

import { supabase } from '@/lib/supabase';
import { uniqueId } from 'lodash';
import { toast } from 'sonner';

export const UploadCardModal = () => {
  const id = useAddAudioModal((state) => state.id);
  const isOpen = useAddAudioModal((state) => state.isOpen);
  const onClose = useAddAudioModal((state) => state.onClose);

  const audioInputRef = useRef<ElementRef<'input'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const onSubmit = async (formData: FormData) => {
    const audio = formData.get('audio');
    const title = formData.get('audio-title');

    try {
      // place server action here
    } catch (error) {
      toast.error('Failed to upload audio');
    }

    formRef.current?.reset();
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
