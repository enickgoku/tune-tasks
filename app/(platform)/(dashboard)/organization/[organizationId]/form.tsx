'use client';

import { createBoard } from '@/actions/create-board';
import { FormInput } from '@/app/(platform)/(dashboard)/organization/[organizationId]/input';
import { FormButton } from './form-button';
import { useAction } from '@/hooks/use-action';

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log('Board created', data);
    },
    onError: (error) => {
      console.error('Failed to create board', error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};