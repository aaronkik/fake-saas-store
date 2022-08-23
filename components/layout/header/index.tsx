import Link from 'next/link';
import { Container, Divider, IconLogo, Logo } from '~/components';

const headerLinks = [
	{ path: '/', name: 'Home' },
	{ path: '/pricing', name: 'Pricing' },
	{ path: '/contact', name: 'Contact' },
];

const Header = () => (
	<header className='sticky top-0 z-50 backdrop-blur-sm bg-neutral-100/25 dark:bg-neutral-900/25 backdrop-grayscale-[0.2]'>
		<Container>
			<div className='flex items-center justify-between py-4 px-4'>
				<Link href='/' passHref>
					<a>
						<IconLogo className='h-6 w-auto sm:hidden' />
						<Logo className='hidden sm:block sm:h-6 sm:w-auto' />
					</a>
				</Link>
				<div className='text-brand flex flex-row gap-6 font-medium transition-all duration-150 dark:text-green-300'>
					{headerLinks.map(({ path, name }) => (
						<Link href={path} passHref key={path}>
							<a className='hover:underline transition-all duration-150'>
								{name}
							</a>
						</Link>
					))}
				</div>
			</div>
		</Container>
		<Divider />
	</header>
);

export default Header;
