import {
	RefreshIcon,
	ShareIcon,
	TrashIcon,
	TruckIcon,
	QrcodeIcon,
	UserGroupIcon,
} from '@heroicons/react/outline';
import { Section, SectionHeader } from '~/components';

const featureItems = [
	{
		heading: 'QR codes',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quam voluptatum error alias repellendus officiis. Recusandae!',
		icon: QrcodeIcon,
	},
	{
		heading: 'Always fresh',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et modi culpa enim qui aspernatur laborum libero.',
		icon: RefreshIcon,
	},
	{
		heading: 'Check wastage',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui possimus molestiae nemo adipisci laboriosam doloribus ratione.',
		icon: TrashIcon,
	},
	{
		heading: 'Deliveries',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quam ex, quo nisi dolore iste officiis.',
		icon: TruckIcon,
	},
	{
		heading: 'Graph search',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia possimus ad eos quibusdam ullam consequatur fuga. Blanditiis.',
		icon: ShareIcon,
	},
	{
		heading: 'Group portals',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maiores architecto dignissimos labore ad quaerat similique?',
		icon: UserGroupIcon,
	},
];

const Features = () => (
	<Section className='flex flex-col'>
		<SectionHeader className='text-center'>
			Everything you need to make your stuff
		</SectionHeader>
		<div className='grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2 md:grid-cols-3'>
			{featureItems.map(({ heading, description, icon: Icon }) => (
				<div className='flex flex-col gap-2 p-4' key={heading}>
					<div className='flex flex-row items-center gap-2'>
						<Icon className='bg-brand h-8 w-8 rounded-lg p-1 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900' />
						<p className='text-lg font-semibold'>{heading}</p>
					</div>
					<p>{description}</p>
				</div>
			))}
		</div>
	</Section>
);

export default Features;
