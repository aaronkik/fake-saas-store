import EmailValidator from 'email-validator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactApiResponse } from '../../types/contact';
import { Button } from '../button';
import FormErrorMessage from '../form-error-message';

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
		<form id='contact-form' onSubmit={submitContactForm}>
			<label
				className='block text-sm font-medium text-neutral-600 dark:text-neutral-400'
				htmlFor='email'
			>
				Email
			</label>
			<input
				autoComplete='email'
				className='focus:border-brand focus:ring-brand rounded-md border-transparent bg-neutral-200 text-neutral-700 transition-all duration-150 placeholder:font-medium placeholder:text-black/50 focus:bg-transparent dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-white/50 dark:focus:border-green-300 dark:focus:bg-transparent dark:focus:ring-green-300'
				id='email'
				inputMode='email'
				type='email'
				{...register('email', {
					required: 'Email is required',
					validate: (value) =>
						EmailValidator.validate(value) || 'Email is invalid',
				})}
			/>
			{emailErrors && (
				<FormErrorMessage data-testid='emailErrorText'>
					{emailErrors.message}
				</FormErrorMessage>
			)}
			<label
				className='block text-sm font-medium text-neutral-600 dark:text-neutral-400'
				htmlFor='message'
			>
				Message
			</label>
			<textarea
				id='message'
				className='focus:border-brand focus:ring-brand rounded-md border-transparent bg-neutral-200 text-neutral-700 transition-all duration-150 placeholder:font-medium placeholder:text-black/50 focus:bg-transparent dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-white/50 dark:focus:border-green-300 dark:focus:bg-transparent dark:focus:ring-green-300'
				rows={4}
				{...register('message', { required: 'Message is required' })}
			/>
			{messageErrors && (
				<FormErrorMessage data-testid='messageErrorText'>
					{messageErrors.message}
				</FormErrorMessage>
			)}
			{contactApiResponse?.data && (
				<p
					className='text-sm text-green-500 dark:text-green-300'
					data-testid='contactSuccessText'
					role='alert'
				>
					{contactApiResponse.data}
				</p>
			)}
			{contactApiResponse?.error && (
				<p
					className='text-sm text-red-500 dark:text-red-300'
					data-testid='contactErrorText'
					role='alert'
				>
					{contactApiResponse.error}
				</p>
			)}
			<Button type='submit'>Submit</Button>
		</form>
	);
};

export default ContactForm;
