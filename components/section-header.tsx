import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = DetailedHTMLProps<
	HTMLAttributes<HTMLHeadingElement>,
	HTMLHeadingElement
>;

const SectionHeader = ({ className, ...props }: Props) => (
	<h2
		className={twMerge(
			'text-3xl tracking-wide font-black md:text-4xl',
			className
		)}
		{...props}
	/>
);

export default SectionHeader;
