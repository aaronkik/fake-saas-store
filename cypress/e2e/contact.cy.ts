import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH_MESSAGE,
} from '~/constants/form';

describe('Contact Page', () => {
  describe('Contact Form', () => {
    beforeEach(() => {
      cy.visit('/contact');
    });

    const validTestEmail = Cypress.env('TEST_EMAIL');

    const emailInput = 'input[name="email"]';
    const messageInput = 'textarea[name="message"]';
    const submitButton = 'button[type="submit"]';

    const emailFormError = '[data-testid="emailErrorText"]';
    const messageFormError = '[data-testid="messageErrorText"]';
    const successResponseMessage = '[data-testid="contactSuccessText"]';

    it('Shows error text with empty fields', () => {
      cy.get('form').within(() => {
        cy.get(emailInput).should('have.value', '');
        cy.get(messageInput).should('have.value', '');

        cy.get(submitButton).click();

        cy.get(emailFormError).should('be.visible');
        cy.get(messageFormError).should('be.visible');
      });
    });

    it('Does not submit with an invalid email', () => {
      cy.get('form').within(() => {
        cy.get(emailInput).type('Invalid email input');
        cy.get(messageInput).type('This is a test message');

        cy.get(submitButton).click();

        cy.get(successResponseMessage).should('not.exist');
      });
    });

    it('Displays max length error message when message exceeds max length on submit', () => {
      cy.get('form').within(() => {
        cy.get(emailInput).type(validTestEmail);
        cy.get(messageInput).type('a'.repeat(CONTACT_MESSAGE_MAX_LENGTH + 1));

        cy.get(submitButton).click();

        cy.get(successResponseMessage).should('not.exist');
        cy.get(messageFormError).contains(CONTACT_MESSAGE_MAX_LENGTH_MESSAGE);
      });
    });

    it('Submits with valid fields and responds success text', () => {
      cy.get('form').within(() => {
        cy.get(emailInput).type(validTestEmail);
        cy.get(messageInput).type('This is a test message');

        cy.get(submitButton).click();

        cy.get(emailInput).should('have.value', '');
        cy.get(messageInput).should('have.value', '');
        cy.get(successResponseMessage).should('be.visible');
      });
    });
  });
});
