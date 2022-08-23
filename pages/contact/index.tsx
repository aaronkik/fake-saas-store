import Head from 'next/head';
import { Container } from '~/components';
import { ContactForm } from '~/components/contact';

const ContactPage = () => (
  <>
    <Head>
      <title>Contact</title>
    </Head>
    <Container>
      <div className='flex flex-col items-center gap-2 pt-8 px-4 text-center md:px-20 md:pt-16'>
        <h1 className='text-3xl font-black sm:text-5xl md:text-6xl'>Contact</h1>
        <p className='text-base text-neutral-700 dark:text-neutral-300 md:text-xl'>
          Fill out the form below to receive an email via SendGrid
        </p>
      </div>
      <div className='flex justify-center px-4 md:px-20'>
        <ContactForm />
      </div>
    </Container>
  </>
);

export default ContactPage;
