import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served at /course-app/ on the live site (Website/index.html links
  // there), so asset URLs need to resolve under that subpath instead of "/".
  // (Not "/course/": this repo's checkout is on a case-insensitive
  // filesystem, and "Course/" already exists as the source directory.)
  base: '/course-app/',
  plugins: [react()],
})
