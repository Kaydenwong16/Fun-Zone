import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Only the production build is served under /course-app/ on the live site
  // (Website/index.html links there) — the dev server still runs at "/" so
  // `npm run dev` keeps working normally on localhost.
  // (Not "/course/": this repo's checkout is on a case-insensitive
  // filesystem, and "Course/" already exists as the source directory.)
  base: command === 'build' ? '/course-app/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the app itself, and the standalone, no-login
      // "Course Outline" page for parents (course-outline.html + its own
      // vanilla-JS entry, src/outline.js — see Header.jsx's nav link).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        outline: fileURLToPath(new URL('./course-outline.html', import.meta.url)),
      },
    },
  },
}))
