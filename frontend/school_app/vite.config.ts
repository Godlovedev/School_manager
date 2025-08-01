import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // ← indispensable pour que Ngrok puisse accéder
    allowedHosts: ['.ngrok-free.app'], // ← accepte tous les liens ngrok
  },
})
// https://8ab9a1c56131.ngrok-free.app/