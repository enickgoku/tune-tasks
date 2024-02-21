'use client';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Board } from '@prisma/client';

interface BoardTitleFormProps {
  board: Board;
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  return (
    <Button className="font-bold text-lg h-auto w-auto p-1 px-2">
      {board.title}
    </Button>
  );
};
