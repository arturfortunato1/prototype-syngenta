import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrgPages = repository?.toLowerCase().endsWith('.github.io');
const basePath =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === 'true' && repository && !isUserOrOrgPages ? `/${repository}/` : '/');

export default defineConfig({
  base: basePath,
  plugins: [react()],
});
