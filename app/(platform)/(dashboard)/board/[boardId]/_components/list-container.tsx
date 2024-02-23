'use client';

import { ListWithCards } from '@/types';
import { ListForm } from './list-form';
import { useEffect, useState } from 'react';
import { ListItem } from './list-item';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(lists);

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} list={list} />;
      })}
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};
