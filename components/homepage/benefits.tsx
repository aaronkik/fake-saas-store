import {
	ClipboardListIcon,
	GlobeIcon,
	LightningBoltIcon,
} from '@heroicons/react/outline';
import Section from '../section';
import SectionHeader from '../section-header';

const benefitItems = [
	{
		heading: 'Real-time data',
		description:
			'Lorem ipsum dolor sit, amet consectetur elit. Doloremque itaque, dolores veniam accusamus error repudiandae quis veritatis ipsam eum!',
		icon: LightningBoltIcon,
	},
	{
		heading: 'Cloud based',
		description:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ducimus ea ex a rem repellat.',
		icon: GlobeIcon,
	},
	{
		heading: 'Another keyword',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates fugiat hic aperiam, reprehenderit cum eius reiciendis? At, eius!',
		icon: ClipboardListIcon,
	},
];

const Benefits = () => (
	<Section className='flex flex-col gap-2'>
		<SectionHeader className='text-center'>
			Benefits, so many benefits
		</SectionHeader>
		<div className='flex flex-col justify-center gap-4 pt-7 md:flex-row'>
			{benefitItems.map(({ heading, description, icon: Icon }) => (
				<div className='flex flex-1 flex-col gap-2 p-4' key={heading}>
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

export default Benefits;
