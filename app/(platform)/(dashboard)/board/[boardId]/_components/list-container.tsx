'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { ListWithCards } from '@/types';
import { useAction } from '@/hooks/use-action';
import { updateListOrder } from '@/actions/update-list-order';
import { updateCardOrder } from '@/actions/update-card-order';

import { ListForm } from './list-form';
import { ListItem } from './list-item';
import { toast } from 'sonner';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(lists);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List order updated.');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Card order updated.');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  const onDragEnd = (results: any) => {
    const { destination, source, type } = results;

    if (!destination) {
      return;
    }

    // If dropped in same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list

    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (list, index) => ({ ...list, order: index })
      );

      setOrderedData(items);

      // trigger server action

      executeUpdateListOrder({
        items,
        boardId,
      });
    }

    // User moves a card

    if (type === 'card') {
      let newOrderedData = [...orderedData];

      // Get Source and Destination Data.

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // Check if cards exists in source and destination list.

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving the card in the same list.

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        // trigger server action
        executeUpdateCardOrder({
          items: reorderedCards,
          boardId,
        });
        // Moving the card to another list.
      } else {
        // Remove card from source list.

        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new ListId to the moved card.
        movedCard.listId = destination.droppableId;

        // Add the moved card to the destination list.

        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Update the order of the cards in the destination list.

        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);

        // trigger server action
        executeUpdateCardOrder({
          items: destinationList.cards,
          boardId,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} list={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
