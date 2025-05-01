// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,          // so you don't need to import `describe`, `it`, `expect` in every file
    environment: 'jsdom',   // simulates the DOM for Vue components
    // setupFiles: './test/setup.ts', // optional file for global mocks, setup, etc.
    include: ['src/**/*.test.{ts,js}'], // adjust if you co-locate tests
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'test', 'src/main.ts'],
    },
    alias: {
        '@': resolve(__dirname, './src'),
      },
  },
})
