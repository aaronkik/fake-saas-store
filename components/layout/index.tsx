import Container from '../container';
import Footer from './footer';
import Header from './header';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
	<>
		<Header />
		<main>{children}</main>
		<Container>
			<Footer />
		</Container>
	</>
);

export default Layout;
