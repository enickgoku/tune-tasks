'use client';

import { CardWithList } from '@/types';
import { useAction } from '@/hooks/use-action';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Trash, UserRoundSearch } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCardModal } from '@/hooks/use-card-modal';
import { toast } from 'sonner';
import { useAssignCardModal } from '@/hooks/use-assign-card-modal';

interface ActionsProps {
  card: CardWithList;
}

export const Actions = ({ card }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  const assignCardModel = useAssignCardModal();

  const { execute: copyCardExecute, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`Card: ${data.title} copied successfully.`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const { execute: deleteCardExecute, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess() {
        toast.success('Card deleted successfully.');
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    copyCardExecute({
      id: card.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    deleteCardExecute({
      id: card.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={() => assignCardModel.onOpen(card.id)}
      >
        <UserRoundSearch className="h-4 w-4 mr-2" />
        Assign
      </Button>
      <Button
        disabled={isLoadingDelete}
        variant="destructive"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
