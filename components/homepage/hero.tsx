import Link from 'next/link';
import { ButtonLink } from '~/components';
import { PRODUCT_VIDEO } from '~/constants/urls';

const Hero = () => (
	<div className='flex flex-col gap-8 py-8 px-4 text-left md:flex-row md:items-center md:py-20 md:px-12'>
		<div className='flex-1'>
			<h1 className='text-4xl tracking-wide font-black md:text-4xl'>
				Completely{' '}
				<span className='text-brand dark:text-green-300'>legitimate</span>{' '}
				software
			</h1>
			<p className='text-base text-neutral-700 dark:text-neutral-300 md:text-lg'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore commodi
				recusandae numquam velit quibusdam ipsum quos dolorum possimus
				repellendus excepturi.
			</p>
			<Link href='/contact' passHref>
				<ButtonLink className='mt-2 font-semibold'>Contact us</ButtonLink>
			</Link>
		</div>
		<div className='aspect-video flex-1 rounded-md shadow-md'>
			<iframe
				className='h-full w-full rounded-md'
				src={PRODUCT_VIDEO}
				title='Demo video'
			/>
		</div>
	</div>
);

export default Hero;
