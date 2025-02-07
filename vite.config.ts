import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild", // Ensure esbuild minifies dead code
    cssCodeSplit: true, // Remove unused CSS
    rollupOptions: {
      treeshake: true, // Ensure Rollup performs tree shaking
      output: {
        manualChunks(id) {
          // Split vendor dependencies for better tree shaking
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
