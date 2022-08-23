import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  forwardRef,
  AnchorHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

const buttonStyles =
  'inline-flex cursor-pointer items-center justify-center rounded-md text-base font-medium transition-all duration-150 disabled:cursor-not-allowed px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 dark:text-neutral-900 dark:focus-visible:ring-offset-neutral-900 bg-brand hover:bg-brand/90 hover:active:bg-brand/80 focus-visible:ring-brand dark:bg-green-300 dark:hover:bg-green-300/70 dark:hover:active:bg-green-300/60 dark:focus-visible:ring-green-300';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button className={twMerge(buttonStyles, className)} ref={ref} {...props} />
  )
);

Button.displayName = 'Button';

type ButtonLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, ...props }, ref) => (
    <a className={twMerge(buttonStyles, className)} ref={ref} {...props} />
  )
);
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink };
