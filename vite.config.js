import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
    //mkcert()  // ← Enables HTTPS locally
  ],

server: {
  host: '10.1.0.62',
  port: 5173,
}
})
