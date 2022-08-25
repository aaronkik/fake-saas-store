import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { ContactForm } from '~/components/contact';
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH_MESSAGE,
} from '~/constants/form';
import { server } from '~/__mocks__/msw-server';

describe('<ContactForm />', () => {
  it('Displays form errors after clicking submit button with empty fields', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');

    const emailFormErrorTestId = 'emailErrorText';
    const messageFormErrorTestId = 'messageErrorText';

    expect(screen.queryByTestId(emailFormErrorTestId)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(messageFormErrorTestId)
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId(emailFormErrorTestId)).toBeInTheDocument();
      expect(screen.getByTestId(messageFormErrorTestId)).toBeInTheDocument();
    });
  });

  it('Displays max length error message on submit when message exceeds max length', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    const typedEmail = 'test@example.com';
    const typedLongMessage = 'a'.repeat(CONTACT_MESSAGE_MAX_LENGTH + 1);

    expect(
      screen.queryByText(CONTACT_MESSAGE_MAX_LENGTH_MESSAGE)
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), typedEmail);
    await user.type(screen.getByLabelText(/message/i), typedLongMessage);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(CONTACT_MESSAGE_MAX_LENGTH_MESSAGE)
      ).toBeInTheDocument();
    });
  });

  it('Submits with valid fields and an error message is shown when api returns error', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    const typedEmail = 'test@example.com';
    const typedMessage = 'This is a test message';

    await user.type(screen.getByLabelText(/email/i), typedEmail);
    await user.type(screen.getByLabelText(/message/i), typedMessage);

    expect(screen.getByLabelText(/email/i)).toHaveValue(typedEmail);
    expect(screen.getByLabelText(/message/i)).toHaveValue(typedMessage);

    server.use(
      rest.post('/api/contact', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'An error occured' }))
      )
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId('contactErrorText')).toBeInTheDocument();
    });
  });

  it('Submits with valid fields and success message is shown', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    const typedEmail = 'test@example.com';
    const typedMessage = 'This is a test message';

    await user.type(screen.getByLabelText(/email/i), typedEmail);
    await user.type(screen.getByLabelText(/message/i), typedMessage);

    expect(screen.getByLabelText(/email/i)).toHaveValue(typedEmail);
    expect(screen.getByLabelText(/message/i)).toHaveValue(typedMessage);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
      expect(screen.getByTestId('contactSuccessText')).toBeInTheDocument();
    });
  });

  it('Displays a loading spinner on submit and hides on response', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a test message'
    );

    const apiDelay = 500;
    server.use(
      rest.post('/api/contact', (req, res, ctx) =>
        res(
          ctx.delay(apiDelay),
          ctx.status(200),
          ctx.json({ data: 'Successful response' })
        )
      )
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    const loadingSpinnerTestId = 'loadingSpinner';
    await waitFor(() => {
      expect(screen.getByTestId(loadingSpinnerTestId)).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(screen.getByTestId(loadingSpinnerTestId), {
      timeout: apiDelay * 1.5,
    });
  });
});
