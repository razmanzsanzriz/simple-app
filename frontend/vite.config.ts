import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Port 5180 must match the CORS origin in backend/Program.cs
export default defineConfig({
  plugins: [react()],
  server: { port: 5180, strictPort: true },
})
