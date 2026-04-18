=========================================
      VITE + TAILWIND V4 QUICK SETUP
=========================================

[STEP 1: TERMINAL]
npm install tailwindcss @tailwindcss/vite

[STEP 2: vite.config.js]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

[STEP 3: src/index.css]
@import "tailwindcss";

[STEP 4: TEST IN Home.jsx]
<h1 className="bg-blue-600 text-white p-10 text-3xl font-bold text-center">Tailwind v4 Active!</h1>
