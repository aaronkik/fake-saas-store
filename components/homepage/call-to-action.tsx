import Link from 'next/link';
import { ButtonLink } from '../button';
import Section from '../section';
import SectionHeader from '../section-header';

const CallToAction = () => (
	<Section className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
		<SectionHeader>Ready to simplify your stuff?</SectionHeader>
		<Link href='/contact' passHref>
			<ButtonLink className='font-semibold'>Contact us</ButtonLink>
		</Link>
	</Section>
);

export default CallToAction;
