'use client';

import { ListWithCards } from '@/types';

import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import { CardForm } from './card-form';

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} list={list} />
        <CardForm
          ref={textAreaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={list.id}
        />
      </div>
    </li>
  );
};
