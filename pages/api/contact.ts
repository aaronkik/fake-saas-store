import EmailValidator from 'email-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '../../lib/email';
import { ContactApiRequest, ContactApiResponse } from '../../types/contact';

const contact = async (
	req: NextApiRequest,
	res: NextApiResponse<ContactApiResponse>
) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { email, message } = req.body as ContactApiRequest;

	if (!EmailValidator.validate(email)) {
		return res.status(400).json({ error: 'Invalid email format' });
	}

	if (!message) {
		return res.status(400).json({ error: 'Message not present in body' });
	}

	try {
		await sendMail({
			recipient: email,
			subject: 'Contact form submission',
			message,
		});
		res.status(200).json({ data: `Email sent to ${email}` });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ error: 'Failed to send email' });
	}
};

export default contact;
