'use client';

import { toast } from 'sonner';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';

import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { X } from 'lucide-react';
import { FormPicker } from './form-picker';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/use-pro-modal';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success('Board created');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-5"
      >
        <div className="flex items-center justify-center text-sm font-medium text-neutral-500 pb-4">
          Create a new board.
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create Board</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
