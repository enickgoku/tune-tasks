'use client';

import { useAssignCardModal } from '@/hooks/use-assign-card-modal';
import { useOrgUsers } from '@/hooks/use-org-users';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { FormSubmit } from '@/components/form/form-submit';

import { fetcher } from '@/lib/fetcher';
import { CardWithList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ElementRef, useRef } from 'react';
import { FormSelect } from '@/components/form/form-select';

export const AssignCardModal = () => {
  const params = useParams();
  const cardId = useAssignCardModal((state) => state.id);
  const isOpen = useAssignCardModal((state) => state.isOpen);
  const onClose = useAssignCardModal((state) => state.onClose);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'select'>>(null);

  const users = useOrgUsers();

  const options =
    users
      ?.map((user) => {
        return { value: user.firstName ?? '', label: user.firstName ?? '' };
      })
      .filter((option) => option.value && option.label) || [];

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}`),
  });

  if (!users) {
    return <AssignCardModal.Skeleton />;
  }

  const onSubmit = (formData: FormData) => {
    formData.get('firstName');
    const cardId = cardData?.id;
    const boardId = params.boardId as string;

    console.log(formData.get('firstName'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col justify-center items-center h-30">
          <div className="flex my-5">
            <Tag className="mx-2" />
            <h2 className="text-lg font-mont">
              Assignment for Card: {cardData?.title}
            </h2>
          </div>
          <h2 className="text-md font-semibold mb-5">
            Assign a Card To a User
          </h2>
          <form
            action={onSubmit}
            ref={formRef}
            className="flex flex-col items-center justify-center"
          >
            <FormSelect
              id="firstName" // Ensure ID matches the htmlFor of any associated label
              options={options}
              name="firstName" // Important for formData to correctly identify the select element
              required={true}
              ref={inputRef}
              label="Select a user"
              // Add any additional props as needed
            />
            <FormSubmit className="mt-10">Assign</FormSubmit>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

AssignCardModal.Skeleton = function AssignCardModalSkeleton() {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent>
        <Skeleton className="h-30" />
      </DialogContent>
    </Dialog>
  );
};
