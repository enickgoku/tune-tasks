'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'link'
    | 'ghost'
    | 'outline'
    | undefined;
}

export const FormButton = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={variant}
      type="submit"
      disabled={pending || disabled}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
