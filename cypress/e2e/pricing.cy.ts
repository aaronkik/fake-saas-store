describe('Pricing', () => {
	it('User can click button to show monthly or yearly prices', () => {
		/**
		 * Following regex matches the output return from Intl.NumberFormat GBP currency
		 * located in (lib/intl.ts -> formatValueToGBP)
		 *
		 * £11.00
		 * £111.00
		 * £111,111,111.00
		 * £0.00
		 * £0.10
		 */
		const GBPTextRegex = /^£\d{1,3}(,\d{1,3})*\.\d{2}$/;

		const buttonSwitch = 'button[data-testid="togglePricingInterval"]';
		const monthlyUnitPriceAttr = '[data-testid="monthlyUnitPrice"]';
		const yearlyUnitPriceAttr = '[data-testid="yearlyUnitPrice"]';

		cy.visit('/pricing');

		cy.get(monthlyUnitPriceAttr)
			.should('exist')
			.should('be.visible')
			.contains(GBPTextRegex);
		cy.get(yearlyUnitPriceAttr).should('not.exist');

		cy.get(buttonSwitch).click();

		cy.get(yearlyUnitPriceAttr)
			.should('exist')
			.should('be.visible')
			.contains(GBPTextRegex);
		cy.get(monthlyUnitPriceAttr).should('not.exist');

		cy.get(buttonSwitch).click();

		cy.get(monthlyUnitPriceAttr)
			.should('exist')
			.should('be.visible')
			.contains(GBPTextRegex);
		cy.get(yearlyUnitPriceAttr).should('not.exist');
	});
});
