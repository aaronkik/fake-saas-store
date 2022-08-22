/**
 * Set NEXT_PUBLIC_API_MOCKING env to enabled or disabled to see effects
 */
const initMocks = async () => {
	if (typeof window === 'undefined') {
		const { server } = await import('./msw-server');
		server.listen();
	} else {
		const { worker } = await import('./msw-browser');
		worker.start();
	}
};

initMocks();

export {};
