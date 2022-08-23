import { ContactApiResponse } from '../../types/contact';

interface Props {
  contactFormResponse: ContactApiResponse | null;
}

const ContactFormResponse = ({ contactFormResponse }: Props) => {
  if (!contactFormResponse) return null;

  const { data, error } = contactFormResponse;

  if (!data && !error) return null;

  return (
    <p
      className={`text-sm ${
        data
          ? 'text-green-500 dark:text-green-300'
          : 'text-red-500 dark:text-red-300'
      } `}
      data-testid={`${data ? 'contactSuccessText' : 'contactErrorText'}`}
      role='alert'
    >
      {data || error}
    </p>
  );
};

export default ContactFormResponse;
