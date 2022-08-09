import { Logo } from '../icons';
import Link from 'next/link';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { LINKEDIN, TWITTER } from '../../constants/urls';

const footerLinks = [
	{ path: '/pricing', name: 'Pricing' },
	{ path: '/contact', name: 'Contact' },
	{ path: '/terms.txt', name: 'Terms' },
	{ path: '/privacy.txt', name: 'Privacy' },
];

const FULL_YEAR = new Date().getFullYear();

const Footer = () => (
	<footer className='flex flex-col py-4 px-2 md:py-8 md:px-4'>
		<div className='flex flex-row flex-wrap justify-between gap-4 py-4'>
			<div className='flex flex-col gap-2'>
				<div>
					<Logo className='h-6 w-auto' />
				</div>
				<div className='flex flex-row gap-1'>
					<a
						className='my-2 mr-2'
						target='_blank'
						href={LINKEDIN}
						rel='noreferrer'
					>
						<FaLinkedin className='h-6 w-6 text-blue-700 hover:text-blue-600 transition-all duration-150 dark:text-neutral-400 dark:hover:text-neutral-300' />
					</a>
					<a className='m-2' target='_blank' href={TWITTER} rel='noreferrer'>
						<FaTwitter className='h-6 w-6 text-blue-500 hover:text-blue-400 transition-all duration-150 dark:text-neutral-400 dark:hover:text-neutral-300' />
					</a>
				</div>
			</div>
			<div className='flex flex-col gap-2 text-sm font-semibold'>
				<p className='text-lg font-semibold'>Resources</p>
				{footerLinks.map(({ name, path }) => (
					<Link href={path} key={name} passHref>
						<a className='text-brand transition-all duration-150 hover:underline dark:text-green-300'>
							{name}
						</a>
					</Link>
				))}
			</div>
		</div>
		<p className='text-xs text-neutral-600 dark:text-neutral-400'>
			&copy; 2022 - {FULL_YEAR}. All rights reserved.
		</p>
	</footer>
);

export default Footer;
