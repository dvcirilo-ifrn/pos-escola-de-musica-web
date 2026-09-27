import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // o Sass do Bootstrap 5 ainda usa recursos antigos: esconde os avisos
        quietDeps: true,
        silenceDeprecations: ['import'],
      },
    },
  },
})
