import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PricingContent } from '../../components/pricing';

describe('<PricingContent />', () => {
	describe('Clicking the pricing button switch', () => {
		it('Toggles monthly and yearly values', async () => {
			const user = userEvent.setup();

			const monthlyUnitPrice = '£10.00';
			const yearlyUnitPrice = '£100.00';
			render(
				<PricingContent
					monthlyUnitPrice={monthlyUnitPrice}
					yearlyUnitPrice={yearlyUnitPrice}
				/>
			);

			const monthlyPriceTextId = 'monthlyPriceText';
			const yearlyPriceTextId = 'yearlyPriceText';

			const monthlyPriceTextIdElement = screen.getByTestId(monthlyPriceTextId);

			expect(monthlyPriceTextIdElement).toBeInTheDocument();
			expect(monthlyPriceTextIdElement.textContent).toBe(monthlyUnitPrice);
			expect(screen.queryByTestId(yearlyPriceTextId)).not.toBeInTheDocument();

			const clickButtonSwitch = async () => {
				await user.click(screen.getByTestId('togglePricingInterval'));
			};

			await clickButtonSwitch();

			expect(screen.getByTestId(yearlyPriceTextId)).toBeInTheDocument();
			expect(screen.getByTestId(yearlyPriceTextId).textContent).toBe(
				yearlyUnitPrice
			);
			expect(screen.queryByTestId(monthlyPriceTextId)).not.toBeInTheDocument();

			await clickButtonSwitch();

			expect(monthlyPriceTextIdElement).toBeInTheDocument();
			expect(monthlyPriceTextIdElement.textContent).toBe(monthlyUnitPrice);
			expect(screen.queryByTestId(yearlyPriceTextId)).not.toBeInTheDocument();
		});
	});
});
