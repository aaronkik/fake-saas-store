import { Switch } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useState } from 'react';
import { ButtonLink } from '../../components';

const pricingFeatures = [
	'Ultra blazingly fast',
	'Supports lots of stuff',
	'Access stuff anytime anywhere',
];

interface Props {
	monthlyUnitPrice: string;
	yearlyUnitPrice: string;
}

const PricingContent = ({ monthlyUnitPrice, yearlyUnitPrice }: Props) => {
	const [pricingInterval, setPricingInterval] = useState<'monthly' | 'yearly'>(
		'monthly'
	);

	return (
		<div className='mt-4 flex w-full max-w-xl flex-col items-center'>
			<Switch.Group>
				<div className='flex flex-row gap-2 text-sm transition-all duration-150'>
					<span>Monthly billing</span>
					<Switch
						checked={pricingInterval === 'yearly'}
						data-testid='togglePricingInterval'
						onChange={() =>
							setPricingInterval((currentInterval) =>
								currentInterval === 'monthly' ? 'yearly' : 'monthly'
							)
						}
						className={`${
							pricingInterval === 'yearly'
								? 'bg-brand dark:bg-green-300'
								: 'bg-neutral-400 dark:bg-neutral-600'
						} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
					>
						<span
							className={`${
								pricingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
							} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
						/>
					</Switch>
					<span className='flex flex-col sm:block'>
						Yearly billing
						<span className='inline-block rounded-full bg-green-300 py-1 px-2 text-xs text-neutral-900 sm:absolute sm:ml-1'>
							2 months free
						</span>
					</span>
				</div>
			</Switch.Group>
			<div className='my-8 mx-4 flex flex-col items-center rounded-md border-2 border-neutral-400 p-4 dark:border-neutral-600'>
				<span className='flex flex-col items-center text-2xl font-semibold'>
					{pricingInterval === 'monthly' ? (
						<span data-testid='monthlyPriceText'>{monthlyUnitPrice}</span>
					) : (
						<span data-testid='yearlyPriceText'>{yearlyUnitPrice}</span>
					)}
					<span className='text-xs'>per user</span>
				</span>
				<div className='mt-4 flex flex-col gap-2 border-t-[1px] border-neutral-400 pt-4 dark:border-neutral-600'>
					{pricingFeatures.map((feature) => (
						<div
							className='flex flex-row items-start justify-start text-left'
							key={feature}
						>
							<div>
								<CheckCircleIcon className='text-brand h-5 w-5 dark:text-green-300' />
							</div>
							<span className='ml-2'>{feature}</span>
						</div>
					))}
					<Link href='/contact' passHref>
						<ButtonLink>Contact us</ButtonLink>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PricingContent;
