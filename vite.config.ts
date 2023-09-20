import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   // Define environment variables for your application
  //   'import.meta.env.VITE_FIREBASE_API_KEY': process.env.VITE_FIREBASE_API_KEY,
  //   // Add other environment variables here
  // },
});
