import { twMerge } from 'tailwind-merge';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

const FormErrorMessage = ({ className, ...props }: Props) => (
  <span
    className={twMerge('text-xs text-red-500 dark:text-red-300', className)}
    role='alert'
    {...props}
  />
);

export default FormErrorMessage;
