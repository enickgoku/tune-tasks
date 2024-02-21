import { Board } from '@prisma/client';
import { BoardTitleForm } from './board-title-form';
import { BoardOptions } from './board-options';

interface BoardNavbarProps {
  board: Board;
}

export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/40 fixed top-14 flex items-center px-6 gap-x-4 text-white font-mont">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  );
};
