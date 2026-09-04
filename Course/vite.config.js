import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Only the production build is served under /course-app/ on the live site
  // (Website/index.html links there) — the dev server still runs at "/" so
  // `npm run dev` keeps working normally on localhost.
  // (Not "/course/": this repo's checkout is on a case-insensitive
  // filesystem, and "Course/" already exists as the source directory.)
  base: command === 'build' ? '/course-app/' : '/',
  plugins: [react()],
}))
