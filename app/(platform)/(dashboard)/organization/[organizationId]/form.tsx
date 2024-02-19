'use client';

import { State, createBoard } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { FormInput } from '@/app/(platform)/(dashboard)/organization/[organizationId]/input';
import { FormButton } from './form-button';

export const Form = () => {
  const initialState = { message: null, errors: {} } as State;

  const [state, dispatch] = useFormState(createBoard, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  );
};
