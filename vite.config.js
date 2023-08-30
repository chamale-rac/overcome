import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// docs:: https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'dev') {
    return {
      server: {
        host: '0.0.0.0',
        port: 4444,
      },
      plugins: [react()],
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
          { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
          {
            find: '@assets',
            replacement: path.resolve(__dirname, 'src/assets'),
          },
          {
            find: '@components',
            replacement: path.resolve(__dirname, 'src/components'),
          },
          {
            find: '@context',
            replacement: path.resolve(__dirname, 'src/context'),
          },
          { find: '@data', replacement: path.resolve(__dirname, 'src/data') },
          {
            find: '@features',
            replacement: path.resolve(__dirname, 'src/features'),
          },
          { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
          {
            find: '@layouts',
            replacement: path.resolve(__dirname, 'src/layouts'),
          },
          { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
          {
            find: '@routes',
            replacement: path.resolve(__dirname, 'src/routes'),
          },
          {
            find: '@services',
            replacement: path.resolve(__dirname, 'src/services'),
          },
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
          {
            find: '@config',
            replacement: path.resolve(__dirname, 'src/config'),
          },
          { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
          {
            find: '@context',
            replacement: path.resolve(__dirname, 'src/context'),
          },
          {
            find: '@schemas',
            replacement: path.resolve(__dirname, 'src/schemas'),
          },
          { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
        ],
      },
    }
  } else {
    // command === 'build'
    return {
      server: {
        host: '0.0.0.0',
        port: 4444,
      },
      plugins: [react()],
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, '') },
          { find: '@pages', replacement: path.resolve(__dirname, 'pages') },
          {
            find: '@assets',
            replacement: path.resolve(__dirname, 'assets'),
          },
          {
            find: '@components',
            replacement: path.resolve(__dirname, 'components'),
          },
          {
            find: '@context',
            replacement: path.resolve(__dirname, 'context'),
          },
          { find: '@data', replacement: path.resolve(__dirname, 'data') },
          {
            find: '@features',
            replacement: path.resolve(__dirname, 'features'),
          },
          { find: '@hooks', replacement: path.resolve(__dirname, 'hooks') },
          {
            find: '@layouts',
            replacement: path.resolve(__dirname, 'layouts'),
          },
          { find: '@lib', replacement: path.resolve(__dirname, 'lib') },
          {
            find: '@routes',
            replacement: path.resolve(__dirname, 'src/routes'),
          },
          {
            find: '@services',
            replacement: path.resolve(__dirname, 'services'),
          },
          { find: '@utils', replacement: path.resolve(__dirname, 'utils') },
          {
            find: '@config',
            replacement: path.resolve(__dirname, 'config'),
          },
          { find: '@store', replacement: path.resolve(__dirname, 'store') },
          {
            find: '@context',
            replacement: path.resolve(__dirname, 'context'),
          },
          {
            find: '@schemas',
            replacement: path.resolve(__dirname, 'schemas'),
          },
          { find: '@api', replacement: path.resolve(__dirname, 'api') },
        ],
      },
    }
  }
})
