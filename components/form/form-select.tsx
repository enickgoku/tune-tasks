import { forwardRef } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';

interface FormSelectProps {
  id: string;
  label?: string;
  value?: string;
  name: string;
  options: { value: string; label: string }[]; // Add options prop for select options
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  children?: React.ReactNode;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      id,
      label,
      options,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <Label className="text-md">
          <span>{label}</span>
        </Label>
        <div className="space-y-1">
          <select
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            required={required}
            id={id}
            disabled={disabled}
            className={cn(
              'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
              className
            )}
            aria-describedby={`${id}-error`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
