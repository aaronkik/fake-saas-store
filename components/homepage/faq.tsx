import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import AnimateHeight from 'react-animate-height';
import { Divider, Section, SectionHeader } from '~/components';

const accordionContent = [
  {
    title: 'What is stuff?',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam facilis, necessitatibus exercitationem assumenda corrupti vitae, consequuntur error quod amet ea officia accusamus vel iste! Voluptatum.',
  },
  {
    title: 'How is stuff priced?',

    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quis praesentium laborum! Fugiat ipsa ad deleniti totam, animi quibusdam consequuntur.',
  },
  {
    title: 'I have another question...',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, optio eveniet necessitatibus atque ad odit.',
  },
];

const FAQ = () => (
  <Section className='flex flex-col items-center gap-4'>
    <SectionHeader className='text-center'>FAQs</SectionHeader>
    <div className='flex w-full max-w-lg flex-col rounded-md pt-7'>
      <Divider />
      {accordionContent.map(({ title, description }) => (
        <Disclosure key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between px-4 py-2 text-left text-lg'>
                <span>{title}</span>
                <ChevronDownIcon
                  className={`h-6 w-6 transition-all duration-75 ${
                    open ? 'rotate-180 transform' : ''
                  }`}
                />
              </Disclosure.Button>
              <AnimateHeight height={open ? 'auto' : 0}>
                <Disclosure.Panel
                  className='px-4 pb-2 text-neutral-700 dark:text-neutral-300'
                  static
                >
                  {description}
                </Disclosure.Panel>
              </AnimateHeight>
              <Divider />
            </>
          )}
        </Disclosure>
      ))}
    </div>
  </Section>
);

export default FAQ;
