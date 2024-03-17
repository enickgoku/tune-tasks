'use client';

import { useCardModal } from '@/hooks/use-card-modal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import { AudioProvider, useAudio } from '@/components/providers/audio-provider';
import { AudioLines } from 'lucide-react';

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const { audioId } = useAudio();

  return (
    <AudioProvider>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm transition"
            onClick={() => cardModal.onOpen(card.id)}
          >
            <div className="flex justify-between">
              {card.title}
              {card.audioId && <AudioLines className="w-4 h-4" />}
            </div>
          </div>
        )}
      </Draggable>
    </AudioProvider>
  );
};
