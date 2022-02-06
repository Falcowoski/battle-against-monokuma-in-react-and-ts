import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/battle-against-monokuma-in-react-and-ts/',
  plugins: [react()]
})
