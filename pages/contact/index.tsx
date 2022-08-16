import Head from 'next/head';
import { Container } from '../../components';
import { ContactForm } from '../../components/contact';

const ContactPage = () => (
	<>
		<Head>
			<title>Contact</title>
		</Head>
		<Container>
			<ContactForm />
		</Container>
	</>
);

export default ContactPage;
