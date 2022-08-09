import Head from 'next/head';
import { Container, Divider, Footer, Header } from '../components';
import {
	Benefits,
	CallToAction,
	FAQ,
	Features,
	Hero,
} from '../components/homepage';
import ReinforcementStatement from '../components/homepage/reinforcement-statement';

const Home = () => {
	return (
		<div>
			<Head>
				<title>Home</title>
			</Head>
			<Header />
			<main>
				<Container>
					<Hero />
				</Container>
				<Divider />
				<Container>
					<Benefits />
				</Container>
				<Divider />
				<Container>
					<ReinforcementStatement />
				</Container>
				<Divider />
				<Container>
					<Features />
				</Container>
				<Divider />
				<Container>
					<FAQ />
				</Container>
				<Divider />
				<Container>
					<CallToAction />
				</Container>
				<Divider />
			</main>
			<Container>
				<Footer />
			</Container>
		</div>
	);
};

export default Home;
