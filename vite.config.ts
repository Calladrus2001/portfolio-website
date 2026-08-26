import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const hasPdf = fs.existsSync(path.resolve(__dirname, 'public/Vishesh_Resume.pdf'));

// https://vite.dev/config/
export default defineConfig({
  define: {
    __HAS_RESUME_PDF__: JSON.stringify(hasPdf),
  },
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-icons': ['react-icons/lu', 'react-icons/fa6', 'react-icons/si'],
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
});
