import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const Section = ({ className, ...props }: Props) => (
	<section
		className={twMerge('px-8 py-4 md:px-16 md:py-12', className)}
		{...props}
	/>
);

export default Section;
