import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// On GitHub Pages without a custom domain the site lives under /<repo-name>/,
// so the deploy workflow passes VITE_BASE. Locally and on the custom domain it is '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
