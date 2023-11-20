import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// docs:: https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
      { find: '@data', replacement: path.resolve(__dirname, 'src/data') },
      {
        find: '@features',
        replacement: path.resolve(__dirname, 'src/features'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services'),
      },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
      { find: '@schemas', replacement: path.resolve(__dirname, 'src/schemas') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
    ],
  },
  test: {
    setupFiles: './src/setupTests.js',
    globals: true,
    environment: 'jsdom',
  },
})
