import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  projectId: process.env.CYPRESS_PROJECT_ID,
});
