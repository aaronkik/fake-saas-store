interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => (
  <div className='mx-auto max-w-6xl'>{children}</div>
);

export default Container;
