'use client';

import { ListWrapper } from './list-wrapper';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';

import { Plus, X } from 'lucide-react';
import { useState, useRef, ElementRef } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useParams } from 'next/navigation';

export const ListForm = () => {
  const params = useParams();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    // make sure focus occurs after rerender if there is one.
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onEscKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onEscKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-lg bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="List title..."
            className="text-sm px-2 py-1 h-7 font-mont border-transparent hover:border-input focus:border-input transition"
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit className="bg-blue-700/80">Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        onClick={enableEditing}
        className="text-black/90 w-full rounded-md bg-white/80 hover:bg-white/40 transition p-3 flex items-center justify-start font-medium text-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a list!
      </Button>
    </ListWrapper>
  );
};
