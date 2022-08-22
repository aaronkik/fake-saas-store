// Polyfill "window.fetch" used in React components.
import 'whatwg-fetch';

import '@testing-library/jest-dom/extend-expect';
import { server } from './__mocks__/msw-server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
