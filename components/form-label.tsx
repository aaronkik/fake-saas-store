import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const FormLabel = ({ className, ...props }: Props) => (
  <label
    className={twMerge(
      'block text-sm font-medium text-neutral-600 dark:text-neutral-400',
      className
    )}
    {...props}
  />
);

export default FormLabel;
