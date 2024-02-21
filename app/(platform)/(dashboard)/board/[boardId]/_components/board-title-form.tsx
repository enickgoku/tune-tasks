'use client';
import { ElementRef, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Board } from '@prisma/client';
import { FormInput } from '@/components/form/form-input';

import { updateBoard } from '@/actions/update-board';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  board: Board;
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (board) => {
      toast.success(`The ${board.title} board was updated.`);
      setTitle(board.title);
      disableEditing();
    },
    onError: () => {
      toast.error(`Failed to update the ${board.title} board.`);
    },
  });

  const formRef = useRef<ElementRef<'form'>>(null);

  const inputRef = useRef<ElementRef<'input'>>(null);

  const [title, setTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({
      title,
      id: board.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={onSubmit}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visable:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
