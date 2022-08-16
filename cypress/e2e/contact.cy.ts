describe('Contact Page', () => {
	describe('Contact Form', () => {
		beforeEach(() => {
			cy.visit('/contact');
		});

		const emailInput = 'input[name="email"]';
		const messageInput = 'textarea[name="message"]';
		const submitButton = 'button[type="submit"]';

		const emailFormError = '[data-testid="emailErrorText"]';
		const messageFormError = '[data-testid="messageErrorText"]';

		it('Shows error text with empty fields', () => {
			cy.get('form').within(() => {
				cy.get(emailInput).should('have.value', '');
				cy.get(messageInput).should('have.value', '');

				cy.get(submitButton).click();

				cy.get(emailFormError).should('be.visible');
				cy.get(messageFormError).should('be.visible');
			});
		});

		it('Submits with valid fields', () => {
			cy.get('form').within(() => {
				cy.get(emailInput).type(Cypress.env('TEST_EMAIL'));
				cy.get(messageInput).type('This is a test message');

				cy.get(submitButton).click();

				cy.get(emailInput).should('have.value', '');
				cy.get(messageInput).should('have.value', '');
			});
		});
	});
});
