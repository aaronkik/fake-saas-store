import { Switch } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
	ButtonLink,
	Container,
	Divider,
	Footer,
	Header,
} from '../../components';
import {
	formatValueToGBP,
	stripeClient,
	STRIPE_MONTH_SUB_PRICE_ID,
	STRIPE_SAAS_PRODUCT_ID,
	STRIPE_YEAR_SUB_PRICE_ID,
} from '../../lib';

const pricingFeatures = [
	'Ultra blazingly fast',
	'Supports lots of stuff',
	'Access stuff anytime anywhere',
];

interface Props {
	monthlyUnitPrice: string;
	yearlyUnitPrice: string;
}

const PricingPage = ({ monthlyUnitPrice, yearlyUnitPrice }: Props) => {
	const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
	return (
		<div>
			<Head>
				<title>Pricing</title>
			</Head>
			<Header />
			<main>
				<Container>
					<div className='flex flex-col items-center gap-2 py-8 px-4 text-center md:px-20 md:py-16'>
						<h1 className='text-3xl font-black sm:text-5xl md:text-6xl'>
							Pricing
						</h1>
						<p className='text-base text-neutral-700 dark:text-neutral-300 md:text-xl'>
							Prices fetched via Stripe API at build time
						</p>
						<div className='mt-4 flex w-full max-w-xl flex-col items-center'>
							<Switch.Group>
								<div className='flex flex-row gap-2 text-sm transition-all duration-150'>
									<span>Monthly billing</span>
									<Switch
										checked={interval === 'yearly'}
										onChange={() =>
											setInterval((currentInterval) =>
												currentInterval === 'monthly' ? 'yearly' : 'monthly'
											)
										}
										className={`${
											interval === 'yearly'
												? 'bg-brand dark:bg-green-300'
												: 'bg-neutral-400 dark:bg-neutral-600'
										} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
									>
										<span
											className={`${
												interval === 'yearly'
													? 'translate-x-6'
													: 'translate-x-1'
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
									{interval === 'monthly' ? monthlyUnitPrice : yearlyUnitPrice}{' '}
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
									<Link href='/signup' passHref>
										<ButtonLink>Contact us</ButtonLink>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Container>
				<Divider />
			</main>
			<Container>
				<Footer />
			</Container>
		</div>
	);
};

export async function getStaticProps() {
	if (!STRIPE_SAAS_PRODUCT_ID)
		throw new Error('Missing env STRIPE_SAAS_PRODUCT_ID');

	if (!STRIPE_MONTH_SUB_PRICE_ID)
		throw new Error('Missing env STRIPE_MONTH_SUB_PRICE_ID');

	if (!STRIPE_YEAR_SUB_PRICE_ID)
		throw new Error('Missing env STRIPE_YEAR_SUB_PRICE_ID');

	// There should only be one active monthly price and one active yearly price
	const { data: prices } = await stripeClient.prices.list({
		active: true,
		product: STRIPE_SAAS_PRODUCT_ID,
		limit: 2,
	});

	const monthlyPrice = prices.find(
		({ id }) => id === STRIPE_MONTH_SUB_PRICE_ID
	);
	const yearlyPrice = prices.find(({ id }) => id === STRIPE_YEAR_SUB_PRICE_ID);

	if (!monthlyPrice || !yearlyPrice)
		throw new Error('Monthly or yearly prices not found');

	const monthlyUnitPrice = formatValueToGBP(
		Number(monthlyPrice.unit_amount) / 100
	);
	const yearlyUnitPrice = formatValueToGBP(
		Number(yearlyPrice.unit_amount) / 100
	);

	return { props: { monthlyUnitPrice, yearlyUnitPrice } };
}

export default PricingPage;
