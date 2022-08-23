import EmailValidator from 'email-validator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormLabel } from '~/components';
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH_MESSAGE,
  CONTACT_MESSAGE_REQUIRED_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
} from '~/constants/form';
import { ContactApiResponse } from '~/types/contact';
import ContactFormResponse from './contact-form-response';

interface FormFields {
  email: string;
  message: string;
}

const ContactForm = () => {
  const [contactApiResponse, setContactApiResponse] =
    useState<ContactApiResponse | null>(null);

  const {
    formState: {
      errors: { email: emailErrors, message: messageErrors },
    },
    handleSubmit,
    register,
    reset: resetForm,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      message: '',
    },
    mode: 'onSubmit',
  });

  const submitContactForm = handleSubmit(async (fields) => {
    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify(fields),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        method: 'POST',
      });

      const apiData = await response.json();

      setContactApiResponse(apiData);

      if (apiData.error) return;

      resetForm({ email: '', message: '' });
    } catch (error) {
      console.error(error);
      setContactApiResponse({ error: 'Unknown error occured' });
    }
  });

  return (
    <form
      className='my-4 flex flex-col gap-2 w-full max-w-sm'
      id='contact-form'
      onSubmit={submitContactForm}
    >
      <FormLabel htmlFor='email'>Email</FormLabel>
      <input
        autoComplete='email'
        className='focus:border-brand focus:ring-brand rounded-md border-transparent bg-neutral-200 text-neutral-700 transition-all duration-150 placeholder:font-medium placeholder:text-black/50 focus:bg-transparent dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-white/50 dark:focus:border-green-300 dark:focus:bg-transparent dark:focus:ring-green-300'
        id='email'
        inputMode='email'
        type='email'
        {...register('email', {
          required: EMAIL_REQUIRED_MESSAGE,
          validate: (value) =>
            EmailValidator.validate(value) || EMAIL_INVALID_MESSAGE,
        })}
      />
      {emailErrors && (
        <FormErrorMessage data-testid='emailErrorText'>
          {emailErrors.message}
        </FormErrorMessage>
      )}
      <FormLabel htmlFor='message'>Message</FormLabel>
      <textarea
        id='message'
        className='focus:border-brand focus:ring-brand rounded-md border-transparent bg-neutral-200 text-neutral-700 transition-all duration-150 placeholder:font-medium placeholder:text-black/50 focus:bg-transparent dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-white/50 dark:focus:border-green-300 dark:focus:bg-transparent dark:focus:ring-green-300'
        rows={4}
        {...register('message', {
          required: CONTACT_MESSAGE_REQUIRED_MESSAGE,
          maxLength: {
            value: CONTACT_MESSAGE_MAX_LENGTH,
            message: CONTACT_MESSAGE_MAX_LENGTH_MESSAGE,
          },
        })}
      />
      {messageErrors && (
        <FormErrorMessage data-testid='messageErrorText'>
          {messageErrors.message}
        </FormErrorMessage>
      )}
      <ContactFormResponse contactFormResponse={contactApiResponse} />
      <Button className='mt-2 self-end' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
