import { formatValueToGBP } from '~/lib/intl';

describe('formatValueToGBP', () => {
	it('formats a number to a GBP currency string', () => {
		expect(formatValueToGBP(1000.5)).toBe('£1,000.50');
	});
});
