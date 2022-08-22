import EmailValidator from 'email-validator';
import { rest } from 'msw';
import { sendMail } from '../../lib/email';
import { ContactApiRequest } from '../../types/contact';

const handlers = [
	rest.post('/api/contact', async (req, res, ctx) => {
		const { email, message } = (await req.json()) as ContactApiRequest;

		if (!EmailValidator.validate(email)) {
			return res(ctx.status(400), ctx.json({ error: 'Invalid email format' }));
		}

		if (!message) {
			return res(
				ctx.status(400),
				ctx.json({ error: 'Message not present in body' })
			);
		}

		try {
			await sendMail({
				recipient: email,
				subject: 'Contact form submission',
				message,
			});
			return res(ctx.status(500), ctx.json({ data: `Email sent to ${email}` }));
		} catch (error) {
			console.error(error);
			return res(ctx.status(400), ctx.json({ error: 'Failed to send email' }));
		}
	}),
];

export default handlers;
