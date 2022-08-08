import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
	<Html lang='en'>
		<Head>
			<link
				href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap'
				rel='stylesheet'
			/>
			<link rel='icon' type='image/png' href='/assets/favicon.png' />
			<link rel='icon' href='/assets/favicon.ico' />
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/assets/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/assets/favicon-16x16.png'
			/>
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default Document;
