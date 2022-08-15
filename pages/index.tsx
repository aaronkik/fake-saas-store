import Head from 'next/head';
import { Container, Divider } from '../components';
import {
	Benefits,
	CallToAction,
	FAQ,
	Features,
	Hero,
} from '../components/homepage';
import ReinforcementStatement from '../components/homepage/reinforcement-statement';

const Home = () => (
	<>
		<Head>
			<title>Home</title>
		</Head>
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
	</>
);

export default Home;
