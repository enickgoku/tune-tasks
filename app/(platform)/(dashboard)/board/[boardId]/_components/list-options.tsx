'use client';

import { List } from '@prisma/client';

import { useAction } from '@/hooks/use-action';
import { deleteList } from '@/actions/delete-list';
import { copyList } from '@/actions/copy-list';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';
import { ColorPicker } from './color-picker';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ElementRef, useRef, useState } from 'react';

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
  headerColor: string;
  setHeaderColor: (color: string) => void;
}

export const ListOptions = ({
  list,
  onAddCard,
  headerColor,
  setHeaderColor,
}: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (list) => {
      toast.success(`Deleted the ${list.title} list.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (list) => {
      toast.success(`Copied the ${list.title} list.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id, boardId });
  };
  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className="h-auto w-auto p-2 mb-3" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-mont text-neutral-600 text-center pb-4">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={() => setColorPickerOpen(!colorPickerOpen)}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Header Color...
        </Button>
        {colorPickerOpen && (
          <ColorPicker
            headerColor={headerColor}
            setHeaderColor={setHeaderColor}
          />
        )}
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add Card...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator className="bg-black/70 mt-2" />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-lg w-full h-auto px-5 justify-start font-normal text-sm hover:bg-rose-500 hover:text-white"
          >
            Delete This List...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
