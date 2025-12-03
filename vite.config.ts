import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // No external API keys required for the Local Engine
    server: {
      port: 3000
    }
  };
});