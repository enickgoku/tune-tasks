'use client';

import { useState, useRef, ElementRef } from 'react';
import { List } from '@prisma/client';
import { useEventListener } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { updateList } from '@/actions/update-list';
import { toast } from 'sonner';
import { ListOptions } from './list-options';
import { hexToRGBA } from '@/lib/hex-to-rgba';

interface ListHeaderProps {
  list: List;
  onAddCard: () => void;
}

export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [headerColor, setHeaderColor] = useState('');

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (list) => {
      toast.success(`Renamed list to ${list.title}`);
      setTitle(list.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (title === list.title) {
      return disableEditing();
    }

    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);

  return (
    <div
      className={`pt-2 px-2 text-sm font-mont flex justify-between items-start gap-x-2 rounded-t-md mb-2`}
      style={{ backgroundColor: list.headerColor as string }}
    >
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            placeholder="Enter Title Here..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-mont border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions
        list={list}
        onAddCard={onAddCard}
        headerColor={headerColor}
        setHeaderColor={setHeaderColor}
      />
    </div>
  );
};
