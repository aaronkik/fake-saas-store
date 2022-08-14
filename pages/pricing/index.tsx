import Head from 'next/head';
import { Container, Divider, Footer, Header } from '../../components';
import { PricingContent } from '../../components/pricing';
import {
	formatValueToGBP,
	stripeClient,
	STRIPE_MONTH_SUB_PRICE_ID,
	STRIPE_SAAS_PRODUCT_ID,
	STRIPE_YEAR_SUB_PRICE_ID,
} from '../../lib';

interface Props {
	monthlyUnitPrice: string;
	yearlyUnitPrice: string;
}

const PricingPage = ({ monthlyUnitPrice, yearlyUnitPrice }: Props) => (
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
					<PricingContent
						monthlyUnitPrice={monthlyUnitPrice}
						yearlyUnitPrice={yearlyUnitPrice}
					/>
				</div>
			</Container>
			<Divider />
		</main>
		<Container>
			<Footer />
		</Container>
	</div>
);

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
