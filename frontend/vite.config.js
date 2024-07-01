import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "https://bingetube-backend.vercel.app/",
  //   },
  // },
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/frontend/src',
    },
  },
  build: {
    rollupOptions: {
      external: ['@/components/ui/button'], // Add any external modules here
    },
  },
});
