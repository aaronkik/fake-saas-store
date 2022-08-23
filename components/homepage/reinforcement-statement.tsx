import { Section, SectionHeader } from '~/components';
import { PRODUCT_VIDEO } from '~/constants/urls';

const ReinforcementStatement = () => (
  <Section className='flex flex-col items-start gap-8 md:flex-row md:items-center'>
    <div className='aspect-video w-full flex-1 rounded-md shadow-md'>
      <iframe
        className='h-full w-full rounded-md'
        src={PRODUCT_VIDEO}
        title='Demo video'
      />
    </div>
    <div className='flex flex-1 flex-col gap-2'>
      <SectionHeader>
        Unlimited stuff.
        <br />
        Whenever you want.
      </SectionHeader>
      <p className='flex-1'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
        tempora. Cumque, eveniet! Amet, ex harum necessitatibus deserunt maxime
        maiores, quis inventore alias id quos vel impedit aliquam iste? Nobis
        sapiente vel enim, odio voluptas cupiditate est a quod minus veritatis.
      </p>
    </div>
  </Section>
);

export default ReinforcementStatement;
